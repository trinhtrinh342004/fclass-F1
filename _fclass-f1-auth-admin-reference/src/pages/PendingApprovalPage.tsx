import { Link } from "react-router-dom";
import { useAuthProfile } from "../hooks/useAuthProfile";

export default function PendingApprovalPage() {
  const { signOut } = useAuthProfile();

  return (
    <main className="min-h-screen grid place-items-center bg-slate-50 px-4">
      <section className="w-full max-w-lg rounded-lg border bg-white p-6 text-center shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-950">Tài khoản đang chờ admin duyệt</h1>
        <p className="mt-3 text-slate-600">
          Bạn đã đăng nhập thành công, nhưng chưa thể vào lớp hoặc xem bài học cho tới khi admin duyệt.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link className="rounded-md border px-4 py-2 text-sm font-medium" to="/login">
            Về đăng nhập
          </Link>
          <button className="rounded-md bg-slate-950 px-4 py-2 text-sm font-medium text-white" onClick={signOut}>
            Đăng xuất
          </button>
        </div>
      </section>
    </main>
  );
}
