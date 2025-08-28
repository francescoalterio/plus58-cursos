"use client";
import { useEffect, useState } from "react";

interface InviteRow {
  id: string;
  courseId: string;
  used: number;
  maxUses?: number;
  createdAt?: any;
}

export function ActiveInvitesList({ courseId }: { courseId?: string }) {
  const [invites, setInvites] = useState<InviteRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const q = courseId ? `?courseId=${encodeURIComponent(courseId)}` : "";
      const res = await fetch(`/api/invites/list${q}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error cargando invitaciones");
      let list: InviteRow[] = data.invites || [];
      if (courseId && list.length === 0) {
        // Fallback silencioso: traer todas para que el usuario vea si existe con otro courseId
        try {
          const resAll = await fetch(`/api/invites/list`);
          if (resAll.ok) {
            const dataAll = await resAll.json();
            if (Array.isArray(dataAll.invites) && dataAll.invites.length > 0) {
              list = dataAll.invites as InviteRow[];
            }
          }
        } catch {}
      }
      setInvites(list);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [courseId]);

  useEffect(() => {
    const handler = () => load();
    window.addEventListener("invites-updated", handler);
    return () => window.removeEventListener("invites-updated", handler);
  }, []);

  if (loading)
    return (
      <div className="text-xs text-neutral-500">Cargando invitaciones...</div>
    );
  if (error) return <div className="text-xs text-red-400">{error}</div>;

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-semibold">Invitaciones activas</h4>
      {invites.length === 0 && (
        <p className="text-xs text-neutral-500">No hay invitaciones activas.</p>
      )}
      <ul className="space-y-1 max-h-60 overflow-auto pr-1">
        {invites.map((inv) => {
          const remaining = inv.maxUses ? inv.maxUses - inv.used : null;
          const url = `${window.location.origin}/register?invite=${inv.id}`;
          return (
            <li
              key={inv.id}
              className="border border-neutral-800 rounded p-2 text-[11px] flex flex-col gap-1 bg-neutral-900/40"
            >
              <div className="flex justify-between items-start gap-2">
                <div className="flex flex-col">
                  <span className="font-mono text-neutral-300">{inv.id}</span>
                  <span className="text-neutral-500 text-[10px]">
                    {inv.courseId}
                  </span>
                </div>
                <button
                  onClick={async () => {
                    if (!confirm("Eliminar invitación?")) return;
                    await fetch(`/api/invites/delete?id=${inv.id}`, {
                      method: "DELETE",
                    });
                    load();
                  }}
                  className="px-1.5 py-0.5 rounded bg-red-600/20 text-red-400 border border-red-700/40 hover:bg-red-600/30 text-[10px]"
                >
                  Eliminar
                </button>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>
                  Usos: {inv.used}
                  {inv.maxUses ? ` / ${inv.maxUses}` : ""}
                  {remaining === 0 ? " (finalizada)" : ""}
                </span>
                {remaining !== null && remaining > 0 && (
                  <span className="text-green-500">Quedan {remaining}</span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <div className="break-all text-neutral-500">
                  <a href={url} className="hover:text-brand">
                    {url}
                  </a>
                </div>
                <div className="flex gap-2">
                  <CopyButton text={url} label="Copiar URL" />
                  <CopyButton text={inv.id} label="Copiar ID" small />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <button onClick={load} className="text-[11px] text-brand underline">
        Refrescar
      </button>
    </div>
  );
}

function CopyButton({
  text,
  label,
  small,
}: {
  text: string;
  label: string;
  small?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  }
  return (
    <button
      onClick={copy}
      className={`px-2 py-0.5 rounded border text-[10px] transition ${
        copied
          ? "bg-brand text-neutral-900 border-brand"
          : "bg-neutral-800 text-neutral-300 border-neutral-700 hover:border-brand hover:text-brand"
      } ${small ? "px-1.5" : ""}`}
      title={label}
    >
      {copied ? "Copiado" : label}
    </button>
  );
}
