"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

interface Item {
  href: string;
  label: string;
  exact?: boolean;
}

const items: Item[] = [
  { href: "/", label: "Ver cursos", exact: true },
  { href: "/sobre-mi", label: "Sobre mí" },
];

export default function PrimaryNav() {
  const pathname = usePathname();
  return (
    <nav className="flex items-center gap-1">
      {items.map((item) => {
        const active = item.exact
          ? pathname === item.href
          : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cx(
              "relative rounded-md px-3 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/60",
              "text-neutral-400 hover:text-brand",
              "after:absolute after:inset-x-2 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-brand after:scale-x-0 after:origin-center after:transition-transform",
              "hover:after:scale-x-100",
              active && "text-neutral-100 after:scale-x-100"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
