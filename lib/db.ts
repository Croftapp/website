import { neon } from "@neondatabase/serverless";

/** Whether the waitlist database is wired up. Without it, signups return a
 *  clear "not available" message instead of throwing. */
export function isConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

function getSql() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }
  // Neon's serverless driver runs over HTTP — no pool to manage, safe on the
  // edge runtime. The `waitlist_signups` table already exists (provisioned).
  return neon(process.env.DATABASE_URL);
}

export type SignupInput = {
  email: string;
  name: string | null;
  source: string | null;
  ipHash: string | null;
  userAgent: string | null;
};

export type AddResult = {
  alreadyJoined: boolean;
  /** Per-row unsubscribe handle. Null when alreadyJoined (no row inserted). */
  unsubToken: string | null;
};

/** Insert a signup (idempotent on duplicate email). Returns whether the email
 *  was already on the list (so the caller can skip a duplicate welcome email)
 *  and the new row's unsubscribe token. */
export async function addSignup(input: SignupInput): Promise<AddResult> {
  const sql = getSql();
  const rows = await sql`
    insert into waitlist_signups (email, name, source, consent, ip_hash, user_agent)
    values (${input.email}, ${input.name}, ${input.source}, true, ${input.ipHash}, ${input.userAgent})
    on conflict (email) do nothing
    returning unsub_token
  `;
  return {
    alreadyJoined: rows.length === 0,
    unsubToken: rows[0]?.unsub_token ?? null,
  };
}

/** Remove a signup by its unsubscribe token (GDPR erasure). Idempotent — a
 *  missing or unknown token is a no-op; we never reveal whether it existed. */
export async function unsubscribeByToken(token: string): Promise<void> {
  const sql = getSql();
  await sql`delete from waitlist_signups where unsub_token = ${token}`;
}
