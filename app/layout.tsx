import { siteUrl, siteIndexable } from "@/lib/site-url";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AppWrapper } from "@/components/app-wrapper";

const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  title: {
    default: "Yash Rana — Software Developer & AI / ML Portfolio",
    template: "%s | Yash Rana",
  },
  description:
    "Portfolio of Yash Rana — Applied ML and generative AI developer, Concordia graduate, and Technical Specialist at GEXEL in Montréal. Explore multimodal RAG, NLP, and full-stack engineering.",
  keywords: [
    "Yash Rana",
    "portfolio",
    "full stack developer",
    "data scientist",
    "machine learning",
    "React",
    "Next.js",
    "TypeScript",
    "Concordia University",
  ],
  authors: [{ name: "Yash Rana" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Yash Rana — Portfolio",
    description: "Full Stack Developer · Data Scientist · ML Engineer",
    siteName: "Yash Rana Portfolio",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Yash Rana — Intelligence in motion",
      },
    ],
  },
  robots: { index: siteIndexable, follow: siteIndexable },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
