import { Resend } from "resend";

// `from` must be on a domain verified in Resend (the mail.croft.fi subdomain).
// `replyTo` can be any address — we point replies at the root inbox so people
// see and reach info@croft.fi.
const FROM = process.env.EMAIL_FROM ?? "Croft <info@mail.croft.fi>";
const REPLY_TO = process.env.EMAIL_REPLY_TO ?? "info@croft.fi";

// Base URL for links in transactional emails (e.g. unsubscribe).
const SITE_URL = process.env.SITE_URL ?? "https://croft.fi";

/** Whether transactional email is wired up. Without a key, signups still
 *  succeed — we just skip the welcome message. */
export function emailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

const SUBJECT = "Welcome to Croft";

function text(pageUrl: string): string {
  return `Thank you for joining.

You're now on the list for Croft — early to something we believe will come to matter.

We're building a personal intelligence that belongs to you: one that knows you, grows with you, and serves your goals over a lifetime. Not a generic assistant shared by millions, but an intelligence shaped around one person — their context, their values, and the life they're trying to build.

We'll only write when there's something real to share: early access, progress worth your attention, and the chance to help shape what Croft becomes.

We are one. We are Croft.

— The Croft team

—
You're receiving this because you joined the Croft waitlist. To unsubscribe: ${pageUrl}`;
}

function html(pageUrl: string): string {
  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background-color:#ffffff;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#ffffff;">
      <tr>
        <td align="center" style="padding:48px 24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">
            <tr>
              <td style="font-family:'Space Grotesk',Helvetica,Arial,sans-serif;font-size:24px;font-weight:700;letter-spacing:-0.02em;color:#16181c;padding-bottom:32px;">
                Croft
              </td>
            </tr>
            <tr>
              <td style="font-family:Georgia,'Times New Roman',serif;font-size:18px;line-height:1.7;color:#2a2d31;">
                <p style="margin:0 0 20px;">Thank you for joining.</p>
                <p style="margin:0 0 20px;">You&rsquo;re now on the list for Croft &mdash; early to something we believe will come to matter.</p>
                <p style="margin:0 0 20px;">We&rsquo;re building a personal intelligence that belongs to you: one that knows you, grows with you, and serves your goals over a lifetime. Not a generic assistant shared by millions, but an intelligence shaped around one person &mdash; their context, their values, and the life they&rsquo;re trying to build.</p>
                <p style="margin:0 0 20px;">We&rsquo;ll only write when there&rsquo;s something real to share: early access, progress worth your attention, and the chance to help shape what Croft becomes.</p>
                <p style="margin:0 0 4px;">We are one. We are Croft.</p>
                <p style="margin:0;color:#6a6f76;">&mdash; The Croft team</p>
              </td>
            </tr>
            <tr>
              <td style="padding-top:36px;">
                <hr style="border:none;border-top:1px solid #e3e0d8;margin:0 0 16px;" />
                <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:13px;line-height:1.6;color:#9a9ea3;">
                  You&rsquo;re receiving this because you joined the Croft waitlist.
                  <a href="${pageUrl}" style="color:#9a9ea3;">Unsubscribe</a>.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

/** Send the welcome email. Never throws — a failed send must not fail the
 *  signup; the caller logs and moves on. */
export async function sendWelcomeEmail(
  to: string,
  unsubToken: string
): Promise<void> {
  if (!emailConfigured()) return;
  const pageUrl = `${SITE_URL}/unsubscribe?token=${unsubToken}`;
  const oneClickUrl = `${SITE_URL}/api/unsubscribe?token=${unsubToken}`;
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: FROM,
    replyTo: REPLY_TO,
    to,
    subject: SUBJECT,
    text: text(pageUrl),
    html: html(pageUrl),
    headers: {
      // RFC 8058 one-click unsubscribe — surfaces Gmail/Apple Mail's native
      // unsubscribe button, which POSTs to the URL below.
      "List-Unsubscribe": `<${oneClickUrl}>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    },
  });
}
