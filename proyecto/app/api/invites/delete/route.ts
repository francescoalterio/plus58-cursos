import { NextResponse } from "next/server";
import { getCurrentUserServer } from "../../../../src/lib/auth-session";
import { isProfessorEmail } from "../../../../src/lib/firebase-admin";
import { deleteInviteLink } from "../../../../src/lib/firestore-repos";

export async function DELETE(request: Request) {
  try {
    const user = await getCurrentUserServer();
    if (!user || !isProfessorEmail(user.email)) {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 });
    }
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (!id)
      return NextResponse.json({ error: "id requerido" }, { status: 400 });
    await deleteInviteLink(id);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
