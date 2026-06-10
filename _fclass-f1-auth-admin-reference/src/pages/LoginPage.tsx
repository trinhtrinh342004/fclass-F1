import { FormEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase, type Profile } from "../lib/supabaseClient";

async function loadProfileAfterLogin(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("id,email,full_name,role,status,created_at,updated_at")
    .eq("id", userId)
    .maybeSingle();

  if (error) throw error;
  return data ?? null;
}

function redirectForProfile(profile: Profile | null) {
  if (!profile) return "/pending-approval";
  if (profile.role === "admin" && profile.status === "approved") return "/admin";
  if (profile.status === "approved") return "/";
  if (profile.status === "rejected") return "/rejected";
  return "/pending-approval";
}

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError || !data.user) {
      setError(signInError?.message ?? "Đăng nhập thất bại.");
      setLoading(false);
      return;
    }

    try {
      const profile = await loadProfileAfterLogin(data.user.id);
      const fallbackPath = redirectForProfile(profile);
      const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname;
      navigate(from && fallbackPath === "/" ? from : fallbackPath, { replace: true });
    } catch (profileError) {
      setError(profileError instanceof Error ? profileError.message : "Không tải được profile.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <section className="mx-auto w-full max-w-md rounded-lg border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-950">Đăng nhập fclass-f1</h1>
        <p className="mt-1 text-sm text-slate-600">
          Hệ thống sẽ kiểm tra role và trạng thái duyệt từ Supabase.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block text-sm font-medium text-slate-700">
            Email
            <input
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
            />
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Mật khẩu
            <input
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              minLength={6}
              required
            />
          </label>

          {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

          <button
            className="w-full rounded-md bg-slate-950 px-4 py-2 font-medium text-white disabled:opacity-60"
            type="submit"
            disabled={loading}
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        <p className="mt-3 text-center text-sm">
          <Link className="font-medium text-slate-950 underline" to="/forgot-password">
            Quên mật khẩu?
          </Link>
        </p>

        <p className="mt-4 text-center text-sm text-slate-600">
          Chưa có tài khoản?{" "}
          <Link className="font-medium text-slate-950 underline" to="/register">
            Đăng ký học viên
          </Link>
        </p>
      </section>
    </main>
  );
}
