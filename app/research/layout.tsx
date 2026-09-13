import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Research & Achievements",
  description:
    "Published machine learning research, early diabetes detection, and Yash Rana’s academic and engineering achievements.",
  alternates: { canonical: "/research" },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
