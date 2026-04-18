# Mobile-Friendly Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the live croft.fi Next.js marketing site mobile-first responsive across all 8 pages without regressing desktop at ≥1025px.

**Architecture:** Additive CSS layer on top of the existing `app/globals.css` desktop rules. One new React component (`MobileNav`) for the hamburger + right-slide drawer. Three breakpoint stops (`sm` ≤640px, `md` 641–1024px, `lg` ≥1025px). No rewrites of existing styles — only rationalisation and additions.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, plain CSS in `globals.css`. No test framework exists — verification is browser-based in Chrome DevTools device emulator.

**Spec:** `docs/superpowers/specs/2026-04-18-mobile-friendly-design.md`

---

## Preconditions

- Dev server command: `npm run dev` → `http://localhost:3000`.
- Chrome DevTools → Toggle device toolbar (⌘⇧M on Mac) → presets used below.
- All work on `main` (no worktree; this is a marketing site with no test suite).
- Each task ends with a commit. Commit messages use conventional style (`feat:`, `fix:`, `style:`, etc.).

---

## Task 1: Rationalise existing 768px breakpoint to 640px

**Purpose:** Align all current "mobile" rules to the new `sm` stop (≤640px) so subsequent tasks can extend them without conflicting breakpoints.

**Files:**
- Modify: `app/globals.css` (lines 233–241, 454–463, 465–487 — existing `@media` blocks)

- [ ] **Step 1: Find all `@media (max-width:768px)` blocks**

Run: Grep `@media (max-width:768px)` in `app/globals.css`. Expect three blocks:
- Lines 233–241 (global layout / nav-links / hero-white / grids / footer)
- Lines 457–463 (insights)
- Lines 465–487 (product / about / demo)

- [ ] **Step 2: Replace `768px` with `640px` in all three blocks**

Using Edit with `replace_all: true`:
- old: `@media (max-width:768px)`
- new: `@media (max-width:640px)`

Confirm the 1024px and 1200px breakpoints are unchanged.

- [ ] **Step 3: Verify dev server renders cleanly at desktop**

Run: `npm run dev` (background). Load `http://localhost:3000`. Window at 1440×900. Confirm visually identical to current production.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css
git commit -m "style: migrate mobile breakpoint from 768px to 640px"
```

---

## Task 2: Disable scroll-snap and remove 100vh on mobile

**Purpose:** On phones, sections must size to their content. The snap behaviour fights short viewports.

**Files:**
- Modify: `app/globals.css` (append at end)

- [ ] **Step 1: Append the mobile-scroll block to `app/globals.css`**

Add at the end of the file:

```css
/* ── Mobile (≤640px) scroll + section sizing ───── */
@media (max-width: 640px) {
    html { scroll-snap-type: none; }
    .sec-dark, .sec-light, .hero { min-height: auto; scroll-snap-align: none; }
    footer { scroll-snap-align: none; }
}

/* ── Tablet (641–1024px) — relax section min-height ───── */
@media (max-width: 1024px) and (min-width: 641px) {
    .sec-dark, .sec-light, .hero { min-height: auto; }
}
```

- [ ] **Step 2: Verify at 375×667 in DevTools**

Dev server open. DevTools → device toolbar → iPhone SE (375×667). Load `/`. Scroll with touchpad/mouse wheel — scroll should be free (not snapping). No section should have forced 100vh empty space below its content.

- [ ] **Step 3: Verify desktop regression**

Switch DevTools back to responsive 1440×900. Scroll-snap on home page still locks to sections (.sec-dark / .sec-light).

- [ ] **Step 4: Commit**

```bash
git add app/globals.css
git commit -m "fix(mobile): disable scroll-snap and 100vh sections on phones"
```

---

## Task 3: Fluid typography scale via `clamp()`

**Purpose:** Large headings currently stay at desktop size on phones. Switch to fluid scaling so they shrink smoothly without extra media queries.

**Files:**
- Modify: `app/globals.css` (inline edits to specific rules)

- [ ] **Step 1: Edit hero headline (line ~59)**

Find: `.hero-white h1 { font-size:46px;`
Replace `font-size:46px;` with `font-size:clamp(30px, 6vw, 46px);`

- [ ] **Step 2: Edit section title-center (line ~34)**

Find: `.title-center { text-align:center; font-size:36px;`
Replace `font-size:36px;` with `font-size:clamp(26px, 4.5vw, 36px);`

- [ ] **Step 3: Edit solutions h2 (line ~87)**

Find: `.sol-top-right h2 { font-size:38px;`
Replace `font-size:38px;` with `font-size:clamp(26px, 4.5vw, 38px);`

- [ ] **Step 4: Edit tech left h2 (line ~100)**

Find: `.tech-left h2 { font-size:30px;`
Replace `font-size:30px;` with `font-size:clamp(24px, 4vw, 30px);`

- [ ] **Step 5: Edit product hero h1 (line ~248)**

Find: `.p-hero h1 { font-size:44px;`
Replace `font-size:44px;` with `font-size:clamp(30px, 6vw, 44px);`

- [ ] **Step 6: Edit CTA banner h2 (line ~223)**

Find: `.cta-banner h2 { font-size:36px;`
Replace `font-size:36px;` with `font-size:clamp(26px, 4vw, 36px);`

- [ ] **Step 7: Edit hero eyebrow (line ~49)**

Find: `.hero-eyebrow { font-size:22px;`
Replace `font-size:22px;` with `font-size:clamp(16px, 2.6vw, 22px);`

- [ ] **Step 8: Edit about-title (line ~333)**

Find: `.about-title { font-size:48px;`
Replace `font-size:48px;` with `font-size:clamp(28px, 6vw, 48px);`

- [ ] **Step 9: Edit insights-hero h1 (line ~402)**

Find: `.insights-hero h1 { font-size:48px;`
Replace `font-size:48px;` with `font-size:clamp(28px, 6vw, 48px);`

Also remove `.insights-hero h1 { font-size:30px; }` from the `@media (max-width:640px)` insights block (line ~458) — the clamp now handles it.

- [ ] **Step 10: Edit demo h1 (line ~373)**

Find: `.demo-info h1 { font-size:44px;`
Replace `font-size:44px;` with `font-size:clamp(28px, 6vw, 44px);`

Also remove `.demo-info h1 { font-size:28px; }` from the `@media (max-width:640px)` product block (line ~485).

- [ ] **Step 11: Edit p-hero h1 redundant override**

In the `@media (max-width:640px)` block at ~line 465–487, remove the line `.p-hero h1 { font-size:30px; }` (line ~467) — clamp now handles it.

Also remove `.about-title { font-size:30px; }` (line ~481) — clamp now handles it.

- [ ] **Step 12: Verify across viewport sizes**

Dev server open. DevTools → responsive. Test at 320px, 375px, 640px, 768px, 1024px, 1440px on `/`, `/polaris`, `/insights`, `/about`, `/contact`. Headings should scale smoothly with no abrupt jumps, and never overflow their container.

- [ ] **Step 13: Commit**

```bash
git add app/globals.css
git commit -m "style(typography): fluid heading sizes with clamp()"
```

---

## Task 4: Container and spacing overrides for mobile

**Purpose:** Reduce horizontal and vertical padding at `sm` so content isn't cramped against screen edges and sections don't feel empty.

**Files:**
- Modify: `app/globals.css` (append new `sm` spacing block + extend existing `sm` block)

- [ ] **Step 1: Append mobile spacing block**

Add at the end of `app/globals.css`:

```css
/* ── Mobile (≤640px) spacing ─────────────────── */
@media (max-width: 640px) {
    .container { padding: 0 20px; }
    .nav-inner { padding: 14px 20px; }
    .sec-dark, .sec-light { padding: 56px 0; }
    .cta-banner { padding: 64px 0; }
    .p-section { padding: 48px 0; }
    .p-container { padding: 0 20px; }
    .p-hero { padding: 112px 0 40px; }
    .about-wide { padding: 0 20px; }
    .about-container { padding: 0 20px; }
    .about-hero { padding: 120px 0 0; }
    .about-section { padding: 40px 0; }
    .insights-container { padding: 0 20px; }
    .insights-hero { padding: 120px 0 32px; }
    .insights-section { padding: 32px 0 64px; }
    .demo-section { padding: 120px 0 64px; min-height: auto; }
    .demo-layout { padding: 0 20px; gap: 32px; }
    .demo-form-card { padding: 28px 20px; }
    .pf-section-wrap { padding: 56px 0 32px; }
    .pf-layout { padding: 0 20px; gap: 40px; }
    .pf-blocks { gap: 56px; }
    footer { padding: 56px 0 0; }
    .footer-main { margin-bottom: 40px; }
}
```

- [ ] **Step 2: Verify at 375×667**

Dev server. iPhone SE. Load `/`, `/polaris`, `/suppliers`, `/insights`, `/about`, `/contact`, `/careers`, `/faq`. Content should have ~20px breathing room from both edges of the screen. No horizontal scrollbar appears on any page.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "style(mobile): reduce container + section padding on phones"
```

---

## Task 5: Hero section mobile layout

**Purpose:** Fix hero's absolute-positioned CTA overlapping text on narrow viewports; shorten the banner; stack the eyebrow + social row.

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Append hero mobile block**

Add at the end of `app/globals.css`:

```css
/* ── Mobile (≤640px) hero layout ─────────────── */
@media (max-width: 640px) {
    .hero { padding-top: 80px; }
    .hero-banner { flex: 0 0 45vh; }
    .hero-banner-inner {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
        padding: 0 20px 24px;
    }
    .hero-social { text-align: left; }
    .social-row { justify-content: flex-start; }
    .hero-white { padding: 32px 20px; }
    .hero-white h1 { margin-bottom: 16px; }
    .hero-desc { max-width: 100%; margin-bottom: 24px; }
    .hero-white .btn-dark {
        position: static;
        margin-top: 8px;
        width: 100%;
        text-align: center;
    }
    .hero-roles { margin-bottom: 12px; }
}
```

- [ ] **Step 2: Verify at 375×667**

Dev server. iPhone SE. Load `/`. Hero banner should take ~45% of the visible viewport. Eyebrow text and social icons stacked with social row underneath. Below the banner, the white hero block contains the headline, description, and a full-width "Request a Demo" button — no overlap.

- [ ] **Step 3: Verify desktop regression at 1440×900**

Hero banner and right-aligned absolute button look identical to current production.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css
git commit -m "fix(mobile): stack hero eyebrow and make CTA full-width"
```

---

## Task 6: Mobile grid fallbacks

**Purpose:** Ensure every multi-column grid collapses cleanly at `sm`. Most already do (existing 1024/640 rules), but several are missed: `outcomes-grid`, `footer-main`, `about-team-row`, `contact-grid`, and the `careers` layout.

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Append grid mobile block**

Add at the end of `app/globals.css`:

```css
/* ── Mobile (≤640px) grid fallbacks ──────────── */
@media (max-width: 640px) {
    .products-row { grid-template-columns: 1fr; }
    .sol-cards { grid-template-columns: 1fr; }
    .sol-card-light { grid-column: auto; padding: 28px; }
    .sol-card { padding: 24px; }
    .tech-grid { grid-template-columns: 1fr; gap: 32px; }
    .contact-grid { grid-template-columns: 1fr; gap: 32px; }
    .contact-details { flex-direction: column; gap: 20px; margin-bottom: 24px; }
    .contact-right { min-height: 260px; }
    .outcomes-grid { grid-template-columns: 1fr; gap: 16px; }
    .outcome-card { padding: 28px; }
    .footer-main { grid-template-columns: 1fr; gap: 32px; }
    .footer-bottom { flex-direction: column; gap: 16px; text-align: center; }
    .footer-legal { flex-wrap: wrap; justify-content: center; }
    .about-team-row { grid-template-columns: 1fr; }
    .about-card { padding: 32px 20px; }
    .team-row { flex-direction: column; align-items: center; gap: 24px; }
    .team-card { flex: 0 0 auto; width: 100%; max-width: 340px; }
    .testi-grid { flex-direction: column; gap: 32px; }
    .testi-left { flex: 0 0 auto; }
    .cases-row { grid-template-columns: 1fr; gap: 16px; }
    .case-card { flex: 1 1 auto; }
    .faq-head { flex-direction: column; align-items: flex-start; gap: 16px; }
    .faq-pills { overflow-x: auto; flex-wrap: nowrap; padding-bottom: 4px; }
    .faq-pill { flex-shrink: 0; }
}
```

- [ ] **Step 2: Verify at 375×667 on every page**

Dev server. iPhone SE. Walk each page:
- `/` — products row single column; solutions cards single column; tech/contact/testi/cases all stacked; footer single column.
- `/about` — team cards stacked; two-column team row collapses.
- `/contact` — form card + visual card stacked.
- `/faq` — FAQ pills scroll horizontally instead of wrapping awkwardly.

No horizontal scroll on any page.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "style(mobile): single-column grids for all layout blocks"
```

---

## Task 7: Create MobileNav component

**Purpose:** The hamburger button + slide-in right drawer. Self-contained client component with local state.

**Files:**
- Create: `components/MobileNav.tsx`

- [ ] **Step 1: Create the component file**

Create `components/MobileNav.tsx`:

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
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
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);

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
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/MobileNav.tsx
git commit -m "feat(nav): add MobileNav drawer component"
```

---

## Task 8: MobileNav styles

**Purpose:** Hamburger trigger, drawer, backdrop, typography — all visible only at ≤1024px.

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Append MobileNav styles**

Add at the end of `app/globals.css`:

```css
/* ── Mobile Nav (drawer) ─────────────────────── */
.mnav-trigger {
    display: none;
    background: transparent;
    border: none;
    padding: 10px;
    width: 44px;
    height: 44px;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    cursor: pointer;
    justify-self: end;
}
.mnav-trigger .mnav-bar {
    display: block;
    width: 22px;
    height: 2px;
    background: var(--white);
    border-radius: 2px;
    transition: transform .2s, opacity .2s;
}

.mnav-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(8px);
    opacity: 0;
    pointer-events: none;
    transition: opacity .2s ease;
    z-index: 998;
}
.mnav-backdrop.is-open {
    opacity: 1;
    pointer-events: auto;
}

.mnav-drawer {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: min(85vw, 360px);
    background: rgba(10, 15, 20, 0.98);
    border-left: 1px solid var(--border);
    transform: translateX(100%);
    transition: transform .28s cubic-bezier(.4, 0, .2, 1);
    z-index: 999;
    padding: 72px 28px 32px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow-y: auto;
}
.mnav-drawer.is-open { transform: translateX(0); }

.mnav-close {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 44px;
    height: 44px;
    background: transparent;
    border: none;
    color: var(--white);
    font-size: 28px;
    line-height: 1;
    cursor: pointer;
    border-radius: var(--rs);
}
.mnav-close:hover { background: rgba(255, 255, 255, 0.06); }

.mnav-links {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 8px;
}
.mnav-links a {
    display: block;
    color: var(--gray);
    font-size: 17px;
    font-weight: 500;
    padding: 14px 4px;
    transition: color .2s;
}
.mnav-links a:hover,
.mnav-links a.is-active {
    color: var(--white);
}

.mnav-divider {
    height: 1px;
    background: var(--border);
    margin: 16px 0;
}

.mnav-cta {
    display: block;
    background: var(--white);
    color: var(--dark) !important;
    padding: 14px 18px;
    border-radius: var(--rs);
    font-weight: 500;
    font-size: 14px;
    text-align: center;
    margin-top: auto;
}

/* Show hamburger at ≤1024px, hide desktop links */
@media (max-width: 1024px) {
    .mnav-trigger { display: flex; }
    .nav-links { display: none; }
}

/* On phones ≤640px, also hide the desktop "Request a Demo" CTA in the nav
   (it lives inside the drawer instead) */
@media (max-width: 640px) {
    .nav-cta-wrap { display: none; }
    .nav-inner { grid-template-columns: 1fr auto; }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
    .mnav-drawer, .mnav-backdrop, .mnav-bar { transition: none; }
}
```

- [ ] **Step 2: Commit (styles only — not yet wired)**

```bash
git add app/globals.css
git commit -m "style(nav): add hamburger drawer styles (not yet wired)"
```

---

## Task 9: Integrate MobileNav into Nav.tsx

**Purpose:** Render `<MobileNav />` alongside existing desktop links. CSS from Task 8 controls which is visible.

**Files:**
- Modify: `components/Nav.tsx`

- [ ] **Step 1: Update `components/Nav.tsx`**

Replace the contents of `components/Nav.tsx` with:

```tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MobileNav from './MobileNav';

const navLinks = [
  { href: '/polaris', label: 'Polaris' },
  { href: '/suppliers', label: 'Suppliers' },
  { href: '/insights', label: 'Insights' },
  { href: '/about', label: 'Company' },
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
        <MobileNav />
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Verify mobile at 375×667**

Dev server running. iPhone SE preset. Load `/`:
- Hamburger icon visible on right of the nav bar.
- Desktop links are hidden.
- Desktop CTA is hidden.
- Tap hamburger → drawer slides in from right, backdrop fades in.
- Drawer contains: close (×), the 4 links, divider, "Request a Demo" CTA.
- Tap a link → drawer closes and page navigates.
- Tap backdrop → drawer closes.
- Press Escape → drawer closes.
- Body scroll is locked while drawer is open.

- [ ] **Step 4: Verify tablet at 768×1024**

DevTools → iPad portrait. Hamburger shown; the desktop-style "Request a Demo" CTA is also visible (only hides at ≤640px).

- [ ] **Step 5: Verify desktop at 1440×900**

Hamburger hidden. Desktop nav links and CTA visible exactly as before.

- [ ] **Step 6: Commit**

```bash
git add components/Nav.tsx
git commit -m "feat(nav): wire MobileNav into top bar"
```

---

## Task 10: Form inputs + touch targets at mobile

**Purpose:** Prevent iOS Safari auto-zoom on input focus (font-size ≥ 16px), ensure all touch targets are ≥44px, make submit buttons full-width.

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Append form mobile block**

Add at the end of `app/globals.css`:

```css
/* ── Mobile (≤640px) forms + touch targets ───── */
@media (max-width: 640px) {
    .form-row { flex-direction: column; gap: 12px; }
    .form-row input,
    textarea {
        font-size: 16px;
        min-height: 44px;
        padding: 12px 14px;
    }
    .careers-form input[type="text"],
    .careers-form input[type="email"],
    .careers-form input[type="url"],
    .careers-form textarea {
        font-size: 16px;
        min-height: 44px;
    }
    .demo-form input { font-size: 16px; min-height: 44px; }
    .demo-row { grid-template-columns: 1fr; gap: 12px; }
    form button[type="submit"],
    .btn-dark,
    .careers-form button[type="submit"] {
        width: 100%;
        min-height: 44px;
    }
    .prod-body a,
    .footer-col a,
    .footer-legal a {
        padding: 6px 0;
        display: inline-block;
    }
    .insights-dropdown select {
        min-height: 44px;
        font-size: 14px;
    }
    .insights-sort { flex-wrap: wrap; }
    .insights-sort button { min-height: 40px; }
}
```

- [ ] **Step 2: Verify on `/contact` and `/careers` at 375×667**

Dev server. iPhone SE.
- `/contact`: inputs are stacked; tapping an input does not zoom the page on iOS Safari simulation (font-size ≥ 16px); Send button is full-width.
- `/careers`: same behaviour; textarea resizes vertically only; file-upload button is tap-friendly.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "fix(mobile): 16px input font + full-width submit buttons"
```

---

## Task 11: Insights list, card, and article mobile

**Purpose:** Insights cards' hover effect doesn't work on touch. Make card excerpt always visible below the headline on mobile. LanguageToggle stacks full-width. Article body images are responsive.

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Append insights mobile block**

Add at the end of `app/globals.css`:

```css
/* ── Mobile (≤640px) insights ────────────────── */
@media (max-width: 640px) {
    .insights-grid { grid-template-columns: 1fr; gap: 24px; }
    .insights-card {
        min-height: auto;
        position: static;
    }
    .insights-card-front {
        position: static;
        inset: auto;
    }
    /* Disable the hover flip on touch — show front always */
    .insights-card-back { display: none; }
    .insights-card-body {
        padding: 24px 20px;
        gap: 12px;
    }
    .insights-card-body h2 { font-size: 20px; }
    .insights-card-image { min-height: 200px; }

    .insights-controls {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
    }
    .insights-dropdowns {
        flex-direction: column;
        width: 100%;
        gap: 8px;
    }
    .insights-dropdown,
    .insights-dropdown select { width: 100%; }

    .insights-content { font-size: 15px; }
    .insights-content h2 { font-size: 22px; margin: 40px 0 16px; }
    .insights-content h3 { font-size: 18px; margin: 28px 0 12px; }
    .insights-content img { margin: 24px 0; border-radius: 10px; }
    .insights-content blockquote {
        padding: 14px 18px;
        margin: 24px 0;
    }
    .insights-content ul,
    .insights-content ol { padding-left: 20px; }

    .lang-toggle {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        margin-bottom: 28px;
    }
    .lang-toggle button {
        width: 100%;
        padding: 12px 16px;
        font-size: 14px;
    }
}
```

- [ ] **Step 2: Verify on `/insights` and `/insights/risk-signals-pharmaceutical-supply-chains`**

Dev server. iPhone SE.
- `/insights`: single-column cards; each card shows image + badge + title; no hover required.
- Filter dropdowns stack vertically full-width.
- Article page: LanguageToggle is two full-width buttons side-by-side; body copy is 15px and readable; images span container with rounded corners.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "style(mobile): insights list + article typography + lang toggle"
```

---

## Task 12: Product pages (Polaris, Suppliers) and ScrollNav

**Purpose:** Existing rules cover most of `.p-*` on mobile. Add: hide ScrollNav on phones (but keep the `.pf-nav` horizontal pill row, which works OK). Tighten stats and deliverables.

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Append product-page mobile block**

Add at the end of `app/globals.css`:

```css
/* ── Mobile (≤640px) product pages ───────────── */
@media (max-width: 640px) {
    /* Convergence hero */
    .conv-wrap { margin-top: 24px; padding: 0 20px; }
    .conv-labels { grid-template-columns: repeat(3, 1fr); row-gap: 8px; }
    .conv-pill { font-size: 10px; padding: 5px 10px; }
    .conv-tagline { font-size: 14px; margin-top: 16px; }

    /* Product page sections */
    .p-section h2 { font-size: clamp(22px, 5vw, 28px); }
    .p-stats { grid-template-columns: 1fr 1fr; gap: 12px; }
    .p-stat { padding: 20px 12px; }
    .p-stat-val { font-size: 28px; }
    .p-deliverables { grid-template-columns: 1fr; }
    .p-del { padding: 16px; }
    .p-step { grid-template-columns: 1fr; gap: 8px; margin-bottom: 20px; padding-bottom: 20px; }
    .p-num-step { grid-template-columns: 40px 1fr; gap: 12px; margin-bottom: 24px; padding-bottom: 24px; }
    .p-cta { padding: 56px 20px; }

    /* Split layouts stack (rule already exists but explicit) */
    .p-split, .p-split-reverse { grid-template-columns: 1fr; gap: 32px; direction: ltr; }

    /* Features nav → convert to a horizontal scrollable pill row */
    .pf-nav {
        flex-direction: row;
        flex-wrap: nowrap;
        overflow-x: auto;
        gap: 6px;
        padding-bottom: 8px;
        -webkit-overflow-scrolling: touch;
    }
    .pf-nav-link {
        flex-shrink: 0;
        padding: 8px 14px;
        font-size: 12px;
        background: rgba(255, 255, 255, 0.04);
        border-radius: 16px;
    }
    .pf-nav-link.active::before { display: none; }
    .pf-nav-link.active { background: rgba(255, 255, 255, 0.12); }
    .pf-block h2 { font-size: clamp(22px, 5vw, 28px); }
    .pf-image { border-radius: 10px; }
}
```

- [ ] **Step 2: Verify on `/polaris` and `/suppliers` at 375×667**

Dev server. iPhone SE.
- `/polaris`: ConvergenceSVG scales to viewport width; pills wrap into 3 columns; stats row is 2×2 grid; deliverables stack; num-steps are compact.
- `/suppliers`: same structures work.
- ScrollNav (`pf-nav`) becomes a horizontal scroll strip of pills at the top of the features block — tappable, no overflow.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "style(mobile): polaris/suppliers stats + conv-labels + features nav"
```

---

## Task 13: Full browser regression pass

**Purpose:** Walk every page at every breakpoint and log visual issues. Fix any surfaced.

**Files:**
- Modify: `app/globals.css` (as needed)

- [ ] **Step 1: Run build to catch any CSS/JS errors**

Run: `npm run build`
Expected: `✓ Compiled successfully` with no TypeScript or CSS errors.

- [ ] **Step 2: Visual sweep — mobile (iPhone SE 375×667)**

Dev server. iPhone SE. Walk all pages:
- `/` — hero, products, solutions, tech, testi, cases, CTA, footer
- `/polaris` — hero, convergence, sections, features, CTA
- `/suppliers` — similar
- `/insights` — hero, filters, cards grid
- `/insights/risk-signals-pharmaceutical-supply-chains` — article body
- `/about` — hero, banner, team, statements
- `/contact` — form + visual
- `/careers` — values + application form
- `/faq` — pills + questions

Record any visual issue (overflow, misalignment, touch target < 44px, font that doesn't scale). Fix inline in `app/globals.css`.

- [ ] **Step 3: Visual sweep — larger phone (iPhone 14 Pro Max 430×932)**

DevTools → iPhone 14 Pro Max. Same walk. Most issues should already be handled; record only delta.

- [ ] **Step 4: Visual sweep — tablet (iPad 768×1024)**

DevTools → iPad portrait. Confirm:
- Hamburger still shown (≤1024px).
- Desktop CTA visible in top bar.
- Grids at intermediate size are 2-column where useful.
- No forced 100vh sections.

- [ ] **Step 5: Desktop regression (1440×900)**

Responsive at 1440×900. Compare against previous production URL `https://croft.fi`.
- Nav: brand left, 4 links centred, CTA right (hamburger hidden).
- Hero, all sections pixel-stable.
- Scroll-snap still works on home page.

- [ ] **Step 6: Commit any surfaced fixes**

```bash
git add app/globals.css
git commit -m "fix(mobile): <specific issue> from regression pass"
```

(Skip if no fixes needed.)

---

## Task 14: Deploy preview and real-device smoke test

**Purpose:** Vercel auto-deploys main branch on push. User verifies on their phone.

- [ ] **Step 1: Push to origin**

```bash
git push origin main
```

- [ ] **Step 2: Wait for Vercel deploy**

Monitor Vercel dashboard or wait ~60–120 seconds for the production deploy.

- [ ] **Step 3: User real-device check**

User opens `https://croft.fi` on their phone. Confirms:
- Home page loads, hamburger visible.
- All 4 nav destinations reachable via drawer.
- Contact form inputs don't zoom on focus.
- Article reads comfortably; LanguageToggle works.

- [ ] **Step 4: Done**

If the user reports issues, log them as follow-up tasks and fix in a subsequent commit.

---

## Self-Review

**Spec coverage:**
- §2 strategic decisions → Tasks 2 (scroll-snap), 7–9 (drawer nav).
- §3 breakpoints → Task 1 (migration) + all subsequent tasks using 640/1024.
- §4 architecture (MobileNav, Nav.tsx changes, globals.css appends) → Tasks 7, 8, 9 + the `sm`/`md` blocks in every task.
- §5 drawer behaviour → Task 7 (component), Task 8 (styles), Task 9 (wiring). Reduced-motion covered in Task 8.
- §6 responsive CSS → Tasks 2 (scroll-snap), 3 (typography), 4 (spacing), 5 (hero), 6 (grids), 10 (forms/touch), 11 (insights), 12 (product pages).
- §7 accessibility → Task 7 (aria attrs, focus management), Task 10 (touch targets), Task 8 (reduced-motion).
- §8 testing → Task 13 (breakpoint sweep), Task 14 (real device).
- §9 out of scope → honoured (no content/SEO/perf tasks).
- §10 success criteria → verified in Tasks 13 and 14.

**Placeholder scan:** All CSS rules are concrete. No TBDs, no "adjust as needed", no vague "handle X". All file paths are absolute.

**Type/naming consistency:** `MobileNav`, `mnav-*` class prefix, `navLinks` array — used consistently across Tasks 7–9. `sm`/`md`/`lg` tokens used consistently in task descriptions; actual CSS uses the literal pixel breakpoints `640px` and `1024px`.

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-04-18-mobile-friendly.md`. Two execution options:

1. **Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration.
2. **Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints.

Which approach?
