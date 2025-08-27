import { NextResponse } from "next/server";
import { getCurrentUserServer } from "../../../../src/lib/auth-session";
import { isProfessorEmail } from "../../../../src/lib/firebase-admin";
import { listActiveInvites } from "../../../../src/lib/firestore-repos";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const courseId = url.searchParams.get("courseId") || undefined;
    const user = await getCurrentUserServer();
    if (!user || !isProfessorEmail(user.email)) {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 });
    }
    const invites = await listActiveInvites(courseId);
    return NextResponse.json({ invites });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
