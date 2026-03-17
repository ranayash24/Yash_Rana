import type { Metadata } from 'next'
import { Space_Grotesk, Space_Mono } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/components/SmoothScroll'

const spaceSans = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Yash Rana — Software Developer & Data Scientist',
  description: 'Portfolio of Yash Rana — Full Stack Developer, Data Scientist, and ML Engineer. Master\'s student at Concordia University, Montréal.',
  keywords: 'Yash Rana, Software Developer, Data Scientist, Machine Learning, Full Stack, Concordia University, Montreal',
  openGraph: {
    title: 'Yash Rana — Software Developer & Data Scientist',
    description: 'Full Stack Developer · Data Scientist · ML Engineer — Building intelligent, production-grade systems.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceSans.variable} ${spaceMono.variable}`}>
      <body>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
