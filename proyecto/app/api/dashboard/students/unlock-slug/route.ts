import { NextResponse } from "next/server";
import { getCurrentUserServer } from "../../../../../src/lib/auth-session";
import { isProfessorEmail } from "../../../../../src/lib/firebase-admin";
import {
  addCourseToUser,
  unlockUserLessons,
} from "../../../../../src/lib/user-repos";
import { adminFirestore } from "../../../../../src/lib/firebase-admin";

export async function PATCH(req: Request) {
  const user = await getCurrentUserServer();
  if (!user || !isProfessorEmail(user.email)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }
  const { userId, slug } = await req.json();
  if (!userId || !slug || typeof slug !== "string" || !slug.includes("--")) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }
  const courseId = slug.split("--")[0];
  try {
    // Asegurar que el usuario tiene el curso; si no, lo añadimos.
    await addCourseToUser(userId, courseId);
    await unlockUserLessons(userId, courseId, [slug]);
    return NextResponse.json({ ok: true, courseId, slug });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
