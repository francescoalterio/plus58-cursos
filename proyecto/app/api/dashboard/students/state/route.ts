import { NextResponse } from "next/server";
import { getCurrentUserServer } from "../../../../../src/lib/auth-session";
import { isProfessorEmail } from "../../../../../src/lib/firebase-admin";
import { updateUserCourseState } from "../../../../../src/lib/user-repos";

export async function PATCH(req: Request) {
  const user = await getCurrentUserServer();
  if (!user || !isProfessorEmail(user.email))
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  const { userId, courseId, state } = await req.json();
  if (
    !userId ||
    !courseId ||
    !["activo", "inactivo", "graduado"].includes(state)
  )
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  await updateUserCourseState(userId, courseId, state);
  return NextResponse.json({ ok: true });
}
