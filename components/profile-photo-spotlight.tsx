"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const PROFILE_SRC = "/profile.jpg";
const SPOTLIGHT_RADIUS = 100;

type ProfilePhotoSpotlightProps = {
  alt: string;
  className?: string;
};

export function ProfilePhotoSpotlight({ alt, className }: ProfilePhotoSpotlightProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [spot, setSpot] = useState({ x: 0, y: 0, active: false });

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setSpot({ x: e.clientX - r.left, y: e.clientY - r.top, active: true });
  }, []);

  const onLeave = useCallback(() => setSpot((s) => ({ ...s, active: false })), []);

  const mask = spot.active
    ? `radial-gradient(circle ${SPOTLIGHT_RADIUS}px at ${spot.x}px ${spot.y}px, transparent 0%, transparent 55%, rgba(0,0,0,0.35) 70%, black 100%)`
    : undefined;

  return (
    <div
      ref={wrapRef}
      className={cn(
        "relative w-[240px] max-w-full select-none overflow-hidden rounded-2xl border border-white/10 shadow-lg",
        className
      )}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <Image
        src={PROFILE_SRC}
        alt={alt}
        width={400}
        height={500}
        sizes="(max-width: 768px) 100vw, 240px"
        className="relative z-0 block h-auto w-full object-cover"
        priority
      />
      <Image
        src={PROFILE_SRC}
        alt=""
        width={400}
        height={500}
        sizes="(max-width: 768px) 100vw, 240px"
        className="pointer-events-none absolute left-0 top-0 z-10 h-full w-full object-cover grayscale"
        aria-hidden
        style={mask ? { WebkitMaskImage: mask, maskImage: mask } : undefined}
      />
    </div>
  );
}
