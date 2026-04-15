'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/polaris', label: 'Polaris' },
  { href: '/suppliers', label: 'Suppliers' },
  { href: '/about', label: 'Company' },
  { href: '/blog', label: 'Blog' },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav id="nav" className={scrolled ? 'scrolled' : ''}>
      <div className="nav-inner">
        <div className="nav-brand">
          <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            <span className="brand-name">CROFT</span>
          </Link>
        </div>
        <div className="nav-links">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={pathname === href ? { color: 'var(--white)' } : undefined}
            >
              {label}
            </Link>
          ))}
        </div>
        <div className="nav-cta-wrap">
          <Link href="/contact" className="nav-cta">
            Request a Demo
          </Link>
        </div>
      </div>
    </nav>
  );
}
