import { NextResponse } from "next/server";
import { getSessionToken } from "../../../../src/lib/auth-session";
import { jwtDecode } from "jwt-decode";

export async function GET() {
  const token = getSessionToken();
  if (!token) return NextResponse.json({ authenticated: false });
  try {
    const decoded: any = jwtDecode(token);
    return NextResponse.json({
      authenticated: true,
      uid: decoded.user_id,
      email: decoded.email,
    });
  } catch {
    return NextResponse.json({ authenticated: false });
  }
}
