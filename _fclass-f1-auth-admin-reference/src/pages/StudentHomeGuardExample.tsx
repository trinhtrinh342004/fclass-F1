import { useEffect, useState, type ReactNode } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import { useAuthProfile } from "../hooks/useAuthProfile";
import { supabase, type FclassClass } from "../lib/supabaseClient";

type StudentHomeGuardExampleProps = {
  children?: ReactNode;
};

function FclassF1TwentySevenLessonsPlaceholder() {
  return (
    <main className="min-h-screen bg-white p-6">
      <h1 className="text-2xl font-semibold text-slate-950">27 buổi học fclass-f1</h1>
      <p className="mt-2 text-sm text-slate-600">
        Thay phần này bằng homepage hoặc lesson list hiện tại của fclass-f1.
      </p>
    </main>
  );
}

export default function StudentHomeGuardExample({ children }: StudentHomeGuardExampleProps) {
  const { user, isAdmin } = useAuthProfile();
  const [loadingClass, setLoadingClass] = useState(true);
  const [assignedClasses, setAssignedClasses] = useState<FclassClass[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.id || isAdmin) {
      setLoadingClass(false);
      return;
    }

    let cancelled = false;

    async function loadClassAccess() {
      setLoadingClass(true);
      setError(null);

      const { data: memberships, error: membershipError } = await supabase
        .from("class_members")
        .select("class_id")
        .eq("user_id", user.id)
        .eq("status", "approved");

      if (cancelled) return;

      if (membershipError) {
        setError(membershipError.message);
        setAssignedClasses([]);
        setLoadingClass(false);
        return;
      }

      const classIds = (memberships ?? []).map((item) => item.class_id);
      if (classIds.length === 0) {
        setAssignedClasses([]);
        setLoadingClass(false);
        return;
      }

      const { data: classes, error: classError } = await supabase
        .from("classes")
        .select("id,name,description,created_at")
        .in("id", classIds);

      if (cancelled) return;

      if (classError) {
        setError(classError.message);
        setAssignedClasses([]);
      } else {
        setAssignedClasses(classes ?? []);
      }

      setLoadingClass(false);
    }

    void loadClassAccess();

    return () => {
      cancelled = true;
    };
  }, [isAdmin, user?.id]);

  return (
    <ProtectedRoute requireApprovedStudent>
      {loadingClass ? (
        <main className="min-h-screen grid place-items-center bg-slate-50">
          <p className="rounded-lg border bg-white px-5 py-4 text-sm text-slate-600 shadow-sm">
            Đang kiểm tra lớp được duyệt...
          </p>
        </main>
      ) : error ? (
        <main className="min-h-screen grid place-items-center bg-slate-50 px-4">
          <p className="max-w-lg rounded-lg border bg-white p-5 text-sm text-red-700 shadow-sm">{error}</p>
        </main>
      ) : assignedClasses.length === 0 ? (
        <main className="min-h-screen grid place-items-center bg-slate-50 px-4">
          <section className="max-w-lg rounded-lg border bg-white p-6 text-center shadow-sm">
            <h1 className="text-xl font-semibold text-slate-950">Chưa được thêm vào lớp</h1>
            <p className="mt-2 text-sm text-slate-600">
              Tài khoản đã được duyệt nhưng chưa có dòng class_members. Hãy nhờ admin thêm bạn vào lớp.
            </p>
          </section>
        </main>
      ) : (
        children || <FclassF1TwentySevenLessonsPlaceholder />
      )}
    </ProtectedRoute>
  );
}
