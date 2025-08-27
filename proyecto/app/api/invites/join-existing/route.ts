import { NextResponse } from "next/server";
import { getCurrentUserServer } from "../../../../src/lib/auth-session";
import { consumeInvite } from "../../../../src/lib/firestore-repos";
import { ensureUserCourse } from "../../../../src/lib/user-repos";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUserServer();
    if (!user)
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    const { inviteId } = await req.json();
    if (!inviteId)
      return NextResponse.json(
        { error: "inviteId requerido" },
        { status: 400 }
      );
    const invite = await consumeInvite(inviteId).catch((e) => ({
      error: e.message,
    }));
    if ((invite as any).error)
      return NextResponse.json(invite, { status: 400 });
    await ensureUserCourse(user.uid, user.email!, (invite as any).courseId);
    return NextResponse.json({ ok: true, courseId: (invite as any).courseId });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
