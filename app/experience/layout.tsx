import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Experience",
  description:
    "Backend development, AI-enabled workflows, and enterprise software engineering experience at Kofax, Coupa Software, and Advanced.",
  alternates: { canonical: "/experience" },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
