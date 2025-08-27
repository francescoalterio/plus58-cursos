import { listCourses, listLessonsMeta } from "../../../src/lib/content-fs";
import { getCurrentUserServer } from "../../../src/lib/auth-session";
import { isProfessorEmail } from "../../../src/lib/firebase-admin";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function CoursesAdminPage() {
  const user = await getCurrentUserServer();
  if (!user || !isProfessorEmail(user.email)) redirect("/login");
  const courses = listCourses();
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-brand mb-1">Cursos (Admin)</h1>
        <p className="text-sm text-neutral-400">
          Listado completo de cursos y sus lecciones. Acceso sin restricciones
          (solo profesor).
        </p>
      </header>
      <div className="space-y-10">
        {courses.map((c) => {
          const lessons = listLessonsMeta(c.courseId);
          return (
            <section key={c.courseId} className="space-y-4">
              <div className="flex items-baseline gap-4">
                <h2 className="text-xl font-semibold text-neutral-200">
                  {c.title}
                </h2>
                <span className="text-xs px-2 py-0.5 rounded bg-neutral-800 text-neutral-400 font-mono">
                  {c.courseId}
                </span>
                {c.summary && (
                  <p className="text-xs text-neutral-500 flex-1">{c.summary}</p>
                )}
              </div>
              <div className="border border-neutral-800 rounded-lg divide-y divide-neutral-800 overflow-hidden">
                {lessons.map((l) => (
                  <div
                    key={l.slug}
                    className="p-3 flex items-start justify-between gap-4 hover:bg-neutral-900/60"
                  >
                    <div className="space-y-1 min-w-0">
                      <p
                        className="text-sm font-medium text-neutral-200 truncate"
                        title={l.title}
                      >
                        {l.title}
                      </p>
                      <p
                        className="text-[11px] text-neutral-500 font-mono truncate"
                        title={l.file}
                      >
                        {l.file}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Link
                        href={`/lesson/${l.slug}`}
                        className="text-xs px-2 py-1 rounded bg-brand text-neutral-900 hover:opacity-90 transition"
                      >
                        Ver
                      </Link>
                      <a
                        href={`/course/${c.courseId}#${l.slug}`}
                        className="text-xs px-2 py-1 rounded border border-neutral-700 hover:border-brand text-neutral-300 transition"
                      >
                        Curso
                      </a>
                    </div>
                  </div>
                ))}
                {!lessons.length && (
                  <div className="p-4 text-sm text-neutral-500">
                    Sin lecciones.
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
