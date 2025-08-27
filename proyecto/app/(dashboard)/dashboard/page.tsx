import StudentsTable from "../../../src/components/StudentsTable";
import InviteCreator from "../../../src/components/InviteCreator";
import { ActiveInvitesList } from "../../../src/components/ActiveInvitesList";
import { getCurrentUserServer } from "../../../src/lib/auth-session";
import { isProfessorEmail } from "../../../src/lib/firebase-admin";
import { redirect } from "next/navigation";
import { listCourses, listLessonsMeta } from "../../../src/lib/content-fs";

export default async function DashboardPage() {
  const user = await getCurrentUserServer();
  if (!user || !isProfessorEmail(user.email)) redirect("/login");
  const courses = listCourses();
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-brand mb-1">
          Dashboard Profesor
        </h2>
        <p className="text-sm text-neutral-400">
          Gestión de estudiantes (versión inicial de solo lectura).
        </p>
      </div>
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-neutral-200">Cursos</h3>
        <div className="overflow-x-auto border border-neutral-800 rounded-lg">
          <table className="w-full text-xs md:text-sm min-w-[640px]">
            <thead className="bg-neutral-900 text-neutral-300 text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left px-2 py-2 font-medium">ID</th>
                <th className="text-left px-2 py-2 font-medium">Título</th>
                <th className="text-left px-2 py-2 font-medium">Lecciones</th>
                <th className="text-left px-2 py-2 font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((c) => {
                const lessons = listLessonsMeta(c.courseId);
                return (
                  <tr
                    key={c.courseId}
                    className="border-t border-neutral-800 hover:bg-neutral-900/60"
                  >
                    <td
                      className="px-2 py-2 font-mono text-[10px] max-w-[160px] truncate"
                      title={c.courseId}
                    >
                      {c.courseId}
                    </td>
                    <td className="px-2 py-2 text-[11px]">{c.title}</td>
                    <td className="px-2 py-2 text-[11px]">{lessons.length}</td>
                    <td className="px-2 py-2 text-[11px]">
                      <div className="flex gap-2 flex-wrap">
                        <a
                          href={`/courses/${c.courseId}`}
                          className="px-2 py-0.5 rounded border border-neutral-700 hover:border-brand text-neutral-300 hover:text-brand transition text-[10px]"
                        >
                          Temario Admin
                        </a>
                        <a
                          href="/courses"
                          className="px-2 py-0.5 rounded border border-neutral-700 hover:border-brand text-neutral-300 hover:text-brand transition text-[10px]"
                        >
                          Lista Global
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 mb-4">
        <a
          href="/courses"
          className="text-xs px-3 py-2 rounded border border-neutral-700 hover:border-brand text-neutral-300 hover:text-brand transition"
        >
          Ver todos los cursos
        </a>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <StudentsTable />
        </div>
        <div className="space-y-6">
          <InviteCreator defaultCourseId="curso-python-basico" />
          <ActiveInvitesList courseId="curso-python-basico" />
        </div>
      </div>
    </div>
  );
}
