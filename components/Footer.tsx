import Link from "next/link";

const LINKS = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/gdpr", label: "GDPR" },
];

export default function Footer() {
  return (
    <footer className="measure w-full">
      <div className="mt-[88px] flex flex-wrap justify-between gap-4 pt-6 font-ui text-[13px] text-muted">
        <span>© 2026 Croft Oy</span>
        <span className="flex gap-5">
          {LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted no-underline transition-colors hover:text-fg"
            >
              {item.label}
            </Link>
          ))}
        </span>
      </div>
    </footer>
  );
}
