import { FormEvent, useEffect, useState } from "react";
import { supabase, type FclassClass } from "../lib/supabaseClient";

export default function AdminClassesPage() {
  const [classes, setClasses] = useState<FclassClass[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function loadClasses() {
    setLoading(true);
    const { data, error: loadError } = await supabase
      .from("classes")
      .select("id,name,description,created_at")
      .order("created_at", { ascending: true });

    if (loadError) {
      setError(loadError.message);
      setClasses([]);
    } else {
      setError(null);
      setClasses(data ?? []);
    }
    setLoading(false);
  }

  useEffect(() => {
    void loadClasses();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage(null);
    setError(null);

    const { error: insertError } = await supabase.from("classes").insert({
      name: name.trim(),
      description: description.trim() || null,
    });

    if (insertError) {
      setError(insertError.message);
    } else {
      setMessage("Đã tạo lớp.");
      setName("");
      setDescription("");
      await loadClasses();
    }

    setSaving(false);
  }

  return (
    <main className="grid gap-6 p-6 lg:grid-cols-[360px_1fr]">
      <section className="rounded-lg border bg-white p-5 shadow-sm">
        <h1 className="text-xl font-semibold text-slate-950">Quản lý lớp</h1>
        <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-slate-700">
            Tên lớp
            <input
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="TuWi A1"
              required
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Mô tả
            <textarea
              className="mt-1 min-h-24 w-full rounded-md border border-slate-300 px-3 py-2"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </label>
          {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
          {message && <p className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{message}</p>}
          <button
            className="w-full rounded-md bg-slate-950 px-4 py-2 font-medium text-white disabled:opacity-60"
            disabled={saving}
            type="submit"
          >
            {saving ? "Đang lưu..." : "Tạo lớp"}
          </button>
        </form>
      </section>

      <section className="rounded-lg border bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-950">Lớp hiện có</h2>
        {loading ? (
          <p className="mt-4 text-sm text-slate-600">Đang tải...</p>
        ) : classes.length === 0 ? (
          <p className="mt-4 text-sm text-slate-600">Chưa có lớp.</p>
        ) : (
          <div className="mt-4 space-y-3">
            {classes.map((item) => (
              <div className="rounded-md border p-4" key={item.id}>
                <div className="font-medium text-slate-950">{item.name}</div>
                <div className="text-sm text-slate-600">{item.description || "Không có mô tả"}</div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
