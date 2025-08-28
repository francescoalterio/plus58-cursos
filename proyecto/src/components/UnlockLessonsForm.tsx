"use client";
import { useState } from "react";

interface LessonMeta {
  slug: string;
  title: string;
}

interface Props {
  userId: string;
  courseId: string;
  lessons: LessonMeta[];
  compact?: boolean;
  unlockedLessonIds?: string[];
  onUnlocked?: (slug: string) => void;
  onBusy?: (busy: boolean) => void;
}

export function UnlockLessonsForm({
  userId,
  courseId,
  lessons,
  compact,
  unlockedLessonIds = [],
  onUnlocked,
  onBusy,
}: Props) {
  const [slug, setSlug] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!slug.trim()) return;
    setLoading(true);
    onBusy?.(true);
    setStatus(null);
    let finalSlug = slug.trim();
    if (!finalSlug.includes("--")) {
      finalSlug = `${courseId}--${finalSlug}`;
    }
    try {
      const res = await fetch("/api/dashboard/students/unlock-slug", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, slug: finalSlug }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error");
      setStatus("Ok");
      const doneSlug = finalSlug;
      setSlug("");
      onUnlocked?.(doneSlug);
    } catch (e: any) {
      setStatus(e.message || "Error");
    } finally {
      setLoading(false);
      onBusy?.(false);
    }
  }

  const inputClasses = compact
    ? "bg-neutral-900 border border-neutral-700 rounded px-1 py-0.5 text-[10px]"
    : "bg-neutral-900 border border-neutral-700 rounded px-2 py-1";
  const btnClasses = compact
    ? "px-1.5 py-0.5 rounded bg-brand text-neutral-900 text-[10px] disabled:opacity-50"
    : "px-2 py-1 rounded bg-brand text-neutral-900 disabled:opacity-50";

  return (
    <form
      onSubmit={submit}
      className={`flex items-stretch ${compact ? "gap-1" : "gap-2"} ${
        compact ? "text-[10px]" : "text-xs"
      }`}
    >
      <select
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        className={`${inputClasses} flex-1`}
      >
        <option value="">
          {compact ? "lección..." : "Selecciona lección"}
        </option>
        {lessons
          .filter(
            (l) =>
              !unlockedLessonIds.includes(l.slug) &&
              !unlockedLessonIds.includes(
                l.slug.includes("--") ? l.slug : `${courseId}--${l.slug}`
              )
          )
          .map((l) => (
            <option key={l.slug} value={l.slug}>
              {l.slug.replace(`${courseId}--`, "")}
            </option>
          ))}
      </select>
      <button
        disabled={loading || !slug.trim()}
        className={`${btnClasses} h-full`}
        title={compact ? "Desbloquear" : "Desbloquear lección"}
      >
        {loading ? "…" : compact ? "+" : "Agregar"}
      </button>
      {status && (
        <span className="self-center text-neutral-400 ml-1" title={status}>
          {status}
        </span>
      )}
    </form>
  );
}
