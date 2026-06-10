import { Link, useNavigate } from "react-router-dom";
import { useAuthProfile } from "../hooks/useAuthProfile";

export default function AuthNavbarExample() {
  const navigate = useNavigate();
  const { session, profile, isAdmin, signOut } = useAuthProfile();

  async function handleLogout() {
    await signOut();
    navigate("/login", { replace: true });
  }

  return (
    <header className="border-b bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link className="font-semibold text-slate-950" to={isAdmin ? "/admin" : "/"}>
          fclass-f1
        </Link>

        <div className="flex items-center gap-3 text-sm">
          {!session ? (
            <>
              <Link className="rounded-md border px-3 py-2 font-medium" to="/login">
                Đăng nhập
              </Link>
              <Link className="rounded-md bg-slate-950 px-3 py-2 font-medium text-white" to="/register">
                Đăng ký
              </Link>
            </>
          ) : (
            <>
              <span className="hidden text-slate-600 sm:inline">{profile?.full_name || profile?.email}</span>
              {isAdmin && (
                <Link className="rounded-md border px-3 py-2 font-medium" to="/admin">
                  Admin
                </Link>
              )}
              <button className="rounded-md bg-slate-950 px-3 py-2 font-medium text-white" onClick={handleLogout}>
                Đăng xuất
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
