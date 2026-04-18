# Mobile-Friendly Refinement — Design Spec

**Date:** 2026-04-18
**Status:** Approved (ready for implementation plan)
**Scope:** Make the live croft.fi Next.js marketing site mobile-first responsive across all 8 pages, without regressing the desktop experience.

---

## 1. Goal

When a visitor loads any page on a phone (typical ranges: 360–430px wide), the experience must be visually polished, fully navigable, and legible — matching the quality of the desktop site. Targeted use case: someone finds croft.fi from Google on their phone and forms a first impression of the company.

**Explicit non-goals:**
- No redesign of any page's core layout, content, or information architecture.
- No rewrite of existing CSS. Additions and targeted overrides only.
- No new marketing copy, new images, or new pages.

---

## 2. Strategic decisions (confirmed with user)

| Decision | Choice |
|----------|--------|
| Depth | **Mobile-first refinement** — proper responsive pass on every page, tuned spacing, touch targets ≥44px, typography scale, per-page layout tuning. Not a redesign. |
| Mobile navigation pattern | **Hamburger + slide-in right drawer** (85vw, max 360px) over a dimmed/blurred backdrop. |
| Scroll-snap | **Keep on desktop, disable at ≤640px**; sections drop `min-height: 100vh` at mobile so content sizes naturally. |

---

## 3. Breakpoint system

Three stops replace the current ad-hoc 1024/768 breakpoints:

| Token | Range | Role |
|-------|-------|------|
| `lg` | ≥ 1025px | Desktop — current design is authoritative. |
| `md` | 641–1024px | Tablet / small laptop — intermediate adjustments. |
| `sm` | ≤ 640px | Phone — full mobile treatment. |

Existing `@media (max-width: 1024px)` rules stay. Existing `@media (max-width: 768px)` rules are migrated to `@media (max-width: 640px)` to align with the new `sm` breakpoint, and content inside them is extended with the new mobile rules listed in §6.

---

## 4. Architecture

- Current `app/globals.css` stays the desktop source of truth.
- All new mobile rules appended in a clearly commented `/* ── Mobile (≤640px) ──── */` section at the bottom.
- `md` adjustments added as a separate `/* ── Tablet (641–1024px) ──── */` block.
- One new React component for the drawer; one modification to `Nav.tsx`.

### 4.1 Files created

| File | Purpose |
|------|---------|
| `components/MobileNav.tsx` | Hamburger button + slide-in drawer (client component). Owns its own open/close state. |

### 4.2 Files modified

| File | Change |
|------|--------|
| `components/Nav.tsx` | Render `<MobileNav />` alongside existing desktop links. CSS controls which is visible at each breakpoint — both remain in the DOM (no hydration flicker). |
| `app/globals.css` | Append `sm` and `md` sections; rationalise existing breakpoints; scroll-snap override; typography scale via `clamp()`; spacing overrides; touch-target padding. |

No files deleted.

---

## 5. Mobile navigation (MobileNav component)

### 5.1 Trigger

- Hamburger button: 24×24px icon centred in a 44×44px tap target, right-aligned in the nav bar.
- Shown at `≤1024px`, hidden at `≥1025px` via CSS.
- `<button>` element; `aria-label="Open menu"` / `"Close menu"`; `aria-expanded={open}`; `aria-controls="mobile-nav-drawer"`.

### 5.2 Drawer panel

- Slides from the right; `transform: translateX(100%) → translateX(0)`.
- Width: `min(85vw, 360px)`.
- Background: `rgba(10,15,20,0.98)` with `border-left: 1px solid var(--border)`.
- Transition: `transform .28s cubic-bezier(.4,0,.2,1)`.
- Element: `<div role="dialog" aria-modal="true" aria-label="Navigation" id="mobile-nav-drawer">`.

### 5.3 Backdrop

- Full-viewport overlay: `rgba(0,0,0,0.5)` with `backdrop-filter: blur(8px)`.
- Fades in/out with opacity (`.2s ease`).
- Tapping it closes the drawer.

### 5.4 Contents (top → bottom)

1. Close button (×, 44×44px) pinned top-right of the drawer.
2. Nav links stacked vertically: `/polaris`, `/suppliers`, `/insights`, `/about`. Font 17px, vertical padding 14px per item, left-aligned.
3. Active-route link: `color: var(--white)` (matches desktop active style); inactive: `color: var(--gray)`.
4. Divider (1px, `var(--border)`).
5. "Request a Demo" CTA — full-width, white background, dark text. Only rendered in the drawer at `≤640px` (on tablets the CTA stays visible in the top bar).

### 5.5 Behaviour

- Closes on: backdrop tap, close-button tap, link tap, `Escape` keypress, route change (observe `usePathname`).
- Body scroll locked while open: `document.body.style.overflow = 'hidden'`; restored on close.
- Focus management: on open, focus the close button; `Escape` closes; focus returns to hamburger on close.
- State: local `useState<boolean>`. No global store.

### 5.6 Desktop bar at `md` and `sm`

- `nav-links` hidden (already is).
- `nav-cta-wrap`: visible at `md`, hidden at `sm` (CTA lives in drawer on phones).
- Hamburger shown; replaces the nav-links column in the 3-column grid.

---

## 6. Responsive CSS — concrete rules

### 6.1 Scroll-snap

```css
@media (max-width: 640px) {
  html { scroll-snap-type: none; }
  .sec-dark, .sec-light, .hero { min-height: auto; scroll-snap-align: none; }
}
@media (max-width: 1024px) and (min-width: 641px) {
  .sec-dark, .sec-light, .hero { min-height: auto; }
  /* snap stays, but sections size to content */
}
```

### 6.2 Typography scale (fluid `clamp()`)

| Selector | Rule |
|----------|------|
| `.hero-white h1` | `font-size: clamp(30px, 6vw, 46px);` |
| `.title-center` | `font-size: clamp(26px, 4.5vw, 36px);` |
| `.sol-top-right h2` | `font-size: clamp(26px, 4.5vw, 38px);` |
| `.tech-left h2` | `font-size: clamp(24px, 4vw, 30px);` |
| `.p-hero h1` | `font-size: clamp(30px, 6vw, 44px);` |
| `.cta-banner h2` | `font-size: clamp(26px, 4vw, 36px);` |
| `.hero-eyebrow` | `font-size: clamp(16px, 2.6vw, 22px);` |

Body copy (13–16px) and card titles (17–22px) are unchanged — already mobile-safe.

### 6.3 Spacing overrides (`@media (max-width: 640px)`)

| Selector | Desktop | Mobile |
|----------|---------|--------|
| `.container` padding | `0 40px` | `0 20px` |
| `.nav-inner` padding | `18px 40px` | `14px 20px` |
| `.sec-dark`, `.sec-light` padding | `80px 0` | `56px 0` |
| `.cta-banner` padding | `96px 0` | `64px 0` |
| `.p-section` padding | `72px 0` | `48px 0` |
| `.p-container` padding | `0 40px` | `0 20px` |
| `.p-hero` padding | `140px 0 64px` | `112px 0 40px` |

### 6.4 Hero layout (`@media (max-width: 640px)`)

- `.hero-banner` flex basis: `0 0 65vh` → `0 0 45vh`.
- `.hero-banner-inner`: `flex-direction: column; align-items: flex-start; gap: 16px; padding-bottom: 24px;` — stacks eyebrow and social.
- `.hero-social` text-align left; `.social-row` justified left.
- `.hero-white` padding: `40px 40px 40px` → `32px 20px`.
- `.hero-white .btn-dark`: `position: static; margin-top: 24px; width: 100%;` (replace absolute positioning that overlaps text on narrow screens).
- `.hero-desc` max-width: `100%`.

### 6.5 Grids

| Grid | `lg` | `md` | `sm` |
|------|------|------|------|
| `.products-row` | 4-col | 2-col | 1-col |
| `.sol-cards` | 3-col | 2-col | 1-col |
| `.sol-card-light` | span 3 | span 2 | span 1 |
| `.tech-grid` | `1fr 1.3fr` | single col | single col |
| `.contact-grid` | multi-col | single col | single col |
| `.testi-grid` | multi-col | single col | single col |
| `.footer-grid` | multi-col | `1fr 1fr` | `1fr` |
| `.cases-row` | multi-col | `1fr` | `1fr` |
| `.form-row` | flex-row | flex-col | flex-col |

### 6.6 Touch targets (`@media (max-width: 640px)`)

- `.prod-body a`, `.nav-links a` (inside drawer), footer links: minimum effective hit area 44×44px. Add `padding: 10px 0; display: inline-block;` where needed.
- Form inputs (`input`, `textarea`, `select`): `font-size: 16px` to prevent iOS auto-zoom; `min-height: 44px` for single-line inputs; padding `12px 14px`.
- Submit buttons on forms: `width: 100%;`.
- Close (×) button in drawer, hamburger button: explicit `width: 44px; height: 44px`.

### 6.7 Polaris / product-page-specific

- `.conv-wrap` padding: `0 20px` at `sm`.
- `.conv-labels`: `grid-template-columns: repeat(3, 1fr)` at `sm` (5 pills wrap cleanly into 3+2). `.conv-pill` `font-size: 11px; padding: 6px 12px;`.
- Stats rows: single column at `sm`.
- ScrollNav sidebar (`components/ScrollNav.tsx`): hide at `≤640px` (`display: none`); keep at `md+`.

### 6.8 Insights list & detail

- `.insights-grid` (or equivalent) → single column at `sm`; featured card first.
- `LanguageToggle` `.lang-toggle`: buttons stack full-width, `padding: 12px 16px`, `font-size: 15px` at `sm`.
- MDX body: `img { max-width: 100%; height: auto; }`; tables wrapped in `overflow-x: auto` container (if tables exist in content).
- Article `h1` fluid scale matching `.p-hero h1`.

### 6.9 Forms (Contact, Careers)

- Inputs full-width, `font-size: 16px`, `min-height: 44px`.
- `.form-row` flex-col (already is at 768px).
- Submit button full-width.
- Error/success message visible above submit button (no new pattern; preserve current).

---

## 7. Accessibility checklist

- Hamburger button has `aria-label`, `aria-expanded`, `aria-controls`.
- Drawer is `role="dialog"` with `aria-modal="true"` and `aria-label`.
- Focus trap inside drawer while open; Escape closes.
- All interactive elements reach 44×44px minimum at `sm`.
- Colour contrast unchanged (existing palette already passes).
- Reduced motion: wrap drawer and hero transitions in `@media (prefers-reduced-motion: reduce)` to disable animations.

---

## 8. Testing strategy

1. **Dev-server emulation** — `npm run dev`, Chrome DevTools device mode:
   - 375×667 (iPhone SE / baseline small)
   - 390×844 (iPhone 14)
   - 430×932 (iPhone 15 Pro Max)
   - 768×1024 (iPad portrait)
   - 1440×900 (desktop regression check)
2. **Per-page pass** — walk all 8 routes at each size: `/`, `/polaris`, `/suppliers`, `/insights`, `/insights/[slug]`, `/about`, `/contact`, `/careers`, `/faq`.
3. **Golden interaction paths:**
   - Open hamburger → tap each link → drawer closes, page navigates.
   - Tap backdrop / close button / Escape key → drawer closes.
   - Submit Contact form in dev mode.
   - Toggle English / Suomeksi on the insight article.
   - Scroll home page on phone size — verify no snap fighting.
4. **Real-device smoke test** — after Vercel preview deploys, user opens preview URL on their own phone and confirms visually.
5. **Desktop regression** — at 1440×900, the site must be visually identical to current production (pixel-compare header, hero, products row, sections).

---

## 9. Out of scope

- Dark/light theme toggle.
- Any content changes (copy, images, article text).
- SEO metadata changes.
- New pages or new components other than `MobileNav`.
- Internationalisation beyond the existing Insights `LanguageToggle`.
- Performance work (image optimisation, bundle analysis) — separate effort.

---

## 10. Success criteria

- Every page renders cleanly at 375px wide with no horizontal scrollbar.
- Hamburger menu gives access to every nav destination + CTA on phones.
- Desktop experience at ≥1025px is pixel-identical to current production (manual compare).
- No hydration warnings, no console errors.
- Lighthouse mobile "best practices" and "accessibility" scores do not regress from current baseline.
