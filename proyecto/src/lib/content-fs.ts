import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export interface CourseConfigLessonMeta {
  slug: string; // slug global: courseId--lessonSlugBase
  file: string; // nombre archivo md
  title: string;
  order?: number;
  summary?: string;
  tags?: string[];
}
export interface CourseConfig {
  courseId: string;
  title: string;
  summary?: string;
  order?: number;
  lessons: CourseConfigLessonMeta[];
}

interface LessonFull {
  meta: CourseConfigLessonMeta & { courseId: string };
  content: string;
  course: { courseId: string; title: string };
}

let courseCache: Record<string, CourseConfig> | null = null;
let mtimeSignature = "";

function contentRoot() {
  return path.join(process.cwd(), "src", "content");
}

function computeSignature(): string {
  const root = contentRoot();
  if (!fs.existsSync(root)) return "";
  const entries = fs.readdirSync(root);
  const sigParts: string[] = [];
  for (const e of entries) {
    const dirPath = path.join(root, e);
    try {
      const st = fs.statSync(dirPath);
      if (!st.isDirectory()) continue;
      sigParts.push(st.mtimeMs + ":dir:" + e);
      const cfg = path.join(dirPath, "config.json");
      if (fs.existsSync(cfg)) {
        const cst = fs.statSync(cfg);
        sigParts.push(cst.mtimeMs + ":cfg:" + e);
      }
    } catch {}
  }
  // En desarrollo forzamos también refresco cada carga para evitar quedarse con cache obsoleto
  if (process.env.NODE_ENV !== "production") {
    sigParts.push(Date.now().toString().slice(0, -3)); // segundos aproximados
  }
  return sigParts.sort().join("|");
}

function loadAllCourses(force = false) {
  const sig = computeSignature();
  if (!force && courseCache && sig === mtimeSignature) return;
  courseCache = {};
  const root = contentRoot();
  if (!fs.existsSync(root)) return;
  const dirs = fs
    .readdirSync(root)
    .filter((d) => fs.statSync(path.join(root, d)).isDirectory());
  for (const dir of dirs) {
    const cfgPath = path.join(root, dir, "config.json");
    if (!fs.existsSync(cfgPath)) continue;
    try {
      const raw = fs.readFileSync(cfgPath, "utf8");
      const json: CourseConfig = JSON.parse(raw);
      // Normalizar slugs: asegurar que empiezan por courseId--
      json.lessons = json.lessons.map((l) => ({
        ...l,
        slug: l.slug.startsWith(json.courseId + "--")
          ? l.slug
          : `${json.courseId}--${l.slug}`,
      }));
      courseCache![json.courseId] = json;
    } catch (e) {
      console.warn("Error cargando config curso", dir, e);
    }
  }
  mtimeSignature = sig;
}

export function listCourses(): CourseConfig[] {
  loadAllCourses();
  return Object.values(courseCache || {}).sort(
    (a, b) => (a.order || 0) - (b.order || 0)
  );
}

export function getCourse(courseId: string): CourseConfig | null {
  loadAllCourses();
  return courseCache?.[courseId] || null;
}

export function listLessonsMeta(courseId: string): CourseConfigLessonMeta[] {
  const c = getCourse(courseId);
  return c
    ? [...c.lessons].sort((a, b) => (a.order || 0) - (b.order || 0))
    : [];
}

export function findLessonByGlobalSlug(
  globalSlug: string
): { course: CourseConfig; lesson: CourseConfigLessonMeta } | null {
  loadAllCourses();
  if (!courseCache) return null;
  for (const c of Object.values(courseCache)) {
    const lesson = c.lessons.find((l) => l.slug === globalSlug);
    if (lesson) return { course: c, lesson };
  }
  return null;
}

export function getLesson(globalSlug: string): LessonFull | null {
  const found = findLessonByGlobalSlug(globalSlug);
  if (!found) return null;
  const { course, lesson } = found;
  const filePath = path.join(contentRoot(), course.courseId, lesson.file);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const fm = matter(raw);
  // frontmatter opcional (override de titulo/resumen/order si existe)
  const meta: any = { ...lesson };
  if (fm.data.title) meta.title = fm.data.title;
  if (fm.data.summary) meta.summary = fm.data.summary;
  if (typeof fm.data.order === "number") meta.order = fm.data.order;
  return {
    meta: { ...meta, courseId: course.courseId },
    content: fm.content,
    course: { courseId: course.courseId, title: course.title },
  };
}
