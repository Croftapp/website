import type { Metadata } from "next";
import UnsubscribeConfirm from "@/components/UnsubscribeConfirm";

export const metadata: Metadata = {
  title: "Unsubscribe — Croft",
  robots: { index: false, follow: false },
};

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function Unsubscribe({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  const valid = typeof token === "string" && UUID_RE.test(token);

  return (
    <article className="prose-content legal py-16 sm:py-24">
      <h1>Unsubscribe</h1>
      {valid ? (
        <UnsubscribeConfirm token={token} />
      ) : (
        <p>
          This unsubscribe link is invalid or has expired. If you&rsquo;d like to
          be removed, write to <a href="mailto:privacy@croft.fi">privacy@croft.fi</a>.
        </p>
      )}
    </article>
  );
}
