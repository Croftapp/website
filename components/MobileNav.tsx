'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/polaris', label: 'Polaris' },
  { href: '/suppliers', label: 'Suppliers' },
  { href: '/insights', label: 'Insights' },
  { href: '/about', label: 'Company' },
];

export default function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', handleKey);

    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKey);
      triggerButtonRef.current?.focus();
    };
  }, [open]);

  const overlay = (
    <>
      <div
        className={`mnav-backdrop${open ? ' is-open' : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <div
        id="mobile-nav-drawer"
        className={`mnav-drawer${open ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        aria-hidden={!open}
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="mnav-close"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        >
          ×
        </button>

        <nav className="mnav-links">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={pathname === href ? 'is-active' : ''}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="mnav-divider" />

        <Link
          href="/contact"
          className="mnav-cta"
          onClick={() => setOpen(false)}
        >
          Request a Demo
        </Link>
      </div>
    </>
  );

  return (
    <>
      <button
        ref={triggerButtonRef}
        type="button"
        className="mnav-trigger"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-nav-drawer"
        onClick={() => setOpen(true)}
      >
        <span className="mnav-bar" />
        <span className="mnav-bar" />
        <span className="mnav-bar" />
      </button>

      {mounted && createPortal(overlay, document.body)}
    </>
  );
}
