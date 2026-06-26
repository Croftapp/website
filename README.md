# Croft website

Marketing site for Croft — the world's first human model. Built with Next.js
(App Router) + TypeScript + Tailwind. A restrained editorial aesthetic (light
theme): white background, near-black text, serif body, system-sans UI chrome.

## Pages

- `/` — landing: mission hero, editorial sections, and the founding-member waitlist
- `/news` — news (empty state, ready for posts)
- `/join-us` — company / founding statement
- `/terms`, `/privacy`, `/gdpr` — legal pages (template copy — have counsel review)

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve production build
```

## Environment

Copy `.env.example` to `.env.local` and set:

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Neon Postgres **pooler** connection string (host contains `-pooler`). Required for waitlist signups. Writes to the existing `waitlist_signups` table. |
| `RESEND_API_KEY` | [Resend](https://resend.com) API key for the welcome email. Optional — without it, signups still succeed and the welcome email is skipped. |
| `EMAIL_FROM` | Sender identity for the welcome email, e.g. `Croft <info@croft.fi>`. The domain must be verified in Resend. |
| `IP_SALT` | Random string used to salt the hashed signup IP (privacy). |

Without `DATABASE_URL` the site still runs: the signup form returns a friendly
"not available yet" message.

## Waitlist API

`POST /api/waitlist` (edge runtime) — body `{ email, consent, name?, source?, company? }`:

- Validates email and requires `consent: true`.
- `company` is a honeypot — if filled, the request silently succeeds and stores nothing.
- De-duplicates on email (`ON CONFLICT DO NOTHING`), storing a hashed IP and user-agent.
- Sends a one-time welcome email to genuinely new signups (never blocks the signup).
- Returns `{ ok: true, alreadyJoined }`.

Read signups in the Neon SQL editor:

```sql
select email, name, source, created_at from waitlist_signups order by created_at desc;
```

## Logo

`public/croft-mark.png` is the Croft knot mark used in the header. Replace this
file to update the logo everywhere.

## Deploy (Vercel)

1. Push the repo to GitHub and import it into Vercel (Next.js is auto-detected).
2. Add the environment variables above in **Settings → Environment Variables**
   (`DATABASE_URL`, `RESEND_API_KEY`, `EMAIL_FROM`, `IP_SALT`). Never commit secrets.
3. Verify the `croft.fi` sending domain in Resend so the welcome email delivers.
4. Deploy. The `waitlist_signups` table is already provisioned in Neon — no DB setup needed.
