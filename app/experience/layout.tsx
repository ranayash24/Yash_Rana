import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Experience",
  description:
    "Data science, analytics, and full-stack development experience at GEXEL Telecom International, Blue Data Consulting, The Sparks Foundation, and DevTown.",
  alternates: { canonical: "/experience" },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
