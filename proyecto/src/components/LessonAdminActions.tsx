"use client";
import Link from "next/link";
import { useState } from "react";

export default function LessonAdminActions({
  slug,
  file,
}: {
  slug: string;
  file: string;
}) {
  const [copied, setCopied] = useState<string | null>(null);
  async function copy(text: string, kind: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(kind);
      setTimeout(() => setCopied(null), 1200);
    } catch {}
  }
  const btn =
    "px-2 py-0.5 rounded border border-neutral-700 hover:border-brand text-neutral-300 hover:text-brand transition text-[10px]";
  return (
    <div className="flex gap-1 flex-wrap items-center">
      <Link
        href={`/lesson/${slug}`}
        className="px-2 py-0.5 rounded bg-brand text-neutral-900 hover:opacity-90 transition text-[10px]"
      >
        Abrir
      </Link>
      <button onClick={() => copy(slug, "slug")} className={btn}>
        {copied === "slug" ? "Copiado" : "Copiar slug"}
      </button>
      <button onClick={() => copy(file, "file")} className={btn}>
        {copied === "file" ? "Copiado" : "Copiar archivo"}
      </button>
    </div>
  );
}
