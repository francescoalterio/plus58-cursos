import { firestore } from "./firebase";
import { adminFirestore } from "./firebase-admin";
import { listLessonsMeta } from "./content-fs";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";

export interface UserDocCourseAccess {
  state: "activo" | "inactivo" | "graduado";
  unlockedLessons: string[];
}

export interface UserDoc {
  email: string;
  courses: string[];
  courseAccess: Record<string, UserDocCourseAccess>;
  createdAt: any;
}

export async function ensureUserCourse(
  userId: string,
  email: string,
  courseId: string,
  extra?: { fullName?: string; birthDate?: string; idNumber?: string }
) {
  // Intentar Admin SDK primero (ignora reglas). Si falla (no service account), fallback a cliente.
  try {
    const adb: any = adminFirestore();
    const ref = adb.collection("users").doc(userId);
    const snap = await ref.get();
    if (!snap.exists) {
      await ref.set({
        email,
        courses: [courseId],
        courseAccess: {
          [courseId]: { state: "activo", unlockedLessons: [] },
        },
        createdAt: new Date(),
        ...((extra && {
          profile: {
            fullName: extra.fullName || null,
            birthDate: extra.birthDate || null,
            idNumber: extra.idNumber || null,
          },
        }) ||
          {}),
      });
      return;
    }
    const data = snap.data() || {};
    const update: any = {};
    if (!Array.isArray(data.courses) || !data.courses.includes(courseId)) {
      update.courses = (data.courses || [])
        .concat(courseId)
        .filter((v: any, i: number, a: any[]) => a.indexOf(v) === i);
    }
    if (!data.courseAccess || !data.courseAccess[courseId]) {
      update[`courseAccess.${courseId}`] = {
        state: "activo",
        unlockedLessons: [],
      };
    }
    if (Object.keys(update).length) await ref.update(update);
    return;
  } catch {
    const db = firestore();
    const ref = doc(db, "users", userId);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      await setDoc(ref, {
        email,
        courses: [courseId],
        courseAccess: {
          [courseId]: { state: "activo", unlockedLessons: [] },
        },
        createdAt: new Date(),
        ...((extra && {
          profile: {
            fullName: extra.fullName || null,
            birthDate: extra.birthDate || null,
            idNumber: extra.idNumber || null,
          },
        }) ||
          {}),
      });
      return;
    }
    const data = snap.data() as any;
    const updates: any = {};
    if (!data.courses?.includes(courseId)) {
      updates.courses = arrayUnion(courseId);
    }
    if (!data.courseAccess || !data.courseAccess[courseId]) {
      updates[`courseAccess.${courseId}`] = {
        state: "activo",
        unlockedLessons: [],
      };
    }
    if (Object.keys(updates).length) await updateDoc(ref, updates);
  }
}

export async function listStudentsForCourse(courseId: string) {
  // Nota: Firestore no soporta filtrar keys anidadas dinámicamente; se puede guardar un array courses.
  // Aquí se hace un fetch client-side de todos los usuarios (para MVP, optimizar con index/colección auxiliar si crece).
  // Como estamos en server, usaremos admin si está disponible.
  return []; // Implementación real más adelante con Admin SDK si se necesita.
}

export async function updateUserCourseState(
  userId: string,
  courseId: string,
  state: "activo" | "inactivo" | "graduado"
) {
  try {
    const adb: any = adminFirestore();
    const ref = adb.collection("users").doc(userId);
    await ref.update({ [`courseAccess.${courseId}.state`]: state });
  } catch {
    const db = firestore();
    const ref = doc(db, "users", userId);
    await updateDoc(ref, { [`courseAccess.${courseId}.state`]: state });
  }
}

export async function unlockUserLessons(
  userId: string,
  courseId: string,
  lessonSlugs: string[]
) {
  try {
    const adb: any = adminFirestore();
    const ref = adb.collection("users").doc(userId);
    await adb.runTransaction(async (tx: any) => {
      const snap = await tx.get(ref);
      const data = snap.exists ? snap.data() : {};
      const current = data?.courseAccess?.[courseId]?.unlockedLessons || [];
      const merged = Array.from(new Set([...current, ...lessonSlugs]));
      tx.set(
        ref,
        {
          ...(data || {}),
          courseAccess: {
            ...(data?.courseAccess || {}),
            [courseId]: {
              state: data?.courseAccess?.[courseId]?.state || "activo",
              unlockedLessons: merged,
            },
          },
        },
        { merge: true }
      );
    });
  } catch {
    const db = firestore();
    const ref = doc(db, "users", userId);
    await updateDoc(ref, {
      [`courseAccess.${courseId}.unlockedLessons`]: arrayUnion(...lessonSlugs),
    });
  }
}

export async function addCourseToUser(userId: string, courseId: string) {
  try {
    const adb: any = adminFirestore();
    const ref = adb.collection("users").doc(userId);
    await adb.runTransaction(async (tx: any) => {
      const snap = await tx.get(ref);
      if (!snap.exists) throw new Error("Usuario no existe");
      const data = snap.data() || {};
      const courses: string[] = Array.from(
        new Set([...(data.courses || []), courseId])
      );
      const courseAccess = {
        ...(data.courseAccess || {}),
        [courseId]: data?.courseAccess?.[courseId] || {
          state: "activo",
          unlockedLessons: [],
        },
      };
      tx.update(ref, { courses, courseAccess });
    });
  } catch {
    const db = firestore();
    const ref = doc(db, "users", userId);
    const snap = await getDoc(ref);
    if (!snap.exists()) throw new Error("Usuario no existe");
    const data: any = snap.data();
    const courses: string[] = Array.from(
      new Set([...(data.courses || []), courseId])
    );
    const updates: any = { courses };
    if (!data.courseAccess || !data.courseAccess[courseId]) {
      updates[`courseAccess.${courseId}`] = {
        state: "activo",
        unlockedLessons: [],
      };
    }
    await updateDoc(ref, updates);
  }
}
