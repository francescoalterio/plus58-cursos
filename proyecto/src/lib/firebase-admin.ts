import type { ServiceAccount } from "firebase-admin";
import { getApps, initializeApp, cert, App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

let adminApp: App | null = null;

export function getAdminApp() {
  if (!adminApp) {
    if (!getApps().length) {
      const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_JSON;
      if (!raw)
        throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY_JSON no definido");
      let json: ServiceAccount;
      try {
        json = JSON.parse(raw);
      } catch {
        throw new Error("Service account JSON inválido");
      }
      adminApp = initializeApp({ credential: cert(json) });
    } else {
      adminApp = getApps()[0];
    }
  }
  return adminApp!;
}

export async function verifyIdToken(idToken: string) {
  const app = getAdminApp();
  const auth = getAuth(app);
  return auth.verifyIdToken(idToken);
}

export function isProfessorEmail(email?: string | null) {
  if (!email) return false;
  const list = (process.env.PROFESSOR_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return list.includes(email.toLowerCase());
}

export function adminFirestore() {
  return getFirestore(getAdminApp());
}
