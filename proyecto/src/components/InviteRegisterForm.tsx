"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function InviteRegisterForm({ inviteId }: { inviteId: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch("/api/register-with-invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inviteId, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error");
      setStatus("Registro completado, redirigiendo al login...");
      setSuccess(true);
    } catch (err: any) {
      setStatus(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (success) {
      const t = setTimeout(() => {
        router.push(`/login?email=${encodeURIComponent(email)}`);
      }, 1200);
      return () => clearTimeout(t);
    }
  }, [success, email, router]);

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="space-y-2">
        <label className="block text-xs uppercase tracking-wide text-neutral-400">
          Email
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-xs uppercase tracking-wide text-neutral-400">
          Contraseña
        </label>
        <input
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
        />
      </div>
      <button
        disabled={loading || success}
        className="w-full bg-brand text-neutral-900 font-medium rounded py-2 text-sm disabled:opacity-60 disabled:cursor-not-allowed hover:brightness-110 transition"
      >
        {loading ? "Registrando..." : success ? "Listo" : "Crear cuenta"}
      </button>
      {status && (
        <p className="text-xs text-center text-neutral-400">{status}</p>
      )}
    </form>
  );
}
