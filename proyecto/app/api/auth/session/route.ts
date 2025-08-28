import { NextResponse } from "next/server";
import { getSessionToken } from "../../../../src/lib/auth-session";
import { jwtDecode } from "jwt-decode";
import { isProfessorEmail } from "../../../../src/lib/firebase-admin";

export async function GET() {
  const token = getSessionToken();
  if (!token) return NextResponse.json({ authenticated: false });
  try {
    const decoded: any = jwtDecode(token);
    const email = decoded.email as string | undefined;
    return NextResponse.json({
      authenticated: true,
      uid: decoded.user_id,
      email,
      isProfessor: email ? isProfessorEmail(email) : false,
    });
  } catch {
    return NextResponse.json({ authenticated: false });
  }
}
