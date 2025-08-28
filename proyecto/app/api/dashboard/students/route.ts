import { NextResponse } from "next/server";
import { getCurrentUserServer } from "../../../../src/lib/auth-session";
import { isProfessorEmail } from "../../../../src/lib/firebase-admin";
import { adminFirestore } from "../../../../src/lib/firebase-admin";

export async function GET(request: Request) {
  const user = await getCurrentUserServer();
  if (!user || !isProfessorEmail(user.email))
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  const url = new URL(request.url);
  const courseId = url.searchParams.get("courseId");
  const db = adminFirestore();
  const snap = await db.collection("users").get();
  const students: any[] = [];
  snap.forEach((doc) => {
    const d = doc.data();
    if (!d.courseAccess) return;
    if (courseId && !d.courseAccess[courseId]) return;
    const createdAtRaw: any = d.createdAt;
    let createdAt: number | undefined = undefined;
    if (createdAtRaw) {
      // Firestore Timestamp => has toMillis
      if (typeof createdAtRaw.toMillis === "function") {
        try {
          createdAt = createdAtRaw.toMillis();
        } catch {}
      } else if (typeof createdAtRaw === "number") {
        createdAt = createdAtRaw;
      } else if (createdAtRaw._seconds) {
        createdAt = createdAtRaw._seconds * 1000;
      }
    }
    // Expandir cada cursoAccess en entradas separadas
    Object.entries(d.courseAccess).forEach(([cid, ca]: any) => {
      if (courseId && cid !== courseId) return;
      students.push({
        id: `${doc.id}_${cid}`,
        userId: doc.id,
        email: d.email,
        fullName: d.profile?.fullName || null,
        birthDate: d.profile?.birthDate || null,
        idNumber: d.profile?.idNumber || null,
        courseId: cid,
        state: ca.state,
        unlockedLessonIds: ca.unlockedLessons || [],
        createdAt,
      });
    });
  });
  return NextResponse.json({ students });
}
