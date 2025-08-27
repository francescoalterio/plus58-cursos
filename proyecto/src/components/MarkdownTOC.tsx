"use client";
import { useEffect, useState } from "react";

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

export default function MarkdownTOC() {
  const [items, setItems] = useState<HeadingItem[]>([]);

  useEffect(() => {
    const selector = "article h1, article h2, article h3";
    const collect = () => {
      const hs = Array.from(
        document.querySelectorAll(selector)
      ) as HTMLElement[];
      const mapped = hs.map((h) => ({
        id: h.id,
        text: h.textContent || "",
        level: Number(h.tagName.substring(1)),
      }));
      setItems(mapped.filter((m) => m.id));
    };
    collect();
    // Recolectar si el contenido cambia (ej: navegación interna) usando MutationObserver
    const mo = new MutationObserver(() => collect());
    const article = document.querySelector("article");
    if (article) mo.observe(article, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, []);

  // Detectar heading activo al hacer scroll
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    if (!items.length) return;
    const handler = () => {
      let current: string | null = null;
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120) current = it.id; // 120px offset top
      }
      setActive(current);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [items]);

  if (!items.length) return null;

  return (
    <aside className="hidden lg:block w-64 shrink-0 sticky top-24 h-[calc(100vh-6rem)] overflow-auto pl-4 pr-2 text-[11px]">
      <div className="rounded-md border border-neutral-800/80 bg-neutral-950/80 backdrop-blur-sm p-3 shadow-sm">
        <p className="uppercase tracking-wider text-[10px] text-neutral-500 mb-2 font-semibold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-brand/70 animate-pulse" />{" "}
          Índice
        </p>
        <ul className="space-y-1.5">
          {items.map((h) => {
            const indent = (h.level - 1) * 10; // px
            const isActive = h.id === active;
            return (
              <li key={h.id} style={{ paddingLeft: indent }}>
                <a
                  href={`#${h.id}`}
                  className={`group relative block rounded px-2 py-1 leading-tight transition-colors border border-transparent ${
                    isActive
                      ? "bg-brand/10 text-brand border-brand/30"
                      : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60"
                  }`}
                >
                  <span className="block truncate">{h.text}</span>
                  {isActive && (
                    <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-4 rounded bg-brand" />
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
