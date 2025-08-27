import { NextResponse } from "next/server";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../../../src/lib/firebase";
import { consumeInvite } from "../../../src/lib/firestore-repos";
import { ensureUserCourse } from "../../../src/lib/user-repos";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { inviteId, email, password } = body;
    if (!inviteId || !email || !password)
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
    // Validar y consumir invitación
    const invite = await consumeInvite(inviteId).catch((e) => ({
      error: e.message,
    }));
    if ((invite as any).error)
      return NextResponse.json(invite, { status: 400 });

    const auth = firebaseAuth();
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    // Crear/asegurar acceso de curso en doc users/{uid}
    await ensureUserCourse(cred.user.uid, email, (invite as any).courseId);

    return NextResponse.json({ userId: cred.user.uid });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
