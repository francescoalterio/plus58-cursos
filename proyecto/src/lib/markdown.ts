import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const contentRoot = path.join(process.cwd(), 'src', 'content');

export interface MarkdownMeta {
  title: string;
  order?: number;
  summary?: string;
  state?: 'public' | 'private';
}

export interface LessonMarkdown {
  meta: MarkdownMeta;
  content: string;
  slug: string;
}

export function listLessonFiles(): string[] {
  if (!fs.existsSync(contentRoot)) return [];
  return fs.readdirSync(contentRoot).filter(f => f.endsWith('.md'));
}

export function readLesson(slug: string): LessonMarkdown | null {
  const file = path.join(contentRoot, slug + '.md');
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, 'utf8');
  const { data, content } = matter(raw);
  return { meta: data as MarkdownMeta, content, slug };
}

export function listPublicSummary() {
  return listLessonFiles().map(f => {
    const slug = f.replace(/\.md$/, '');
    const l = readLesson(slug);
    return l ? { slug, title: l.meta.title, order: l.meta.order, summary: l.meta.summary } : null;
  }).filter(Boolean).sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0));
}
