import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName.trim() },
      },
    });

    if (signUpError || !data.user) {
      setError(signUpError?.message ?? "Đăng ký thất bại.");
      setLoading(false);
      return;
    }

    // If email confirmation is off, create the profile immediately.
    // If confirmation is on, the database trigger creates the same pending profile
    // after confirmation and the user will be asked to check email.
    if (data.session) {
      const { data: existingProfile, error: loadProfileError } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", data.user.id)
        .maybeSingle();

      if (loadProfileError) {
        setError(loadProfileError.message);
        setLoading(false);
        return;
      }

      const { error: profileError } = existingProfile
        ? { error: null }
        : await supabase.from("profiles").insert({
            id: data.user.id,
            email,
            full_name: fullName.trim(),
            role: "student",
            status: "pending",
          });

      if (profileError) {
        setError(profileError.message);
        setLoading(false);
        return;
      }
    }

    setMessage(
      data.session
        ? "Đăng ký thành công. Vui lòng chờ admin duyệt."
        : "Đăng ký thành công. Hãy kiểm tra email để xác nhận tài khoản, sau đó chờ admin duyệt.",
    );
    setFullName("");
    setEmail("");
    setPassword("");
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <section className="mx-auto w-full max-w-md rounded-lg border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-950">Đăng ký học viên</h1>
        <p className="mt-1 text-sm text-slate-600">
          Tài khoản mới luôn là student/pending cho tới khi admin duyệt.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block text-sm font-medium text-slate-700">
            Họ và tên
            <input
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              autoComplete="name"
              required
            />
          </label>

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
              autoComplete="new-password"
              minLength={6}
              required
            />
          </label>

          {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
          {message && <p className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{message}</p>}

          <button
            className="w-full rounded-md bg-slate-950 px-4 py-2 font-medium text-white disabled:opacity-60"
            type="submit"
            disabled={loading}
          >
            {loading ? "Đang tạo tài khoản..." : "Đăng ký"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-slate-600">
          Đã có tài khoản?{" "}
          <Link className="font-medium text-slate-950 underline" to="/login">
            Đăng nhập
          </Link>
        </p>
      </section>
    </main>
  );
}
