import { NextResponse } from "next/server";
import { getCurrentUserServer } from "../../../../../src/lib/auth-session";
import { isProfessorEmail } from "../../../../../src/lib/firebase-admin";
import { addCourseToUser } from "../../../../../src/lib/user-repos";

export async function PATCH(req: Request) {
  const user = await getCurrentUserServer();
  if (!user || !isProfessorEmail(user.email))
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  const { userId, courseId } = await req.json();
  if (!userId || !courseId)
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  try {
    await addCourseToUser(userId, courseId);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
