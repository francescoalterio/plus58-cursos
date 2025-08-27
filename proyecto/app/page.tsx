import { listCourses } from "../src/lib/content-fs";

export default async function HomePage() {
  const courses = listCourses();
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((c) => (
        <a
          key={c.courseId}
          href={`/course/${c.courseId}`}
          className="group relative rounded-xl border border-neutral-800 bg-neutral-950 p-5 flex flex-col hover:border-brand hover:shadow-[0_0_0_1px_var(--color-brand)] transition"
        >
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
  );
}
