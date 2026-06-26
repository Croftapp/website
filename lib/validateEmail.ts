// Pragmatic email validation: good enough to catch typos and junk without
// rejecting valid-but-unusual addresses.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normaliseEmail(input: string): string {
  return input.trim().toLowerCase();
}

export function isValidEmail(input: string): boolean {
  const email = normaliseEmail(input);
  return email.length >= 5 && email.length <= 254 && EMAIL_RE.test(email);
}
