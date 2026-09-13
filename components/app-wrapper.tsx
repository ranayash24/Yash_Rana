"use client";

import { useState, useEffect, useCallback, lazy, Suspense } from "react";
import { LoadingScreen } from "@/components/loading-screen";
import { Navigation } from "@/components/navigation";
import { MotionProvider } from "@/components/providers/motion-provider";

import { SiteFooter } from "@/components/site-footer";
import Chatbot from "@/components/Chatbot";
import ScrollBar from "@/components/ScrollBar";

const MouseEffects = lazy(() =>
  import("@/components/mouse-effects").then((mod) => ({
    default: mod.MouseEffects,
  })),
);

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [showMouseEffects, setShowMouseEffects] = useState(false);
  const finishLoading = useCallback(() => setIsLoading(false), []);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setShowMouseEffects(true), 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <MotionProvider>
      {isLoading && <LoadingScreen onComplete={finishLoading} />}
      {showMouseEffects &&
        typeof window !== "undefined" &&
        window.matchMedia(
          "(min-width: 768px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        ).matches && (
          <Suspense fallback={null}>
            <div className="hidden md:block">
              <MouseEffects />
            </div>
          </Suspense>
        )}
      <div className="portfolio-shell flex min-h-dvh flex-col">
        <Navigation />
        <ScrollBar />
        <main id="main-content" tabIndex={-1} className="flex-1 w-full">
          {children}
        </main>
        <SiteFooter />
        <Chatbot />
      </div>
    </MotionProvider>
  );
}
