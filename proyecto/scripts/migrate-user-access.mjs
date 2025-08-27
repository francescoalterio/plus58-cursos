#!/usr/bin/env node
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

function init() {
  if (!getApps().length) {
    const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_JSON;
    if (!raw) throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY_JSON no definido");
    initializeApp({ credential: cert(JSON.parse(raw)) });
  }
}

async function run() {
  init();
  const db = getFirestore();
  const snaps = await db.collection("userCourseAccess").get();
  let migrated = 0;
  for (const doc of snaps.docs) {
    const data = doc.data();
    const targetId = `${data.userId}_${data.courseId}`;
    if (doc.id === targetId) continue;
    const targetRef = db.collection("userCourseAccess").doc(targetId);
    const targetSnap = await targetRef.get();
    if (!targetSnap.exists) {
      await targetRef.set({ ...data });
      migrated++;
    }
  }
  console.log("Migración completada. Documentos migrados:", migrated);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
