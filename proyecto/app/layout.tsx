import "../src/styles/globals.css";
import type { ReactNode } from "react";
import SessionActions from "../src/components/SessionActions";
import Link from "next/link";
import Image from "next/image";
import PrimaryNav from "../src/components/PrimaryNav";

export const metadata = {
  title: "Cursos Francesco",
  description: "Materiales de cursos de programación plus58",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/images/yo.png", sizes: "32x32", type: "image/png" },
    ],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className="dark">
      <body>
        <div className="min-h-screen flex flex-col">
          <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/70 bg-neutral-950/90 border-b border-neutral-900/80 px-4 sm:px-6">
            <div className="h-16 flex items-center justify-between gap-6 mx-auto max-w-6xl">
              <div className="flex items-center gap-6 min-w-0">
                <Link
                  href="/"
                  className="flex items-center gap-2 group shrink-0"
                >
                  <span className="relative">
                    <Image
                      src="/images/yo.png"
                      alt="Logo"
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full object-cover bg-neutral-800 ring-2 ring-neutral-800 group-hover:ring-brand/70 transition shadow-md"
                      priority
                    />
                    <span className="pointer-events-none absolute inset-0 rounded-full shadow-[0_0_0_1px_var(--tw-ring-color)] ring-0 group-hover:ring-1 ring-brand/40 transition" />
                  </span>
                  <span className="text-lg font-semibold tracking-tight bg-gradient-to-r from-brand to-emerald-400 bg-clip-text text-transparent">
                    Cursos
                  </span>
                </Link>
                <PrimaryNav />
              </div>
              <div className="flex items-center gap-4">
                <SessionActions />
              </div>
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
