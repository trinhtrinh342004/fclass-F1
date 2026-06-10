import { useEffect, useState } from "react";
import { supabase, type Profile } from "../lib/supabaseClient";

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStudents() {
      setLoading(true);
      const { data, error: loadError } = await supabase
        .from("profiles")
        .select("id,email,full_name,role,status,created_at,updated_at")
        .eq("role", "student")
        .order("created_at", { ascending: false });

      if (loadError) {
        setError(loadError.message);
        setStudents([]);
      } else {
        setError(null);
        setStudents(data ?? []);
      }

      setLoading(false);
    }

    void loadStudents();
  }, []);

  return (
    <main className="space-y-5 p-6">
      <header>
        <h1 className="text-2xl font-semibold text-slate-950">Danh sách học viên</h1>
        <p className="text-sm text-slate-600">Admin đọc toàn bộ profiles nhờ RLS policy admin.</p>
      </header>

      {loading ? (
        <p className="rounded-lg border bg-white p-4 text-sm text-slate-600">Đang tải học viên...</p>
      ) : error ? (
        <p className="rounded-lg border bg-white p-4 text-sm text-red-700">{error}</p>
      ) : students.length === 0 ? (
        <p className="rounded-lg border bg-white p-4 text-sm text-slate-600">Chưa có học viên.</p>
      ) : (
        <div className="overflow-hidden rounded-lg border bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 text-slate-700">
              <tr>
                <th className="px-4 py-3">Học viên</th>
                <th className="px-4 py-3">Trạng thái</th>
                <th className="px-4 py-3">Ngày tạo</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr className="border-t" key={student.id}>
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-950">{student.full_name || "Chưa nhập tên"}</div>
                    <div className="text-slate-500">{student.email}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-700">{student.status}</td>
                  <td className="px-4 py-3 text-slate-600">
                    {new Date(student.created_at).toLocaleDateString("vi-VN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
