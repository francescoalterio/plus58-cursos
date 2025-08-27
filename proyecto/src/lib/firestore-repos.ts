import { firestore } from "./firebase";
import { adminFirestore } from "./firebase-admin";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
  Timestamp,
  increment,
  runTransaction,
  arrayUnion,
  deleteDoc,
} from "firebase/firestore";
import { nanoid } from "nanoid";
import { InviteLink } from "./models";

const COL_INVITES = "inviteLinks";
const COL_LESSONS = "lessons"; // Legacy (pendiente de eliminar uso)
const COL_LESSON_CONTENT = "lessonContent"; // Legacy

export async function createInviteLink(courseId: string, maxUses?: number) {
  // Preferir Admin SDK (no aplica reglas) cuando existe service account
  try {
    const adb: any = adminFirestore();
    const id = nanoid(12);
    const ref = adb.collection(COL_INVITES).doc(id);
    const data: InviteLink = {
      id,
      courseId,
      active: true,
      maxUses,
      used: 0,
      createdAt: new Date(),
    };
    await ref.set({ ...data, createdAt: data.createdAt });
    return data;
  } catch {
    const db = firestore();
    const id = nanoid(12);
    const ref = doc(db, COL_INVITES, id);
    const data: InviteLink = {
      id,
      courseId,
      active: true,
      maxUses,
      used: 0,
      createdAt: new Date(),
    };
    await setDoc(ref, {
      ...data,
      createdAt: Timestamp.fromDate(data.createdAt),
    });
    return data;
  }
}

export async function deactivateInvite(id: string) {
  const db = firestore();
  const ref = doc(db, COL_INVITES, id);
  const snap = await getDoc(ref);
  if (!snap.exists()) throw new Error("Invite no existe");
  await updateDoc(ref, { active: false, deactivatedAt: Timestamp.now() });
}

export async function validateInvite(id: string) {
  try {
    const adb: any = adminFirestore();
    const ref = adb.collection(COL_INVITES).doc(id);
    const snap = await ref.get();
    if (!snap.exists) return null;
    const data = snap.data();
    if (!data) return null;
    if (!data.active) return null;
    if (data.maxUses && data.used >= data.maxUses) return null;
    return { id: snap.id, ...data } as InviteLink;
  } catch {
    const db = firestore();
    const ref = doc(db, COL_INVITES, id);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
    const data = snap.data();
    if (!data.active) return null;
    if (data.maxUses && data.used >= data.maxUses) return null;
    return { id: snap.id, ...data } as InviteLink;
  }
}

export async function consumeInvite(id: string) {
  // Usar admin si está disponible para evitar fallos de permisos desde rutas servidor
  try {
    const adb: any = adminFirestore();
    const ref = adb.collection(COL_INVITES).doc(id);
    return await adb.runTransaction(async (tx: any) => {
      const snap = await tx.get(ref);
      if (!snap.exists) throw new Error("Invite no existe");
      const data: any = snap.data();
      if (!data.active) throw new Error("Invite inactivo");
      if (data.maxUses && data.used >= data.maxUses)
        throw new Error("Invite agotado");
      const newUsed = (data.used || 0) + 1;
      if (data.maxUses && newUsed >= data.maxUses) {
        // Último uso: eliminar documento para que el endpoint "desaparezca"
        tx.delete(ref);
        return { id: snap.id, ...data, used: newUsed, deleted: true } as any;
      }
      tx.update(ref, { used: newUsed });
      return { id: snap.id, ...data, used: newUsed } as InviteLink;
    });
  } catch {
    const db = firestore();
    const ref = doc(db, COL_INVITES, id);
    return runTransaction(db, async (tx) => {
      const snap = await tx.get(ref);
      if (!snap.exists()) throw new Error("Invite no existe");
      const data: any = snap.data();
      if (!data.active) throw new Error("Invite inactivo");
      if (data.maxUses && data.used >= data.maxUses)
        throw new Error("Invite agotado");
      const newUsed = (data.used || 0) + 1;
      if (data.maxUses && newUsed >= data.maxUses) {
        tx.delete(ref);
        return { id: snap.id, ...data, used: newUsed, deleted: true } as any;
      }
      tx.update(ref, { used: newUsed });
      return { id: snap.id, ...data, used: newUsed } as InviteLink;
    });
  }
}

export async function listActiveInvites(courseId?: string) {
  // Devuelve invitaciones activas (si no tienen maxUses o used < maxUses)
  try {
    const adb: any = adminFirestore();
    let ref = adb.collection(COL_INVITES).where("active", "==", true);
    if (courseId) ref = ref.where("courseId", "==", courseId);
    const snap = await ref.get();
    return snap.docs
      .map((d: any) => ({ id: d.id, ...d.data() }))
      .filter((d: any) => !d.maxUses || d.used < d.maxUses)
      .sort((a: any, b: any) => b.createdAt - a.createdAt);
  } catch {
    const db = firestore();
    // Con el SDK cliente no podemos hacer múltiples where condicional, haríamos un query básico a active=true.
    const qRef = courseId
      ? query(
          collection(db, COL_INVITES),
          where("active", "==", true),
          where("courseId", "==", courseId)
        )
      : query(collection(db, COL_INVITES), where("active", "==", true));
    const snap = await getDocs(qRef);
    return snap.docs
      .map((d) => ({ id: d.id, ...d.data() }))
      .filter((d: any) => !d.maxUses || d.used < d.maxUses)
      .sort(
        (a: any, b: any) =>
          (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0)
      );
  }
}

export async function deleteInviteLink(id: string) {
  try {
    const adb: any = adminFirestore();
    await adb.collection(COL_INVITES).doc(id).delete();
  } catch {
    const db = firestore();
    await deleteDoc(doc(db, COL_INVITES, id));
  }
}

export async function listLessonsMeta(courseId?: string) {
  // Intentar admin (SSR) y fallback a cliente
  let db: any;
  try {
    db = adminFirestore();
  } catch {
    db = firestore();
  }
  let snaps;
  if (db.getAll) {
    // Admin SDK
    let ref = db.collection(COL_LESSONS);
    let queryRef = courseId ? ref.where("courseId", "==", courseId) : ref;
    const snap = await queryRef.get();
    return snap.docs
      .map((d: any) => d.data())
      .sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
  } else {
    // Client SDK
    let snaps;
    if (courseId) {
      const qRef = query(
        collection(db, COL_LESSONS),
        where("courseId", "==", courseId)
      );
      snaps = await getDocs(qRef);
    } else {
      snaps = await getDocs(collection(db, COL_LESSONS));
    }
    return snaps.docs
      .map((d: any) => d.data())
      .sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
  }
}

export async function getLessonContent(slug: string) {
  const db = firestore();
  const metaRef = doc(db, COL_LESSONS, slug);
  const metaSnap = await getDoc(metaRef);
  if (!metaSnap.exists()) return null;
  const contentRef = doc(db, COL_LESSON_CONTENT, slug);
  const contentSnap = await getDoc(contentRef);
  if (!contentSnap.exists()) return { ...metaSnap.data(), content: "" };
  return { ...metaSnap.data(), ...contentSnap.data() };
}
