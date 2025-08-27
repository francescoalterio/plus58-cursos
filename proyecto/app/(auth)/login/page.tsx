"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error");
      // Redirigir al home después de login exitoso
      try {
        window.dispatchEvent(new Event("session-changed"));
      } catch {}
      router.push("/");
    } catch (err: any) {
      let msg = err.message || "Error";
      // Sanitizar por si pasa mensaje crudo de Firebase
      msg = msg.replace(/^Firebase:\s*/i, "");
      const match = msg.match(/\((auth\/[a-z0-9\-]+)\)/i);
      if (match) {
        const code = match[1];
        const map: Record<string, string> = {
          "auth/invalid-email": "Email inválido",
          "auth/user-disabled": "Usuario deshabilitado",
          "auth/user-not-found": "Usuario no encontrado",
          "auth/wrong-password": "Credenciales incorrectas",
          "auth/invalid-credential": "Credenciales incorrectas",
          "auth/too-many-requests": "Demasiados intentos. Intenta más tarde",
        };
        msg = map[code] || "Error de autenticación";
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="relative w-full max-w-sm bg-neutral-900 border border-neutral-800 rounded-lg p-6 space-y-4 shadow-md">
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-neutral-950/80 rounded-lg z-10">
            <div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-neutral-400 tracking-wide uppercase">
              Entrando...
            </p>
          </div>
        )}
        <h2 className="text-xl font-semibold text-brand">Iniciar sesión</h2>
        <form onSubmit={submit} className="space-y-4" aria-busy={loading}>
          <div className="space-y-1">
            <label className="text-xs text-neutral-400">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand disabled:opacity-60"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-neutral-400">Contraseña</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand disabled:opacity-60"
            />
          </div>
          <button
            disabled={loading}
            className="w-full bg-brand/90 hover:bg-brand text-neutral-900 font-semibold rounded-md py-2 text-sm disabled:opacity-60 transition shadow-sm"
          >
            {loading ? "Ingresando..." : "Ingrear"}
          </button>
          {error && <p className="text-xs text-red-400 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
}
