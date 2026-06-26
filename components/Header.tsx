"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="w-full">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Small home wordmark — hidden on the homepage (the hero stands in). */}
        {isHome ? (
          <span />
        ) : (
          <Link
            href="/"
            className="font-hero text-[20px] font-bold tracking-[-0.03em] text-fg no-underline"
          >
            Croft
          </Link>
        )}

        <nav>
          <Link
            href="/#join-us"
            className="font-ui text-[14px] tracking-[-0.01em] text-muted no-underline transition-colors hover:text-fg"
          >
            Join waiting list
          </Link>
        </nav>
      </div>
    </header>
  );
}
