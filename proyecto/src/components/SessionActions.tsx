"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";

interface SessionData {
  authenticated: boolean;
  email?: string;
}

export default function SessionActions() {
  const [session, setSession] = useState<SessionData | null>(null);
  const router = useRouter();
  const mounted = useRef(true);
  const pathname = usePathname();

  async function load() {
    try {
      const res = await fetch("/api/auth/session", { cache: "no-store" });
      const data = await res.json();
      if (!mounted.current) return;
      setSession(data);
    } catch {
      if (!mounted.current) return;
      setSession({ authenticated: false });
    }
  }

  useEffect(() => {
    mounted.current = true;
    load();
    // Refetch al cambiar de pestaña (para detectar expiración de cookie)
    const onVis = () => {
      if (document.visibilityState === "visible") load();
    };
    document.addEventListener("visibilitychange", onVis);
    // Intervalo ligero cada 2 min
    const id = setInterval(load, 120000);
    return () => {
      mounted.current = false;
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  // Revalidar cuando cambia la ruta (por ejemplo después de login push("/"))
  useEffect(() => {
    if (!session) return; // primera carga ya la hace el effect inicial
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Escuchar evento global de cambio de sesión (disparado tras login/logout)
  useEffect(() => {
    const handler = () => load();
    window.addEventListener("session-changed", handler);
    return () => window.removeEventListener("session-changed", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setSession({ authenticated: false });
    router.push("/");
  }

  if (!session) return <span className="text-xs text-neutral-500">...</span>;
  if (!session.authenticated)
    return (
      <a
        href="/login"
        className="text-xs sm:text-sm inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-brand/15 border border-brand/40 text-brand hover:bg-brand/25 hover:border-brand transition shadow-sm"
      >
        Ingrear
      </a>
    );
  return (
    <div className="flex items-center gap-3 text-sm">
      {session.authenticated && session.email && (
        <span
          className="text-neutral-400 hidden sm:inline"
          title={session.email}
        >
          {session.email}
        </span>
      )}
      <button
        onClick={logout}
        className="text-xs sm:text-sm px-3 py-1.5 rounded-md bg-red-500/15 border border-red-500/40 text-red-400 hover:bg-red-500/25 hover:border-red-500 transition shadow-sm"
        title="Cerrar sesión"
      >
        Salir
      </button>
    </div>
  );
}
