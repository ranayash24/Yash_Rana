"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Download } from "lucide-react";
import { hapticManager } from "@/lib/haptic-manager";
import { staggerItem } from "@/components/providers/motion-provider";

const roles = [
  "Full Stack Developer",
  "Data Scientist",
  "ML Engineer",
  "Researcher",
];

const containerVariants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
};

const letterVariants = {
  initial: { opacity: 0, y: 50, rotateX: -90 },
  animate: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const },
  },
};

type HeroSectionProps = { gameActive?: boolean };

export function HeroSection({ gameActive = false }: HeroSectionProps = {}) {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const scrollOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handleDownload = () => {
    hapticManager.medium();
    window.open("/resume.pdf", "_blank");
  };

  const firstName = "YASH";
  const lastName = "RANA";
  const firstNameArray = firstName.split("");
  const lastNameArray = lastName.split("");

  return (
    <motion.section
      ref={sectionRef}
      initial="initial"
      animate="animate"
      variants={containerVariants}
      style={{ opacity: scrollOpacity, scale, y }}
      className="relative flex h-[calc(100vh-5rem)] flex-col items-center justify-center overflow-hidden px-4 text-center"
    >
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute left-[10%] top-[20%] h-[500px] w-[500px] rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%)",
            filter: "blur(80px)",
            willChange: "transform",
          }}
          animate={{ x: [0, 100, 0], y: [0, -80, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[15%] top-[60%] h-[600px] w-[600px] rounded-full opacity-25"
          style={{
            background: "radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)",
            filter: "blur(100px)",
            willChange: "transform",
          }}
          animate={{ x: [0, -120, 0], y: [0, 100, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-7xl pt-12 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center mt-12 lg:mt-0">
          {/* Greeting */}
          <motion.div
            variants={staggerItem}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: gameActive ? 0.15 : 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 text-base font-light tracking-[0.4em] text-white/70 md:text-lg lg:text-xl"
          >
            HELLO, I&apos;M
          </motion.div>

          {/* Name with letter animation */}
          <motion.h1
            variants={staggerItem}
            className="mb-8 flex flex-col md:flex-row flex-wrap justify-center items-center gap-x-4 gap-y-1 text-4xl font-bold leading-[0.95] text-white lg:text-8xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            animate={{ opacity: gameActive ? 0.15 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <span className="flex flex-wrap justify-center items-center gap-x-2">
              {firstNameArray.map((letter, index) => (
                <motion.span
                  key={`first-${index}`}
                  variants={letterVariants}
                  custom={index}
                  whileHover={{ scale: 1.2, y: -10, transition: { duration: 0.2 } }}
                  className="inline-block"
                  style={{
                    color: isHovered && index % 3 === 0 ? "rgba(255,255,255,0.8)" : "white",
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </span>
            <span className="flex flex-wrap justify-center items-center gap-x-2">
              {lastNameArray.map((letter, index) => (
                <motion.span
                  key={`last-${index}`}
                  variants={letterVariants}
                  custom={firstNameArray.length + index}
                  whileHover={{ scale: 1.2, y: -10, transition: { duration: 0.2 } }}
                  className="inline-block"
                  style={{
                    color: isHovered && (firstNameArray.length + index) % 3 === 0
                      ? "rgba(255,255,255,0.8)"
                      : "white",
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          {/* Animated roles */}
          <motion.div
            variants={staggerItem}
            className="mb-10 flex items-center justify-center h-20 md:h-28 lg:h-32"
            animate={{ opacity: gameActive ? 0.15 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <AnimatedRoles currentIndex={currentRoleIndex} roles={roles} />
          </motion.div>

          {/* Description */}
          <motion.p
            variants={staggerItem}
            className="my-8 lg:mb-12 max-w-2xl mx-auto text-sm leading-relaxed text-white/50 md:text-base lg:text-lg px-4"
            animate={{ opacity: gameActive ? 0.15 : 0.5 }}
            transition={{ duration: 0.3 }}
          >
            Software developer and researcher building production-grade systems at the intersection
            of full-stack engineering and ML. MApCompSc @ Concordia · Montréal.
          </motion.p>

          {/* CTA */}
          <motion.div variants={staggerItem} className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <motion.button
              onClick={handleDownload}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              animate={{ opacity: gameActive ? 0.3 : 1 }}
              transition={{ duration: 0.3 }}
              className="group relative overflow-hidden rounded-lg border border-white/20 bg-white/5 px-8 py-4 text-base font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/10 md:px-10 md:py-5 md:text-lg"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
              <span className="relative z-10 flex items-center gap-3">
                <Download className="h-5 w-5 md:h-6 md:w-6" />
                <span>Download Resume</span>
              </span>
              <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-white"
                initial={{ width: "0%" }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

function AnimatedRoles({ currentIndex, roles }: { currentIndex: number; roles: string[] }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 flex-wrap mt-16 lg:mt-24">
      <span className="text-4xl font-light text-white/60 md:text-6xl lg:text-7xl xl:text-8xl whitespace-nowrap">
        I&apos;m a
      </span>
      <div className="relative w-full flex items-center justify-center text-center mb-16 lg:mb-36">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center mt-4 lg:mt-8"
          >
            <span className="text-4xl font-light text-white md:text-6xl lg:text-7xl xl:text-8xl whitespace-nowrap">
              {roles[currentIndex]}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
