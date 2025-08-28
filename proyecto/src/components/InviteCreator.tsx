"use client";
import { useState } from "react";

export default function InviteCreator({
  defaultCourseId,
}: {
  defaultCourseId: string;
}) {
  const [courseId, setCourseId] = useState(defaultCourseId);
  const [maxUses, setMaxUses] = useState<string>("");
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function createInvite(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setUrl(null);
    try {
      let parsed: number | undefined = undefined;
      if (maxUses.trim() !== "") {
        if (!/^\d+$/.test(maxUses.trim())) {
          throw new Error("maxUses debe ser un número entero positivo");
        }
        parsed = parseInt(maxUses, 10);
        if (parsed <= 0) throw new Error("maxUses debe ser > 0");
      }
      const res = await fetch("/api/invites/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId,
          maxUses: parsed,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error creando invitación");
      const id = data.invite.id;
      const base = window.location.origin;
      // Página existente: /(auth)/register usa query ?invite=
      const full = `${base}/register?invite=${id}`;
      setUrl(full);
      // Disparar evento para que listas activas se refresquen sin recargar toda la página
      window.dispatchEvent(new CustomEvent("invites-updated"));
      // Opcional: scroll al bloque
      setTimeout(() => {
        const el = document.getElementById("last-invite-url");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 50);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="border border-neutral-800 rounded-lg p-4 space-y-3">
      <h3 className="font-semibold text-sm">Crear invitación</h3>
      <form onSubmit={createInvite} className="flex flex-col gap-3 text-xs">
        <input
          className="w-full bg-neutral-900 border border-neutral-700 rounded px-2 py-2 text-xs"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          placeholder="courseId"
        />
        <input
          type="number"
          min={1}
          className="w-full bg-neutral-900 border border-neutral-700 rounded px-2 py-2 text-xs"
          value={maxUses}
          onChange={(e) => setMaxUses(e.target.value.replace(/[^0-9]/g, ""))}
          placeholder="maxUses (opcional)"
        />
        <button
          disabled={loading || !courseId}
          className="w-full px-4 py-2 rounded bg-brand text-neutral-900 font-medium text-xs disabled:opacity-50"
        >
          {loading ? "Creando..." : "Crear invitación"}
        </button>
        {error && <p className="text-red-400">{error}</p>}
        {url && (
          <div
            id="last-invite-url"
            className="bg-neutral-900 border border-neutral-700 rounded p-2 break-all max-h-24 overflow-auto text-[11px]"
          >
            <p className="text-neutral-400">URL registro:</p>
            <p className="text-[11px] font-mono">{url}</p>
          </div>
        )}
      </form>
    </div>
  );
}
