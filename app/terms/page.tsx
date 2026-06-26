import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of service — Croft",
};

export default function Terms() {
  return (
    <article className="prose-content legal py-16 sm:py-24">
      <h1>Terms of service</h1>
      <p className="text-fg4">Last updated 22 June 2026</p>

      <p>
        These terms govern your use of the Croft website and any services made
        available through it (the &ldquo;Services&rdquo;), operated by Croft Oy
        (&ldquo;Croft&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;). By using the
        Services you agree to these terms. If you do not agree, please do not use
        the Services.
      </p>

      <h2>Use of the Services</h2>
      <p>
        You may use the Services only in compliance with these terms and all
        applicable laws. You agree not to misuse the Services, interfere with
        their normal operation, or attempt to access them using a method other
        than the interface and instructions we provide.
      </p>

      <h2>Waitlist</h2>
      <p>
        Joining the waitlist registers your interest in Croft. It does not
        create any obligation on either party, does not guarantee access to any
        product, and may be changed or withdrawn at any time. We process the
        email address you provide as described in our{" "}
        <a href="/privacy">Privacy notice</a>.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The Services, including all text, design, and trademarks, are owned by
        Croft or its licensors and are protected by applicable laws. These terms
        do not grant you any right to use Croft&rsquo;s trademarks or branding.
      </p>

      <h2>Disclaimers</h2>
      <p>
        The Services are provided &ldquo;as is&rdquo; without warranties of any
        kind, to the fullest extent permitted by law. We do not warrant that the
        Services will be uninterrupted, error-free, or secure.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, Croft will not be liable for any
        indirect, incidental, or consequential damages arising from your use of
        the Services.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms from time to time. Material changes will be
        reflected by updating the date above. Continued use of the Services
        after changes take effect constitutes acceptance.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of Finland, without regard to
        conflict-of-law principles. Disputes are subject to the exclusive
        jurisdiction of the courts of Finland.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms can be sent to{" "}
        <a href="mailto:privacy@croft.fi">privacy@croft.fi</a>.
      </p>
    </article>
  );
}
