import Link from "next/link";
import { getCurrentUserServer } from "../lib/auth-session";
import { isProfessorEmail } from "../lib/firebase-admin";

export default async function AdminNavLink() {
  const user = await getCurrentUserServer();
  if (!user || !isProfessorEmail(user.email)) return null;
  return (
    <Link
      href="/dashboard"
      className="text-sm px-3 py-1 rounded bg-brand/10 border border-brand/40 text-brand hover:bg-brand/20 hover:border-brand transition"
    >
      Dashboard
    </Link>
  );
}
