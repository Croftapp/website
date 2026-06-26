import { addSignup, isConfigured } from "@/lib/db";
import { sendWelcomeEmail } from "@/lib/email";
import { isValidEmail, normaliseEmail } from "@/lib/validateEmail";

export const runtime = "edge";
export const dynamic = "force-dynamic";

function json(obj: unknown, status = 200): Response {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json" },
  });
}

async function sha256(input: string): Promise<string> {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(input)
  );
  return [...new Uint8Array(buf)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  // Honeypot: bots fill the hidden field. Silently accept so they don't retry.
  if (body.company) return json({ ok: true });

  const rawEmail = body.email;
  if (typeof rawEmail !== "string" || !isValidEmail(rawEmail)) {
    return json({ error: "Please enter a valid email address." }, 400);
  }

  if (body.consent !== true) {
    return json({ error: "Please confirm you'd like to hear from us." }, 400);
  }

  if (!isConfigured()) {
    return json(
      { error: "The waitlist isn't available yet. Please try again soon." },
      503
    );
  }

  const email = normaliseEmail(rawEmail);
  const name =
    typeof body.name === "string" ? body.name.trim().slice(0, 200) || null : null;
  const source =
    typeof body.source === "string" ? body.source.slice(0, 100) || null : null;

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "";
  const ipHash = ip ? await sha256(ip + (process.env.IP_SALT ?? "")) : null;
  const userAgent = req.headers.get("user-agent")?.slice(0, 300) ?? null;

  try {
    const { alreadyJoined, unsubToken } = await addSignup({
      email,
      name,
      source,
      ipHash,
      userAgent,
    });

    // Only welcome genuinely new signups, and never let a mail failure break
    // the signup itself.
    if (!alreadyJoined && unsubToken) {
      try {
        await sendWelcomeEmail(email, unsubToken);
      } catch (err) {
        console.error("Welcome email failed:", err);
      }
    }

    return json({ ok: true, alreadyJoined });
  } catch {
    return json({ error: "Something went wrong. Please try again." }, 500);
  }
}
