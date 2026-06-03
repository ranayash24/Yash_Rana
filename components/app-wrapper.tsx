"use client";

import { useState, useEffect, lazy, Suspense } from "react";
import { LoadingScreen } from "@/components/loading-screen";
import { Navigation } from "@/components/navigation";
import { MotionProvider } from "@/components/providers/motion-provider";

const MouseEffects = lazy(() =>
  import("@/components/mouse-effects").then((mod) => ({ default: mod.MouseEffects }))
);

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [showMouseEffects, setShowMouseEffects] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setShowMouseEffects(true), 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <MotionProvider>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      {showMouseEffects && typeof window !== "undefined" &&
        window.matchMedia("(min-width: 768px)").matches && (
          <Suspense fallback={null}>
            <div className="hidden md:block">
              <MouseEffects />
            </div>
          </Suspense>
        )}
      <div className="flex min-h-dvh flex-col bg-black text-white">
        {!isLoading && <Navigation />}
        <main id="main-content" className="flex-1 w-full">
          {children}
        </main>
      </div>
    </MotionProvider>
  );
}
