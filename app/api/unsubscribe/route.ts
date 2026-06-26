import { isConfigured, unsubscribeByToken } from "@/lib/db";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function json(obj: unknown, status = 200): Response {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json" },
  });
}

// POST handles both the confirmation page's fetch and mail-client one-click
// (RFC 8058) unsubscribe requests.
export async function POST(req: Request) {
  const token = new URL(req.url).searchParams.get("token");
  if (!token || !UUID_RE.test(token)) {
    return json({ error: "Invalid unsubscribe link." }, 400);
  }

  if (!isConfigured()) {
    return json({ error: "Unsubscribe isn't available right now." }, 503);
  }

  try {
    await unsubscribeByToken(token);
    // Always succeed for a valid-format token — don't reveal whether it existed.
    return json({ ok: true });
  } catch {
    return json({ error: "Something went wrong. Please try again." }, 500);
  }
}
