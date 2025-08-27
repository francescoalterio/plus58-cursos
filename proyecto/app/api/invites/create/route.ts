import { NextResponse } from "next/server";
import { createInviteLink } from "../../../../src/lib/firestore-repos";
import { getCurrentUserServer } from "../../../../src/lib/auth-session";
import { isProfessorEmail } from "../../../../src/lib/firebase-admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { courseId, maxUses } = body;
    if (!courseId)
      return NextResponse.json(
        { error: "courseId requerido" },
        { status: 400 }
      );
    const user = await getCurrentUserServer();
    if (!user || !isProfessorEmail(user.email)) {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 });
    }
    const invite = await createInviteLink(courseId, maxUses);
    return NextResponse.json({ invite });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
