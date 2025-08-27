import { NextResponse } from "next/server";
import { createSession } from "../../../../src/lib/auth-session";

function mapAuthError(code?: string, raw?: string) {
  switch (code) {
    case "auth/invalid-email":
      return "Email inválido";
    case "auth/user-disabled":
      return "Usuario deshabilitado";
    case "auth/user-not-found":
      return "Usuario no encontrado";
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Credenciales incorrectas";
    case "auth/too-many-requests":
      return "Demasiados intentos. Intenta más tarde";
    default:
      return raw || "Error de autenticación";
  }
}

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password)
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
    const user = await createSession(email, password);
    return NextResponse.json({ user });
  } catch (e: any) {
    const msg: string = e?.message || "Error";
    const code: string | undefined =
      e?.code || msg.match(/\((auth\/[a-z0-9\-]+)\)/i)?.[1];
    return NextResponse.json(
      { error: mapAuthError(code, msg) },
      { status: 401 }
    );
  }
}
