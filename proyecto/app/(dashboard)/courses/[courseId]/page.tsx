import { getCurrentUserServer } from "../../../../src/lib/auth-session";
import { isProfessorEmail } from "../../../../src/lib/firebase-admin";
import { redirect } from "next/navigation";
import { getCourse, listLessonsMeta } from "../../../../src/lib/content-fs";
import Link from "next/link";
import LessonAdminActions from "../../../../src/components/LessonAdminActions";

interface Props {
  params: { courseId: string };
}

export default async function AdminCourseDetailPage({ params }: Props) {
  const user = await getCurrentUserServer();
  if (!user || !isProfessorEmail(user.email)) redirect("/login");
  const course = getCourse(params.courseId);
  if (!course) return redirect("/courses");
  const lessons = listLessonsMeta(course.courseId);
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold text-brand">
          {course.title} (Admin)
        </h1>
        <div className="flex flex-wrap gap-3 items-center text-xs text-neutral-400">
          <span className="font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
            {course.courseId}
          </span>
          {course.summary && (
            <span className="text-neutral-500">{course.summary}</span>
          )}
          <Link href="/dashboard" className="text-brand hover:underline">
            ← Volver Dashboard
          </Link>
          <Link href="/courses" className="text-brand/70 hover:underline">
            Lista Global
          </Link>
          <Link
            href={`/course/${course.courseId}`}
            className="text-brand/70 hover:underline"
          >
            Vista Pública Curso
          </Link>
        </div>
      </header>
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Lecciones ({lessons.length})</h2>
        <div className="overflow-x-auto border border-neutral-800 rounded-lg">
          <table className="w-full text-xs md:text-sm min-w-[920px]">
            <thead className="bg-neutral-900 text-neutral-300 text-[11px] uppercase tracking-wide">
              <tr>
                <th className="text-left px-2 py-2 font-medium">#</th>
                <th className="text-left px-2 py-2 font-medium">Título</th>
                <th className="text-left px-2 py-2 font-medium">Slug Global</th>
                <th className="text-left px-2 py-2 font-medium">Archivo</th>
                <th className="text-left px-2 py-2 font-medium">Orden</th>
                <th className="text-left px-2 py-2 font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {lessons.map((l, i) => (
                <tr
                  key={l.slug}
                  className="border-t border-neutral-800 hover:bg-neutral-900/60"
                >
                  <td className="px-2 py-1 text-[11px] w-10 text-neutral-400">
                    {i + 1}
                  </td>
                  <td
                    className="px-2 py-1 text-[11px] max-w-[260px] truncate"
                    title={l.title}
                  >
                    {l.title}
                  </td>
                  <td
                    className="px-2 py-1 font-mono text-[10px] max-w-[220px] truncate"
                    title={l.slug}
                  >
                    {l.slug}
                  </td>
                  <td
                    className="px-2 py-1 font-mono text-[10px] max-w-[160px] truncate"
                    title={l.file}
                  >
                    {l.file}
                  </td>
                  <td className="px-2 py-1 text-[11px] text-center w-12">
                    {l.order ?? "-"}
                  </td>
                  <td className="px-2 py-1 text-[11px]">
                    <LessonAdminActions slug={l.slug} file={l.file} />
                  </td>
                </tr>
              ))}
              {!lessons.length && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-6 text-sm text-neutral-500 text-center"
                  >
                    Sin lecciones.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function copyToClipboard(text: string) {
  if (typeof navigator !== "undefined" && navigator.clipboard) {
    navigator.clipboard.writeText(text).catch(() => {});
  }
}
