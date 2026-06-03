import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { AppWrapper } from '@/components/app-wrapper'

const geistSans = Inter({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = JetBrains_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'Yash Rana — Portfolio',
    template: '%s | Yash Rana',
  },
  description: 'Portfolio of Yash Rana — Full Stack Developer, Data Scientist, and ML Engineer. Master\'s student at Concordia University, Montréal.',
  keywords: ['Yash Rana', 'portfolio', 'full stack developer', 'data scientist', 'machine learning', 'React', 'Next.js', 'TypeScript', 'Concordia University'],
  authors: [{ name: 'Yash Rana' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Yash Rana — Portfolio',
    description: 'Full Stack Developer · Data Scientist · ML Engineer',
    siteName: 'Yash Rana Portfolio',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  )
}
