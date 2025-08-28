import { NextResponse } from "next/server";
import {
  getCurrentUserServer,
  getSessionToken,
} from "../../../../src/lib/auth-session";
import { adminFirestore } from "../../../../src/lib/firebase-admin";
import { firebaseAuth } from "../../../../src/lib/firebase";
import { updateEmail } from "firebase/auth";

export async function POST(request: Request) {
  const userSession = await getCurrentUserServer();
  if (!userSession)
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  try {
    const body = await request.json();
    const { email } = body;
    if (!email)
      return NextResponse.json({ error: "Email requerido" }, { status: 400 });

    // Actualizar en Auth cliente (requiere usuario logueado en cliente normalmente; aquí MVP asumimos no)
    // Para un flujo correcto habría que refrescar el token en cliente.
    try {
      const auth = firebaseAuth();
      if (auth.currentUser) {
        await updateEmail(auth.currentUser, email);
      }
    } catch {}

    const db = adminFirestore();
    await db
      .collection("users")
      .doc(userSession.uid)
      .set({ email }, { merge: true });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
