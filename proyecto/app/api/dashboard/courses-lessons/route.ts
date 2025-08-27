import { NextResponse } from "next/server";
import { getCurrentUserServer } from "../../../../src/lib/auth-session";
import { isProfessorEmail } from "../../../../src/lib/firebase-admin";
import { listCourses, listLessonsMeta } from "../../../../src/lib/content-fs";

export async function GET() {
  try {
    const user = await getCurrentUserServer();
    if (!user || !isProfessorEmail(user.email)) {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 });
    }
    const courses = listCourses().map((c) => ({
      courseId: c.courseId,
      title: c.title,
      lessons: listLessonsMeta(c.courseId).map((l) => ({
        slug: l.slug,
        title: l.title,
      })),
    }));
    return NextResponse.json({ courses });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
