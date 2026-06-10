import { useEffect, useMemo, useState } from "react";
import { supabase, type FclassClass, type Profile } from "../lib/supabaseClient";
import { useAuthProfile } from "../hooks/useAuthProfile";

type StatusMessage = {
  type: "success" | "error";
  text: string;
};

export default function AdminApprovalPage() {
  const { profile: adminProfile, isAdmin } = useAuthProfile();
  const [pendingStudents, setPendingStudents] = useState<Profile[]>([]);
  const [approvedStudents, setApprovedStudents] = useState<Profile[]>([]);
  const [rejectedStudents, setRejectedStudents] = useState<Profile[]>([]);
  const [classes, setClasses] = useState<FclassClass[]>([]);
  const [selectedClassByUser, setSelectedClassByUser] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [savingUserId, setSavingUserId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null);

  const defaultClassId = classes[0]?.id ?? "";

  async function loadData() {
    setLoading(true);
    const [pendingResult, approvedResult, rejectedResult, classesResult] = await Promise.all([
      supabase
        .from("profiles")
        .select("id,email,full_name,role,status,created_at,updated_at")
        .eq("role", "student")
        .eq("status", "pending")
        .order("created_at", { ascending: true }),
      supabase
        .from("profiles")
        .select("id,email,full_name,role,status,created_at,updated_at")
        .eq("role", "student")
        .eq("status", "approved")
        .order("created_at", { ascending: false }),
      supabase
        .from("profiles")
        .select("id,email,full_name,role,status,created_at,updated_at")
        .eq("role", "student")
        .eq("status", "rejected")
        .order("created_at", { ascending: false }),
      supabase.from("classes").select("id,name,description,created_at").order("created_at"),
    ]);

    if (pendingResult.error) {
      setStatusMessage({ type: "error", text: pendingResult.error.message });
    } else {
      setPendingStudents(pendingResult.data ?? []);
    }

    if (approvedResult.error) {
      setStatusMessage({ type: "error", text: approvedResult.error.message });
    } else {
      setApprovedStudents(approvedResult.data ?? []);
    }

    if (rejectedResult.error) {
      setStatusMessage({ type: "error", text: rejectedResult.error.message });
    } else {
      setRejectedStudents(rejectedResult.data ?? []);
    }

    if (classesResult.error) {
      setStatusMessage({ type: "error", text: classesResult.error.message });
    } else {
      setClasses(classesResult.data ?? []);
    }

    setLoading(false);
  }

  useEffect(() => {
    if (!isAdmin) return;
    void loadData();

    const channel = supabase
      .channel("admin-approvals")
      .on("postgres_changes", { event: "*", schema: "public", table: "profiles" }, () => {
        void loadData();
      })
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [isAdmin]);

  const selectedClassNames = useMemo(() => {
    return Object.fromEntries(classes.map((item) => [item.id, item.name]));
  }, [classes]);

  async function approveStudent(student: Profile) {
    if (savingUserId) return;
    const classId = selectedClassByUser[student.id] || defaultClassId;
    if (!adminProfile?.id || !classId) {
      setStatusMessage({ type: "error", text: "Chọn lớp trước khi duyệt học viên." });
      return;
    }

    setSavingUserId(student.id);
    setStatusMessage(null);
    const approvedAt = new Date().toISOString();

    const { error: profileError } = await supabase
      .from("profiles")
      .update({ status: "approved" })
      .eq("id", student.id)
      .eq("role", "student");

    if (profileError) {
      setStatusMessage({ type: "error", text: profileError.message });
      setSavingUserId(null);
      return;
    }

    const { error: memberError } = await supabase.from("class_members").upsert(
      {
        class_id: classId,
        user_id: student.id,
        status: "approved",
        approved_by: adminProfile.id,
        approved_at: approvedAt,
      },
      { onConflict: "class_id,user_id" },
    );

    if (memberError) {
      await supabase.from("profiles").update({ status: "pending" }).eq("id", student.id);
      setStatusMessage({ type: "error", text: memberError.message });
      setSavingUserId(null);
      return;
    }

    const { error: logError } = await supabase.from("approval_logs").insert({
      user_id: student.id,
      admin_id: adminProfile.id,
      action: "approved",
      old_status: student.status,
      new_status: "approved",
      class_id: classId,
    });

    if (logError) {
      setStatusMessage({
        type: "error",
        text: `Đã duyệt học viên nhưng ghi approval_logs lỗi: ${logError.message}`,
      });
      setSavingUserId(null);
      await loadData();
      return;
    }

    setPendingStudents((current) => current.filter((item) => item.id !== student.id));
    setApprovedStudents((current) => [{ ...student, status: "approved" }, ...current]);
    setStatusMessage({
      type: "success",
      text: `Đã duyệt ${student.full_name || student.email} vào lớp ${selectedClassNames[classId]}.`,
    });
    setSavingUserId(null);
  }

  async function rejectStudent(student: Profile) {
    if (savingUserId) return;
    if (!adminProfile?.id) return;
    const confirmed = window.confirm(`Từ chối học viên ${student.full_name || student.email}?`);
    if (!confirmed) return;

    setSavingUserId(student.id);
    setStatusMessage(null);

    const { error } = await supabase
      .from("profiles")
      .update({ status: "rejected" })
      .eq("id", student.id)
      .eq("role", "student");

    if (error) {
      setStatusMessage({ type: "error", text: error.message });
      setSavingUserId(null);
      return;
    }

    // Rejection should leave no approved class membership for this user.
    await supabase.from("class_members").delete().eq("user_id", student.id);

    const { error: logError } = await supabase.from("approval_logs").insert({
      user_id: student.id,
      admin_id: adminProfile.id,
      action: "rejected",
      old_status: student.status,
      new_status: "rejected",
      class_id: null,
    });

    if (logError) {
      setStatusMessage({
        type: "error",
        text: `Đã từ chối học viên nhưng ghi approval_logs lỗi: ${logError.message}`,
      });
      setSavingUserId(null);
      await loadData();
      return;
    }

    setPendingStudents((current) => current.filter((item) => item.id !== student.id));
    setRejectedStudents((current) => [{ ...student, status: "rejected" }, ...current]);
    setStatusMessage({ type: "success", text: `Đã từ chối ${student.full_name || student.email}.` });
    setSavingUserId(null);
  }

  if (!isAdmin) {
    return <p className="p-6 text-sm text-red-700">Bạn không có quyền vào trang admin.</p>;
  }

  return (
    <main className="space-y-5 p-6">
      <header>
        <h1 className="text-2xl font-semibold text-slate-950">Duyệt học viên</h1>
        <p className="text-sm text-slate-600">
          Danh sách này đọc trực tiếp từ bảng profiles với status = pending.
        </p>
      </header>

      <section className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <div className="text-xs uppercase tracking-wide text-slate-500">Pending</div>
          <div className="mt-1 text-2xl font-semibold text-slate-950">{pendingStudents.length}</div>
        </div>
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <div className="text-xs uppercase tracking-wide text-slate-500">Approved</div>
          <div className="mt-1 text-2xl font-semibold text-emerald-700">{approvedStudents.length}</div>
        </div>
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <div className="text-xs uppercase tracking-wide text-slate-500">Rejected</div>
          <div className="mt-1 text-2xl font-semibold text-red-700">{rejectedStudents.length}</div>
        </div>
      </section>

      {statusMessage && (
        <p
          className={
            statusMessage.type === "success"
              ? "rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
              : "rounded-md bg-red-50 px-3 py-2 text-sm text-red-700"
          }
        >
          {statusMessage.text}
        </p>
      )}

      {classes.length === 0 && !loading && (
        <p className="rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-800">
          Chưa có lớp. Chạy seed class mặc định trong SQL hoặc tạo lớp ở trang Quản lý lớp.
        </p>
      )}

      {loading ? (
        <p className="rounded-lg border bg-white p-4 text-sm text-slate-600">Đang tải...</p>
      ) : pendingStudents.length === 0 ? (
        <p className="rounded-lg border bg-white p-4 text-sm text-slate-600">
          Không có học viên nào đang chờ duyệt.
        </p>
      ) : (
        <div className="overflow-hidden rounded-lg border bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 text-slate-700">
              <tr>
                <th className="px-4 py-3">Học viên</th>
                <th className="px-4 py-3">Ngày đăng ký</th>
                <th className="px-4 py-3">Lớp</th>
                <th className="px-4 py-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {pendingStudents.map((student) => (
                <tr className="border-t" key={student.id}>
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-950">{student.full_name || "Chưa nhập tên"}</div>
                    <div className="text-slate-500">{student.email}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {new Date(student.created_at).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      className="w-full rounded-md border border-slate-300 px-3 py-2"
                      value={selectedClassByUser[student.id] || defaultClassId}
                      onChange={(event) =>
                        setSelectedClassByUser((current) => ({
                          ...current,
                          [student.id]: event.target.value,
                        }))
                      }
                    >
                      {classes.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        className="rounded-md bg-emerald-600 px-3 py-2 text-xs font-medium text-white disabled:opacity-60"
                        disabled={savingUserId !== null || classes.length === 0}
                        onClick={() => void approveStudent(student)}
                      >
                        {savingUserId === student.id ? "Saving..." : "Approve"}
                      </button>
                      <button
                        className="rounded-md border border-red-200 px-3 py-2 text-xs font-medium text-red-700 disabled:opacity-60"
                        disabled={savingUserId !== null}
                        onClick={() => void rejectStudent(student)}
                      >
                        {savingUserId === student.id ? "Saving..." : "Reject"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <h2 className="font-semibold text-slate-950">Approved gần đây</h2>
          <div className="mt-3 space-y-2">
            {approvedStudents.slice(0, 5).map((student) => (
              <div className="rounded-md bg-slate-50 px-3 py-2 text-sm" key={student.id}>
                <div className="font-medium text-slate-950">{student.full_name || student.email}</div>
                <div className="text-slate-500">{student.email}</div>
              </div>
            ))}
            {approvedStudents.length === 0 && <p className="text-sm text-slate-600">Chưa có approved student.</p>}
          </div>
        </div>
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <h2 className="font-semibold text-slate-950">Rejected gần đây</h2>
          <div className="mt-3 space-y-2">
            {rejectedStudents.slice(0, 5).map((student) => (
              <div className="rounded-md bg-slate-50 px-3 py-2 text-sm" key={student.id}>
                <div className="font-medium text-slate-950">{student.full_name || student.email}</div>
                <div className="text-slate-500">{student.email}</div>
              </div>
            ))}
            {rejectedStudents.length === 0 && <p className="text-sm text-slate-600">Chưa có rejected student.</p>}
          </div>
        </div>
      </section>
    </main>
  );
}
