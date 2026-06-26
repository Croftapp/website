# Croft Website — Design Spec

**Date:** 2026-06-22
**Goal:** A restrained editorial marketing site for **Croft** — the world's first human model. Landing page, News, Join Us, and legal pages, plus a functional founding-member waitlist.

---

## 1. Design system

**Palette — light theme only** (no dark toggle):

| Token | Value | Use |
|---|---|---|
| `--bg` | `#FFFFFF` | page background |
| `--fg` | `#282828` | body text / primary |
| `--fg1` | `#3c3836` | |
| `--fg2` | `#504945` | |
| `--fg3` | `#6b6866` | muted text |
| `--fg4` | `#676767` | secondary / captions |
| `--fg5` | `#969696` | faint |
| `--gray` | `#817d79` | |
| `--hover-bg` | `rgba(128,128,128,0.12)` | hover wash |

No brand orange, no accent colours — monochrome, matching TM exactly. (The Croft deck's orange is intentionally dropped per direction.)

**Typography:**
- Serif (body + headings): `'Iowan Old Style BT', Georgia, serif` — TM's editorial voice.
- Sans (nav, buttons, labels): `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif` (TM's own fallback for the proprietary GT America, which we cannot license/ship).
- Scale: h1 `1.75rem`/700, h2 `1.45rem`/600, h3 `1.35rem`/normal; body `1.05rem`/1.5. Legal h1 = serif 600 / 30px.
- Header height `54px` (50px mobile). Centred content column, generous whitespace.

**Logo:** Croft knot mark recreated as crisp inline SVG (`public/croft-mark.svg`) — sharp at 54px nav size; user can override with their exact PNG. Wordmark "Croft" set in the sans stack.

---

## 2. Tech stack & structure

- **Next.js (App Router) + TypeScript + Tailwind CSS.**
- TM tokens wired as CSS variables in `globals.css` and mapped into `tailwind.config`.
- Deployable to Vercel; portable Postgres via `DATABASE_URL`.

```
app/
  layout.tsx            # html, fonts, Header + Footer wrapper
  page.tsx              # Landing
  news/page.tsx         # News (empty state)
  join-us/page.tsx      # Join Us
  terms/page.tsx        # Terms of service
  privacy/page.tsx      # Privacy notice
  gdpr/page.tsx         # GDPR
  api/waitlist/route.ts # POST signup
  api/waitlist/count/route.ts # GET count
components/
  Header.tsx            # logo + nav (News, Join us)
  Footer.tsx            # legal links + copyright + X
  Waitlist.tsx          # counter + CTA + email form (client component)
  CountUp.tsx           # animated count-up
  Logo.tsx              # inline SVG knot mark
  Section.tsx           # editorial content block
lib/
  db.ts                 # pg pool, ensure table, insert + count
  validateEmail.ts
public/croft-mark.svg
```

---

## 3. Pages & content

**Landing (`/`)** — mirrors TM's homepage rhythm (hero mission line → editorial sections → join CTA), using Croft deck copy:
1. Hero: "Croft is building the world's first human model — a new category of intelligence. Language models understand language. Reasoning models understand problems. Human models understand people."
2. *A continuous relationship, not a collection of conversations.* — continuous memory ("your story never resets"), reflection & cognition.
3. *Your intelligence should belong to you.* — sovereign intelligence; not engagement, not advertising, not platform incentives; European, user-controlled, sovereign infrastructure.
4. *The moat is the relationship.* — memory compounds; the relationship belongs to the user.
5. **Waitlist module** + closing line "Present for the moments that make a life. We are Croft."

**News (`/news`)** — empty state: heading + "No posts yet — we'll publish here soon." Layout ready for a post list later.

**Join Us (`/join-us`)** — adapted from TM: "Croft Lab is an artificial intelligence research and product company. We're building the human model — intelligence that understands people and belongs to them." + ethos + "We're hiring across research, engineering and design." + apply CTA (`mailto:` placeholder).

**Legal (`/terms`, `/privacy`, `/gdpr`)** — TM legal layout (serif h1, narrow column). Template copy tailored to **Croft Oy** (Finnish entity); clearly marked as boilerplate requiring legal review.

**Footer (all pages):** `Terms of service · Privacy notice · GDPR` + `©2026 Croft Oy` + "Follow us on X".

---

## 4. Waitlist mechanics

- Display: **"Join {count} others on the waitlist."** where `count = WAITLIST_SEED + realSignups`. Number animates up (eased count-up) on first paint. Monochrome.
- "Join now ›" pill (bg `--fg`, text `--bg`) reveals an inline email input → `POST /api/waitlist`.
- `GET /api/waitlist/count` → `{ count }` (seed + real).
- `POST /api/waitlist` → validate email, normalise (lowercase/trim), dedupe on unique constraint, insert, return new total. Success state: "You're on the list."
- **Storage:** Postgres via `pg` + `DATABASE_URL`. Table auto-created on first call:
  `waitlist(id serial pk, email text unique not null, created_at timestamptz default now())`.
- Env: `DATABASE_URL` (required), `WAITLIST_SEED` (integer base, default e.g. 0).
- Basic safety: email format validation, unique-violation handled gracefully (treated as success), trivial input length guard.

---

## 5. Out of scope (YAGNI)

Dark mode, real News CMS, analytics, i18n, auth, rate-limiting beyond basic guards, email confirmation/double-opt-in (can add later). Legal copy is boilerplate, not legal advice.
