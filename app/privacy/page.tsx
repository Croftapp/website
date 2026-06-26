import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy notice — Croft",
};

export default function Privacy() {
  return (
    <article className="prose-content legal py-16 sm:py-24">
      <h1>Privacy notice</h1>
      <p className="text-fg4">Last updated 22 June 2026</p>

      <p>
        This notice explains how Croft Oy (&ldquo;Croft&rdquo;,
        &ldquo;we&rdquo;, &ldquo;us&rdquo;) collects and processes personal data
        through this website. Croft Oy is the data controller. For details of
        your rights under the EU General Data Protection Regulation, see our{" "}
        <a href="/gdpr">GDPR page</a>.
      </p>

      <h2>What we collect</h2>
      <p>
        When you join the waitlist, we collect the <strong>email address</strong>{" "}
        you provide and the date you joined. We may also collect limited
        technical data (such as aggregate, non-identifying usage information)
        needed to operate the site securely.
      </p>

      <h2>Why we use it</h2>
      <p>
        We use your email address to contact you about access to Croft and
        related updates. The legal basis is your consent, which you may withdraw
        at any time, and our legitimate interest in operating and securing the
        Services.
      </p>

      <h2>Sharing</h2>
      <p>
        We do not sell your personal data. We share it only with service
        providers that help us operate the Services (for example, hosting and
        database providers), under appropriate data-protection agreements, and
        where required by law.
      </p>

      <h2>Retention</h2>
      <p>
        We keep waitlist data until you ask us to remove it or it is no longer
        needed for the purpose it was collected.
      </p>

      <h2>Your rights</h2>
      <p>
        You can request access to, correction of, or deletion of your personal
        data, and you can withdraw consent at any time, by contacting{" "}
        <a href="mailto:privacy@croft.fi">privacy@croft.fi</a>. See the{" "}
        <a href="/gdpr">GDPR page</a> for the full list of rights.
      </p>

      <h2>Contact</h2>
      <p>
        For any privacy question, write to{" "}
        <a href="mailto:privacy@croft.fi">privacy@croft.fi</a>.
      </p>
    </article>
  );
}
