import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore all 19 projects across machine learning, real-time applications, distributed systems, and software engineering.",
  alternates: { canonical: "/projects" },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
