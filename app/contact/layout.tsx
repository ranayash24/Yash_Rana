import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Yash Rana about software development roles, AI and ML research, and engineering collaborations.",
  alternates: { canonical: "/contact" },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
