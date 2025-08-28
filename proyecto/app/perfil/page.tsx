import { getCurrentUserServer } from "../../src/lib/auth-session";
import ProfileClient from "../../src/components/ProfileClient";
import { adminFirestore } from "../../src/lib/firebase-admin";
import { listCourses } from "../../src/lib/content-fs";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Perfil | plus58 Cursos",
};

export default async function PerfilPage() {
  const user = await getCurrentUserServer();
  if (!user) redirect("/login");
  // Leer perfil
  let profile: any = null;
  let courses: any[] = [];
  try {
    const db = adminFirestore();
    const snap = await db.collection("users").doc(user.uid).get();
    if (snap.exists) {
      const d: any = snap.data();
      profile = {
        fullName: d.profile?.fullName || "",
        birthDate: d.profile?.birthDate || "",
        idNumber: d.profile?.idNumber || "",
      };
      const courseConfigs = listCourses();
      courses = (d.courses || []).map((cid: string) => ({
        cid,
        state: d.courseAccess?.[cid]?.state || "",
        title: courseConfigs.find((c) => c.courseId === cid)?.title || cid,
      }));
    }
  } catch {}
  return (
    <ProfileClient
      initialProfile={profile}
      courses={courses}
      email={user.email || ""}
    />
  );
}
