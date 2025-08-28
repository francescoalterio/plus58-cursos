"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function InviteRegisterForm({ inviteId }: { inviteId: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    if (password !== password2) {
      setLoading(false);
      setStatus("Las contraseñas no coinciden");
      return;
    }
    try {
      const res = await fetch("/api/register-with-invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inviteId,
          email,
          password,
          fullName: fullName.trim(),
          birthDate: birthDate || null,
          idNumber: idNumber.trim(),
        }),
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
          Nombre completo
        </label>
        <input
          type="text"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
        />
      </div>
      <div className="flex gap-4 flex-wrap">
        <div className="space-y-2 flex-1 min-w-[180px]">
          <label className="block text-xs uppercase tracking-wide text-neutral-400">
            Fecha de nacimiento
          </label>
          <input
            type="date"
            required
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>
        <div className="space-y-2 flex-1 min-w-[180px]">
          <label className="block text-xs uppercase tracking-wide text-neutral-400">
            Número de cédula
          </label>
          <input
            type="text"
            required
            value={idNumber}
            maxLength={30}
            onChange={(e) => setIdNumber(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
            placeholder="Ej: V-12345678"
          />
        </div>
      </div>
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
      <div className="space-y-2">
        <label className="block text-xs uppercase tracking-wide text-neutral-400">
          Confirmar contraseña
        </label>
        <input
          type="password"
          required
          minLength={6}
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          className={`w-full bg-neutral-900 border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand ${
            password2 && password !== password2
              ? "border-red-600 focus:ring-red-600"
              : "border-neutral-700"
          }`}
        />
        {password2 && password !== password2 && (
          <p className="text-[11px] text-red-400">
            No coincide con la contraseña.
          </p>
        )}
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
