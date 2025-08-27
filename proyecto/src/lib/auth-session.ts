import { cookies } from "next/headers";
import { firebaseAuth } from "./firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { verifyIdToken } from "./firebase-admin";

// Nota: En un entorno SSR puro se recomienda usar Firebase Admin para verificar tokens.
// Aquí simplificamos: guardamos el idToken en cookie httpOnly vía una llamada desde route handler.

const COOKIE_NAME = "fb_id_token";

export async function createSession(email: string, password: string) {
  const auth = firebaseAuth();
  const cred = await signInWithEmailAndPassword(auth, email, password);
  const idToken = await cred.user.getIdToken();
  cookies().set(COOKIE_NAME, idToken, {
    httpOnly: true,
    secure: true,
    path: "/",
    // 1 semana (en segundos). Nota: el ID token de Firebase expira ~1h; para sesiones reales >1h
    // habría que refrescarlo y actualizar esta cookie periódicamente.
    maxAge: 60 * 60 * 24 * 7,
  });
  return { uid: cred.user.uid, email: cred.user.email };
}

export async function destroySession() {
  const auth = firebaseAuth();
  try {
    await signOut(auth);
  } catch {}
  cookies().delete(COOKIE_NAME);
}

export function getSessionToken() {
  return cookies().get(COOKIE_NAME)?.value || null;
}

export async function getCurrentUserServer() {
  const token = getSessionToken();
  if (!token) return null;
  try {
    const decoded = await verifyIdToken(token);
    return { uid: decoded.uid, email: decoded.email };
  } catch {
    return null;
  }
}
