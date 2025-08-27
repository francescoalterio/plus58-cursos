import "../src/styles/globals.css";
import type { ReactNode } from "react";
import SessionActions from "../src/components/SessionActions";
import AdminNavLink from "../src/components/AdminNavLink";
import Link from "next/link";

export const metadata = {
  title: "plus58 Cursos",
  description: "Materiales de cursos de programación plus58",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className="dark">
      <body>
        <div className="min-h-screen flex flex-col">
          <header className="border-b border-neutral-800 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <h1 className="text-lg font-semibold text-brand">
                plus58 Cursos
              </h1>
              <nav className="flex items-center gap-4">
                <Link
                  href="/"
                  className="text-sm px-3 py-1 rounded bg-neutral-900 border border-neutral-700 hover:border-brand hover:text-brand transition"
                >
                  Ver cursos
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              {/* Botón visible solo para admin */}
              <AdminNavLink />
              <SessionActions />
            </div>
          </header>
          <main className="flex-1 container mx-auto p-6 max-w-5xl">
            {children}
          </main>
          <footer className="text-xs text-neutral-500 px-6 py-4 border-t border-neutral-800">
            &copy; {new Date().getFullYear()} plus58
          </footer>
        </div>
      </body>
    </html>
  );
}
