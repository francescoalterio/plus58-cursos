#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
// Cargar variables de entorno desde .env.local si existe (ejecutando fuera de Next.js)
try {
  const dotenvPath = path.join(process.cwd(), ".env.local");
  if (fs.existsSync(dotenvPath)) {
    const dotenv = await import("dotenv");
    dotenv.config({ path: dotenvPath });
  }
} catch (e) {
  console.warn("No se pudo cargar .env.local:", e?.message || e);
}

function initAdmin() {
  if (!getApps().length) {
    const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_JSON;
    if (!raw) throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY_JSON no definido");
    const json = JSON.parse(raw);
    initializeApp({ credential: cert(json) });
  }
}

async function main() {
  initAdmin();
  const db = getFirestore();
  const contentRoot = path.join(process.cwd(), "src", "content");
  if (!fs.existsSync(contentRoot)) return console.log("Sin carpeta content");

  const files = fs.readdirSync(contentRoot).filter((f) => f.endsWith(".md"));
  const batch = db.batch();
  for (const file of files) {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(contentRoot, file), "utf8");
    const { data, content } = matter(raw);
    const hash = await import("node:crypto").then((c) =>
      c.createHash("sha1").update(raw).digest("hex")
    );
    const metaRef = db.collection("lessons").doc(slug);
    // Guardar sólo metadatos públicos
    batch.set(
      metaRef,
      {
        slug,
        title: data.title || slug,
        order: data.order || 0,
        summary: data.summary || "",
        state: data.state || "private",
        courseId: data.courseId || "default",
        updatedAt: new Date(),
        contentHash: hash,
        // Eliminar campo content previo si existía
        content: FieldValue.delete(),
      },
      { merge: true }
    );

    const contentRef = db.collection("lessonContent").doc(slug);
    batch.set(contentRef, {
      slug,
      title: data.title || slug,
      courseId: data.courseId || "default",
      content,
      updatedAt: new Date(),
      contentHash: hash,
    });
  }
  await batch.commit();
  console.log("Sincronización completada:", files.length, "lecciones");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
