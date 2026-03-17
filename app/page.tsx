import Cursor from '@/components/Cursor'
import ScrollBar from '@/components/ScrollBar'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import MarqueeBanner from '@/components/MarqueeBanner'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Research from '@/components/Research'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="relative">
      <Cursor />
      <ScrollBar />
      <Navbar />
      <Hero />
      <MarqueeBanner direction="left" items={['Full Stack Development', 'Machine Learning', 'Data Science', 'LLM Integration', 'NLP & Transformers', 'Distributed Systems', 'Cloud Architecture', 'Published Researcher']} />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <MarqueeBanner direction="right" items={['AWS Cloud', 'Azure Cognitive Services', 'Published in Atlantis Press', 'SSIP Hackathon Finalist', 'GitHub Pull Shark', 'Concordia University', '39 Public Repos', 'Open to Work']} />
      <Research />
      <Contact />
      <Footer />
    </main>
  )
}
