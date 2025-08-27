import { getCourse, listLessonsMeta } from "../../../src/lib/content-fs";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCurrentUserServer } from "../../../src/lib/auth-session";
import {
  adminFirestore,
  isProfessorEmail,
} from "../../../src/lib/firebase-admin";
import { firestore } from "../../../src/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

interface Props {
  params: { courseId: string };
}

export default async function CoursePage({ params }: Props) {
  const course = getCourse(params.courseId);
  if (!course) return notFound();
  const lessons = listLessonsMeta(course.courseId);

  // Obtener usuario (opcional, no forzamos login para ver temario)
  const user = await getCurrentUserServer();
  let courseAccess: any = null;
  let isProfessor = false;
  if (user) {
    isProfessor = isProfessorEmail(user.email || undefined);
    try {
      const adb: any = adminFirestore();
      const snap = await adb.collection("users").doc(user.uid).get();
      const data = snap.exists ? snap.data() : null;
      courseAccess = data?.courseAccess?.[course.courseId] || null;
    } catch {
      try {
        const db = firestore();
        const ref = doc(db, "users", user.uid);
        const usnap = await getDoc(ref);
        const data: any = usnap.exists() ? usnap.data() : null;
        courseAccess = data?.courseAccess?.[course.courseId] || null;
      } catch {}
    }
  }

  function statusFor(lessonSlug: string): { code: string; label: string } {
    if (isProfessor) return { code: "unlocked", label: "Disponible" };
    if (!user) return { code: "no-access", label: "Sin acceso" };
    if (!courseAccess) return { code: "no-access", label: "Sin acceso" };
    if (courseAccess.state === "inactivo")
      return { code: "no-access", label: "Inactivo" };
    if (courseAccess.state === "graduado")
      return { code: "unlocked", label: "Disponible" };
    const unlocked: string[] = courseAccess.unlockedLessons || [];
    if (unlocked.includes(lessonSlug))
      return { code: "unlocked", label: "Disponible" };
    return { code: "locked", label: "Pendiente" };
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-brand mb-2">{course.title}</h1>
        {course.summary && (
          <p className="text-sm text-neutral-400 max-w-2xl leading-relaxed">
            {course.summary}
          </p>
        )}
      </header>
      <section>
        <h2 className="text-xl font-semibold mb-4">Temario</h2>
        <ol className="space-y-2">
          {lessons.map((l) => {
            const st = statusFor(l.slug);
            const icon =
              st.code === "unlocked" ? (
                <svg
                  className="w-4 h-4 text-brand"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : st.code === "locked" ? (
                <svg
                  className="w-4 h-4 text-amber-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 4h12M6 20h12M6 4v4a5 5 0 002 4 5 5 0 01-2 4v4m12-16v4a5 5 0 01-2 4 5 5 0 002 4v4"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 11V7a4 4 0 10-8 0v4M6 11h12m-7 4h2"
                  />
                  <rect width="16" height="10" x="4" y="11" rx="2" ry="2" />
                </svg>
              );
            const badgeClasses =
              st.code === "unlocked"
                ? "bg-brand/15 text-brand border-brand/30"
                : st.code === "locked"
                ? "bg-amber-900/20 text-amber-300 border-amber-600/40"
                : "bg-red-900/20 text-red-300 border-red-700/40";
            return (
              <li
                key={l.slug}
                className={`group border border-neutral-800 rounded-md transition overflow-hidden ${
                  st.code === "unlocked"
                    ? "hover:border-brand"
                    : "hover:border-neutral-700"
                }`}
              >
                <Link
                  href={`/lesson/${l.slug}`}
                  className={`block p-4 focus:outline-none focus:ring-2 focus:ring-brand/70 rounded-md transition ${
                    st.code === "unlocked" ? "" : "opacity-85 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p
                        className="font-medium text-neutral-200 truncate"
                        title={l.title}
                      >
                        {l.title}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 inline-flex items-center gap-1 px-2 py-1 rounded border text-[10px] font-medium ${badgeClasses}`}
                      title={st.label}
                    >
                      {icon}
                      {st.label}
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
