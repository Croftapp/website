import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Croft — FAQ",
};

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
