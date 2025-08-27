import { NextResponse } from "next/server";
import { getCurrentUserServer } from "../../../../../src/lib/auth-session";
import {
  isProfessorEmail,
  adminFirestore,
  getAdminApp,
} from "../../../../../src/lib/firebase-admin";
import { getAuth } from "firebase-admin/auth";

export async function DELETE(req: Request) {
  try {
    const user = await getCurrentUserServer();
    if (!user || !isProfessorEmail(user.email)) {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 });
    }
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId)
      return NextResponse.json({ error: "userId requerido" }, { status: 400 });
    const db = adminFirestore();
    await db.collection("users").doc(userId).delete();
    // Eliminar también en Auth si existe
    try {
      const auth = getAuth(getAdminApp());
      await auth.deleteUser(userId);
    } catch (e) {
      // Ignorar si no existe o no hay permisos
      console.warn("No se pudo eliminar usuario en Auth", e);
    }
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
