import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "About",
  description:
    "Background, education, and technical skills of Yash Rana, a Concordia Master of Applied Computer Science graduate.",
  alternates: { canonical: "/about" },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
