import { NextResponse } from "next/server";
import { getCurrentUserServer } from "../../../../../src/lib/auth-session";
import { isProfessorEmail } from "../../../../../src/lib/firebase-admin";
import { unlockUserLessons } from "../../../../../src/lib/user-repos";

export async function PATCH(req: Request) {
  const user = await getCurrentUserServer();
  if (!user || !isProfessorEmail(user.email))
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  const { userId, courseId, lessonIds } = await req.json();
  if (!userId || !courseId || !Array.isArray(lessonIds) || !lessonIds.length)
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  await unlockUserLessons(userId, courseId, lessonIds);
  return NextResponse.json({ ok: true });
}
