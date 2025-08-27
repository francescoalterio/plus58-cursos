import { getCurrentUserServer } from "../../../src/lib/auth-session";
import {
  getLesson,
  getCourse,
  listLessonsMeta,
} from "../../../src/lib/content-fs";
import ReactMarkdown from "react-markdown";
import { redirect } from "next/navigation";
import { firestore } from "../../../src/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { isProfessorEmail } from "../../../src/lib/firebase-admin";
import { adminFirestore } from "../../../src/lib/firebase-admin";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
// @ts-ignore
import hljs from "highlight.js";
import MarkdownTOC from "../../../src/components/MarkdownTOC";
import Link from "next/link";

interface Props {
  params: { slug: string };
}

export default async function LessonPage({ params }: Props) {
  const user = await getCurrentUserServer();
  if (!user) redirect("/login");

  const lessonFull = getLesson(params.slug);
  if (!lessonFull)
    return (
      <AccessNotice
        type="error"
        title="Lección no encontrada"
        description="El recurso solicitado no existe o fue movido."
        backHref="/"
        backLabel="Volver al inicio"
      />
    );
  const lesson: any = { ...lessonFull.meta, content: lessonFull.content };

  // Acceso: los profesores pueden ver siempre. Estudiantes pasan validaciones.
  const professor = isProfessorEmail(user.email || undefined);
  if (!professor) {
    let userData: any = null;
    try {
      const adb: any = adminFirestore();
      const snap = await adb.collection("users").doc(user.uid).get();
      userData = snap.exists ? snap.data() : null;
    } catch {
      const db = firestore();
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      userData = userSnap.exists() ? userSnap.data() : null;
    }
    const courseAccess = userData?.courseAccess?.[lesson.courseId];
    if (!courseAccess)
      return (
        <AccessNotice
          type="error"
          title="Acceso restringido"
          description="No tienes acceso asignado a este curso todavía. Consulta con tu profesor."
          icon="lock"
          backHref={`/course/${lesson.courseId}`}
          backLabel="Volver al temario"
        />
      );
    if (courseAccess.state === "inactivo")
      return (
        <AccessNotice
          type="error"
          title="Estado inactivo"
          description="Tu cuenta está marcada como inactiva. Pide reactivación para continuar."
          icon="pause"
          backHref={`/course/${lesson.courseId}`}
          backLabel="Volver al temario"
        />
      );
    if (courseAccess.state !== "graduado") {
      const unlocked: string[] = courseAccess.unlockedLessons || [];
      if (!unlocked.includes(params.slug))
        return (
          <AccessNotice
            type="warn"
            title="Lección bloqueada"
            description="Tu profesor aún no ha desbloqueado este tema. Vuelve más tarde."
            icon="hourglass"
            backHref={`/course/${lesson.courseId}`}
            backLabel="Volver al temario"
          />
        );
    }
  }

  const course = getCourse(lesson.courseId);
  const allLessons = course ? listLessonsMeta(course.courseId) : [];
  const idx = allLessons.findIndex((l) => l.slug === params.slug);
  const prev = idx > 0 ? allLessons[idx - 1] : null;
  const next =
    idx >= 0 && idx < allLessons.length - 1 ? allLessons[idx + 1] : null;

  return (
    <div className="flex gap-10">
      <div className="flex-1 space-y-10">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="text-xs text-neutral-400 flex items-center gap-2">
            <Link
              href={`/course/${lesson.courseId}`}
              className="text-brand hover:underline"
            >
              ← Volver al curso
            </Link>
            <span className="opacity-50">/</span>
            <span>{course?.title}</span>
          </div>
          <div className="text-[11px] uppercase tracking-wide text-neutral-500">
            Lección {idx + 1} de {allLessons.length}
          </div>
        </div>
        <article className="prose prose-invert max-w-none prose-pre:bg-neutral-900 prose-pre:border prose-pre:border-neutral-800">
          <h1>{lesson.title}</h1>
          <ReactMarkdown
            rehypePlugins={[
              rehypeSlug,
              [rehypeAutolinkHeadings, { behavior: "wrap" }],
            ]}
            components={{
              code(props) {
                const { children, className, ...rest } = props as any;
                const codeText = String(children).replace(/\n$/, "");
                const match = /language-(\w+)/.exec(className || "");
                if (match) {
                  try {
                    const lang = match[1];
                    const highlighted = hljs.highlight(codeText, {
                      language: lang,
                    }).value;
                    return (
                      <pre className="relative group">
                        <code
                          className={`hljs language-${lang} block overflow-auto rounded-lg bg-neutral-900/80 border border-neutral-800 p-4 text-[13px] leading-relaxed`}
                          dangerouslySetInnerHTML={{ __html: highlighted }}
                          {...rest}
                        />
                      </pre>
                    );
                  } catch {}
                }
                return (
                  <code
                    className={`rounded px-1.5 py-0.5 bg-neutral-900/80 border border-neutral-800 ${
                      className || ""
                    }`}
                    {...rest}
                  >
                    {codeText}
                  </code>
                );
              },
            }}
          >
            {lesson.content}
          </ReactMarkdown>
        </article>
        <nav className="flex justify-between items-center gap-4 pt-4 border-t border-neutral-800">
          {prev ? (
            <Link
              href={`/lesson/${prev.slug}`}
              className="group inline-flex flex-col text-left max-w-xs"
            >
              <span className="text-[11px] uppercase tracking-wide text-neutral-500 group-hover:text-neutral-300 transition">
                ← Anterior
              </span>
              <span className="text-sm text-brand group-hover:underline line-clamp-2">
                {prev.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/lesson/${next.slug}`}
              className="group inline-flex flex-col text-right max-w-xs"
            >
              <span className="text-[11px] uppercase tracking-wide text-neutral-500 group-hover:text-neutral-300 transition">
                Siguiente →
              </span>
              <span className="text-sm text-brand group-hover:underline line-clamp-2">
                {next.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </div>
      <MarkdownTOC />
    </div>
  );
}

function AccessNotice({
  type,
  title,
  description,
  icon = "info",
  backHref,
  backLabel = "Volver",
}: {
  type: "error" | "warn" | "info";
  title: string;
  description?: string;
  icon?: "lock" | "pause" | "hourglass" | "info";
  backHref?: string;
  backLabel?: string;
}) {
  const palettes: Record<
    string,
    { border: string; bg: string; text: string; icon: string }
  > = {
    error: {
      border: "border-red-700/50",
      bg: "bg-red-900/10",
      text: "text-red-300",
      icon: "text-red-400",
    },
    warn: {
      border: "border-amber-600/50",
      bg: "bg-amber-900/10",
      text: "text-amber-300",
      icon: "text-amber-400",
    },
    info: {
      border: "border-brand/40",
      bg: "bg-brand/10",
      text: "text-brand/90",
      icon: "text-brand",
    },
  };
  const p = palettes[type];
  const icons: Record<string, JSX.Element> = {
    lock: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 11V7a4 4 0 10-8 0v4m-2 0h12m-9 4h6"
        />
        <rect
          width="16"
          height="10"
          x="4"
          y="11"
          rx="2"
          ry="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    pause: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10 9v6m4-6v6M12 22a10 10 0 100-20 10 10 0 000 20z"
        />
      </svg>
    ),
    hourglass: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 4h12M6 20h12M6 4v4a5 5 0 002 4 5 5 0 01-2 4v4m12-16v4a5 5 0 01-2 4 5 5 0 002 4v4"
        />
      </svg>
    ),
    info: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8h.01M11 12h1v4h1m-1 5a9 9 0 100-18 9 9 0 000 18z"
        />
      </svg>
    ),
  };
  return (
    <div
      className={`max-w-lg mx-auto mt-16 border ${p.border} ${p.bg} rounded-xl p-5 flex gap-4 items-start backdrop-blur-sm`}
    >
      <div className={`shrink-0 ${p.icon}`}>{icons[icon]}</div>
      <div className="space-y-3">
        <h2 className={`text-sm font-semibold tracking-wide ${p.text}`}>
          {title}
        </h2>
        {description && (
          <p className="text-xs text-neutral-400 leading-relaxed">
            {description}
          </p>
        )}
        {backHref && (
          <div>
            <Link
              href={backHref}
              className="inline-flex items-center gap-1 text-[11px] font-medium text-brand hover:underline"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              {backLabel}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
