"use client";
import { useEffect, useState } from "react";
import { UnlockLessonsForm } from "./UnlockLessonsForm";

interface CourseLite {
  courseId: string;
  title: string;
  lessons: { slug: string; title: string }[];
}

interface StudentRow {
  id: string; // userId_courseId
  userId: string;
  email?: string;
  courseId: string;
  state: string;
  unlockedLessonIds: string[];
}

export default function StudentsTable() {
  const [rows, setRows] = useState<StudentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [courseData, setCourseData] = useState<CourseLite[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    (async () => {
      try {
        const [studentsRes, coursesRes] = await Promise.all([
          fetch("/api/dashboard/students"),
          fetch("/api/dashboard/courses-lessons"),
        ]);
        const studentsJson = await studentsRes.json();
        if (!studentsRes.ok)
          throw new Error(studentsJson.error || "Error estudiantes");
        const coursesJson = await coursesRes.json();
        if (!coursesRes.ok)
          throw new Error(coursesJson.error || "Error cursos");
        setRows(studentsJson.students);
        setCourseData(coursesJson.courses || []);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading)
    return <p className="text-sm text-neutral-400">Cargando estudiantes...</p>;
  if (error) return <p className="text-sm text-red-400">{error}</p>;
  if (!rows.length)
    return <p className="text-sm text-neutral-500">Sin estudiantes todavía.</p>;

  // Agrupar por usuario
  const grouped: Record<string, StudentRow[]> = {};
  rows.forEach((r) => {
    grouped[r.userId] = grouped[r.userId] || [];
    grouped[r.userId].push(r);
  });

  const users = Object.keys(grouped).sort();

  return (
    <div className="space-y-4">
      {users.map((uid) => {
        const courses = grouped[uid].sort((a, b) =>
          a.courseId.localeCompare(b.courseId)
        );
        const email = courses[0]?.email;
        const totalUnlocked = courses.reduce(
          (acc, c) => acc + (c.unlockedLessonIds?.length || 0),
          0
        );
        const isOpen = expanded[uid];
        return (
          <div
            key={uid}
            className="border border-neutral-800 rounded-lg overflow-hidden"
          >
            <div className="flex items-center justify-between gap-4 px-3 py-2 bg-neutral-900/60">
              <div className="flex items-center gap-4 min-w-0">
                <button
                  onClick={() => setExpanded((e) => ({ ...e, [uid]: !isOpen }))}
                  className="text-xs px-2 py-1 rounded bg-neutral-800 hover:bg-neutral-700 transition font-mono"
                >
                  {isOpen ? "−" : "+"}
                </button>
                <div className="space-y-1 min-w-0">
                  <p className="font-mono text-[11px] truncate" title={uid}>
                    {uid}
                  </p>
                  <p
                    className="text-[11px] text-neutral-400 truncate"
                    title={email}
                  >
                    {email || "(sin email)"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="text-[10px] text-neutral-400">
                  Cursos: {courses.length}
                </div>
                <div className="text-[10px] text-neutral-400">
                  Lecciones desbloqueadas: {totalUnlocked}
                </div>
                <AddCourseForm
                  userId={uid}
                  courses={courseData}
                  owned={courses.map((c) => c.courseId)}
                />
              </div>
            </div>
            {isOpen && (
              <div className="p-3 space-y-4 bg-neutral-950/60">
                <div className="overflow-x-auto">
                  <table className="w-full text-[11px] min-w-[760px]">
                    <thead className="text-neutral-400 text-[10px] uppercase tracking-wide">
                      <tr>
                        <th className="text-left px-2 py-1 font-medium">
                          Curso
                        </th>
                        <th className="text-left px-2 py-1 font-medium">
                          Estado
                        </th>
                        <th className="text-left px-2 py-1 font-medium">
                          Cambiar
                        </th>
                        <th className="text-left px-2 py-1 font-medium">
                          Unlock
                        </th>
                        <th className="text-left px-2 py-1 font-medium">
                          #Lecciones
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {courses.map((c) => (
                        <tr
                          key={c.id}
                          className="border-t border-neutral-800 hover:bg-neutral-900/50"
                        >
                          <td className="px-2 py-1 font-mono text-[10px]">
                            {c.courseId}
                          </td>
                          <td className="px-2 py-1">
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-200 text-[10px] capitalize">
                              {c.state}
                            </span>
                          </td>
                          <td className="px-2 py-1">
                            <div className="flex flex-wrap gap-1">
                              {["activo", "inactivo", "graduado"].map((st) => {
                                const label =
                                  st === "activo"
                                    ? "Activo"
                                    : st === "inactivo"
                                    ? "Inactivo"
                                    : "Graduado";
                                return (
                                  <button
                                    key={st}
                                    onClick={() =>
                                      changeState(c.userId, c.courseId, st)
                                    }
                                    className={`px-2 py-0.5 rounded border border-neutral-700 hover:border-brand transition leading-none ${
                                      c.state === st
                                        ? "bg-brand text-neutral-900 font-medium"
                                        : "bg-neutral-800 text-neutral-300"
                                    }`}
                                    title={`Cambiar estado a ${label}`}
                                  >
                                    {label}
                                  </button>
                                );
                              })}
                            </div>
                          </td>
                          <td className="px-2 py-1 w-[190px] align-top">
                            {(() => {
                              const lessons =
                                courseData.find(
                                  (cd) => cd.courseId === c.courseId
                                )?.lessons || [];
                              return (
                                <div className="flex flex-col gap-1">
                                  <UnlockLessonsForm
                                    userId={c.userId}
                                    courseId={c.courseId}
                                    lessons={lessons}
                                    unlockedLessonIds={
                                      c.unlockedLessonIds || []
                                    }
                                    compact
                                  />
                                  <UnlockNextButton
                                    userId={c.userId}
                                    courseId={c.courseId}
                                    lessons={lessons}
                                    unlocked={c.unlockedLessonIds || []}
                                  />
                                </div>
                              );
                            })()}
                          </td>
                          <td className="px-2 py-1 text-center">
                            {c.unlockedLessonIds?.length || 0}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => deleteUser(uid)}
                    className="text-[10px] px-3 py-1 rounded border border-red-700 text-red-400 hover:bg-red-600/20 transition"
                  >
                    Eliminar usuario
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

async function changeState(userId: string, courseId: string, state: string) {
  try {
    await fetch("/api/dashboard/students/state", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, courseId, state }),
    });
    // Optimistic reload
    location.reload();
  } catch (e) {
    console.error(e);
  }
}

async function deleteUser(userId: string) {
  try {
    if (
      !confirm(
        "¿Eliminar usuario permanentemente? Esta acción no se puede deshacer."
      )
    )
      return;
    const res = await fetch(
      `/api/dashboard/students/delete?userId=${encodeURIComponent(userId)}`,
      { method: "DELETE" }
    );
    if (!res.ok) {
      alert("Error eliminando usuario");
      return;
    }
    location.reload();
  } catch (e) {
    console.error(e);
  }
}

function AddCourseForm({
  userId,
  courses,
  owned = [],
}: {
  userId: string;
  courses: CourseLite[];
  owned?: string[];
}) {
  const [courseId, setCourseId] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!courseId) return;
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch("/api/dashboard/students/add-course", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, courseId }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Error");
      setStatus("Ok");
      setCourseId("");
      setTimeout(() => location.reload(), 400);
    } catch (e: any) {
      setStatus(e.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <form
      onSubmit={submit}
      className="flex items-stretch gap-1 min-w-[170px] text-[10px]"
    >
      <select
        value={courseId}
        onChange={(e) => setCourseId(e.target.value)}
        className="bg-neutral-900 border border-neutral-700 rounded px-1 py-0.5 flex-1 focus:outline-none focus:ring-1 focus:ring-brand"
      >
        <option value="">curso...</option>
        {courses
          .filter((c) => !owned.includes(c.courseId))
          .map((c) => (
            <option key={c.courseId} value={c.courseId}>
              {c.courseId}
            </option>
          ))}
      </select>
      <button
        disabled={loading || !courseId}
        className="px-2 py-0.5 rounded bg-brand text-neutral-900 font-semibold disabled:opacity-50"
        title="Agregar curso"
      >
        {loading ? "…" : "+"}
      </button>
      {status && (
        <span className="self-center text-neutral-400 ml-1" title={status}>
          {status}
        </span>
      )}
    </form>
  );
}

function UnlockNextButton({
  userId,
  courseId,
  lessons,
  unlocked,
}: {
  userId: string;
  courseId: string;
  lessons: { slug: string; title: string }[];
  unlocked: string[];
}) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  // Normalizar unlocked a formato con prefijo completo
  const unlockedSet = new Set(
    (unlocked || []).map((s) => (s.includes("--") ? s : `${courseId}--${s}`))
  );
  const ordered = lessons.map((l) => l.slug);
  const next = ordered.find(
    (slug) =>
      !unlockedSet.has(slug.includes("--") ? slug : `${courseId}--${slug}`)
  );

  async function handle() {
    if (!next) return;
    setLoading(true);
    setStatus(null);
    const finalSlug = next.includes("--") ? next : `${courseId}--${next}`;
    try {
      const res = await fetch("/api/dashboard/students/unlock-slug", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, slug: finalSlug }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error");
      setStatus("Ok");
      setTimeout(() => location.reload(), 400);
    } catch (e: any) {
      setStatus(e.message || "Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handle}
      disabled={!next || loading}
      className="text-[10px] px-2 py-0.5 rounded bg-brand/20 border border-brand/40 text-brand hover:bg-brand/30 disabled:opacity-40 transition"
      title={
        next
          ? `Desbloquear siguiente (${next.replace(`${courseId}--`, "")})`
          : "Todo desbloqueado"
      }
    >
      {loading ? "…" : next ? "Siguiente" : "Completo"}
      {status && status !== "Ok" && (
        <span className="ml-1 text-neutral-400">{status}</span>
      )}
    </button>
  );
}
