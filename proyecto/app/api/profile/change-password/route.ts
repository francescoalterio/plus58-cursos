import { NextResponse } from "next/server";
import { getCurrentUserServer } from "../../../../src/lib/auth-session";
import { getAdminApp } from "../../../../src/lib/firebase-admin";
import { getAuth as getAdminAuth } from "firebase-admin/auth";

export async function POST(request: Request) {
  const userSession = await getCurrentUserServer();
  if (!userSession)
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  try {
    const body = await request.json();
    const { password } = body;
    if (!password || password.length < 6)
      return NextResponse.json(
        { error: "Contraseña inválida" },
        { status: 400 }
      );
    try {
      const adminAuth = getAdminAuth(getAdminApp());
      await adminAuth.updateUser(userSession.uid, { password });
    } catch (e) {
      return NextResponse.json(
        { error: "Fallo actualizando contraseña" },
        { status: 500 }
      );
    }
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
