import Link from "next/link";

type NavKey = "home" | "privacidade" | "termos";

const LINKS = [
  { href: "/", label: "Início", key: "home" as const },
  { href: "/#recursos", label: "Recursos", key: null },
  { href: "/#download", label: "Download", key: null },
  { href: "/#cloud", label: "Pokt Cloud", key: null },
  { href: "/privacidade", label: "Privacidade", key: "privacidade" as const },
  { href: "/termos", label: "Termos", key: "termos" as const }
];

export function SiteHeader({ current }: { current?: NavKey }) {
  return (
    <header className="top">
      <Link className="logo" href="/">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.svg" width={36} height={36} alt="" />
        <span>Pokt Craft</span>
      </Link>
      <nav className="menu" aria-label="Principal">
        {LINKS.map((link) => (
          <Link
            key={link.href + link.label}
            href={link.href}
            aria-current={link.key && link.key === current ? "page" : undefined}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
