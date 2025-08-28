import { listCourses } from "../src/lib/content-fs";
import { getCurrentUserServer } from "../src/lib/auth-session";
import { adminFirestore } from "../src/lib/firebase-admin";

export default async function HomePage() {
  const courses = listCourses();
  const user = await getCurrentUserServer();
  let subscribed: Record<string, { state: string }> = {};
  if (user) {
    try {
      const db = adminFirestore();
      const snap = await db.collection("users").doc(user.uid).get();
      if (snap.exists) {
        const d: any = snap.data();
        (d.courses || []).forEach((cid: string) => {
          const st = d.courseAccess?.[cid]?.state || "";
          subscribed[cid] = { state: st };
        });
      }
    } catch {}
  }
  return (
    <div className="space-y-10">
      <header className="space-y-4 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-brand/90 to-emerald-300/70 bg-clip-text text-transparent">
          Plataforma de Cursos
        </h1>
        <p className="mx-auto text-sm sm:text-base text-neutral-400 max-w-2xl leading-relaxed">
          Accede a los materiales de estudio organizados por curso y avanza a tu
          ritmo. Los estudiantes activos desbloquean nuevas lecciones con la
          guía del profesor y los graduados tienen acceso completo y
          actualizado.
        </p>
      </header>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((c) => (
          <a
            key={c.courseId}
            href={`/course/${c.courseId}`}
            className="group relative rounded-xl border border-neutral-800 bg-neutral-950 p-5 flex flex-col hover:border-brand hover:shadow-[0_0_0_1px_var(--color-brand)] transition"
          >
            {subscribed[c.courseId] && (
              <div className="pointer-events-none absolute bottom-2 right-2 flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-brand/20 text-brand text-[10px] font-medium border border-brand/40 shadow">
                  Suscrito
                </span>
                {subscribed[c.courseId].state && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-medium border shadow capitalize ${
                      subscribed[c.courseId].state === "activo"
                        ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/40"
                        : subscribed[c.courseId].state === "inactivo"
                        ? "bg-neutral-800 text-neutral-400 border-neutral-600"
                        : subscribed[c.courseId].state === "graduado"
                        ? "bg-indigo-500/15 text-indigo-400 border-indigo-500/40"
                        : "bg-neutral-800 text-neutral-400 border-neutral-600"
                    }`}
                  >
                    {subscribed[c.courseId].state}
                  </span>
                )}
              </div>
            )}
            <div className="flex-1">
              <h2 className="text-lg font-semibold mb-1 text-neutral-200 group-hover:text-brand transition">
                {c.title}
              </h2>
              {c.summary && (
                <p className="text-xs text-neutral-400 leading-relaxed line-clamp-4">
                  {c.summary}
                </p>
              )}
            </div>
            <span className="mt-4 inline-flex items-center text-[11px] uppercase tracking-wide text-brand/80 group-hover:text-brand font-medium">
              Ver temario →
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
