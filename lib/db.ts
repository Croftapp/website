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
};

/** Insert a signup (idempotent on duplicate email). Returns whether the email
 *  was already on the list, so the caller can skip a duplicate welcome email. */
export async function addSignup(input: SignupInput): Promise<AddResult> {
  const sql = getSql();
  const rows = await sql`
    insert into waitlist_signups (email, name, source, consent, ip_hash, user_agent)
    values (${input.email}, ${input.name}, ${input.source}, true, ${input.ipHash}, ${input.userAgent})
    on conflict (email) do nothing
    returning id
  `;
  return { alreadyJoined: rows.length === 0 };
}
