import { NextResponse } from "next/server";
import { getCurrentUserServer } from "../../../src/lib/auth-session";
import { adminFirestore } from "../../../src/lib/firebase-admin";

export async function GET() {
  const user = await getCurrentUserServer();
  if (!user)
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  try {
    const db = adminFirestore();
    const snap = await db.collection("users").doc(user.uid).get();
    if (!snap.exists) return NextResponse.json({ profile: null, courses: [] });
    const d: any = snap.data();
    const profile = {
      fullName: d.profile?.fullName || "",
      birthDate: d.profile?.birthDate || "",
      idNumber: d.profile?.idNumber || "",
    };
    const courses = (d.courses || []).map((cid: string) => ({
      cid,
      state: d.courseAccess?.[cid]?.state || "",
    }));
    return NextResponse.json({ profile, courses, email: d.email || "" });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const user = await getCurrentUserServer();
  if (!user)
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  try {
    const body = await request.json();
    const { fullName, birthDate, idNumber } = body;
    if (!fullName || !birthDate || !idNumber)
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
    const db = adminFirestore();
    await db.collection("users").doc(user.uid).set(
      {
        profile: { fullName, birthDate, idNumber },
      },
      { merge: true }
    );
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
