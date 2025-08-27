#!/usr/bin/env node
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import path from "node:path";
import fs from "node:fs";

function initAdmin() {
  if (!getApps().length) {
    const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_JSON;
    if (!raw) throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY_JSON no definido");
    const json = JSON.parse(raw);
    initializeApp({ credential: cert(json) });
  }
}

async function run() {
  initAdmin();
  const db = getFirestore();
  const snaps = await db.collection("userCourseAccess").get();
  console.log("Docs legacy:", snaps.size);
  for (const docSnap of snaps.docs) {
    const d = docSnap.data();
    const { userId, courseId, state, unlockedLessonIds = [] } = d;
    if (!userId || !courseId) continue;
    const userRef = db.collection("users").doc(userId);
    const userSnap = await userRef.get();
    if (!userSnap.exists) {
      await userRef.set({
        email: d.email || "",
        courses: [courseId],
        courseAccess: {
          [courseId]: {
            state: state || "activo",
            unlockedLessons: unlockedLessonIds,
          },
        },
        createdAt: new Date(),
      });
      console.log("Creado user", userId);
    } else {
      const data = userSnap.data();
      const updates = {};
      if (!data.courses?.includes(courseId)) {
        updates.courses = [...new Set([...(data.courses || []), courseId])];
      }
      const ca = data.courseAccess || {};
      if (!ca[courseId]) {
        ca[courseId] = {
          state: state || "activo",
          unlockedLessons: unlockedLessonIds,
        };
      } else {
        // Merge unlocked
        const merged = new Set([
          ...(ca[courseId].unlockedLessons || []),
          ...unlockedLessonIds,
        ]);
        ca[courseId] = {
          state: state || ca[courseId].state || "activo",
          unlockedLessons: [...merged],
        };
      }
      updates.courseAccess = ca;
      await userRef.update(updates);
      console.log("Actualizado user", userId);
    }
  }
  console.log("Migración completa.");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
