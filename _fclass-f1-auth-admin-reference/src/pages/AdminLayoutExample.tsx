import { NavLink, Outlet } from "react-router-dom";
import { useAuthProfile } from "../hooks/useAuthProfile";

const navItems = [
  { to: "/admin/approvals", label: "Duyệt học viên" },
  { to: "/admin/students", label: "Danh sách học viên" },
  { to: "/admin/classes", label: "Quản lý lớp" },
];

export default function AdminLayoutExample() {
  const { profile, signOut } = useAuthProfile();

  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed inset-y-0 left-0 w-64 border-r bg-white p-5">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">fclass-f1 admin</p>
          <h1 className="mt-1 text-lg font-semibold text-slate-950">{profile?.full_name || profile?.email}</h1>
        </div>

        <nav className="mt-8 space-y-1">
          {navItems.map((item) => (
            <NavLink
              className={({ isActive }) =>
                [
                  "block rounded-md px-3 py-2 text-sm font-medium",
                  isActive ? "bg-slate-950 text-white" : "text-slate-700 hover:bg-slate-100",
                ].join(" ")
              }
              key={item.to}
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button className="mt-8 rounded-md border px-3 py-2 text-sm font-medium" onClick={signOut}>
          Đăng xuất
        </button>
      </aside>

      <div className="pl-64">
        <Outlet />
      </div>
    </div>
  );
}
