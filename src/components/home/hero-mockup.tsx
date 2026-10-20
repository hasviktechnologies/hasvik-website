"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Shot = { src: string; alt: string };

/** Carousel of the recently delivered project's screenshots. */
export function HeroMockup({
  shots,
  label,
  goToLabel,
  recentlyDeliveredLabel,
}: {
  shots: Shot[];
  label: string;
  goToLabel: string;
  recentlyDeliveredLabel: string;
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (paused || reduce) return;
    const id = setInterval(() => setActive((i) => (i + 1) % shots.length), 3600);
    return () => clearInterval(id);
  }, [paused, reduce, shots.length]);

  return (
    <figure
      aria-label={label}
      className="relative mx-auto w-full max-w-md"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div aria-hidden="true" className="absolute -inset-8 rounded-[2.5rem] bg-accent/25 blur-3xl" />
      <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-2 shadow-[0_40px_80px_-24px_rgb(2_6_23/0.7)] backdrop-blur-md">
        <div className="relative aspect-3/4 overflow-hidden rounded-2xl bg-white/10">
          <span className="absolute top-3 left-3 z-10 rounded-full bg-accent-500 px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
            {recentlyDeliveredLabel}
          </span>
          {shots.map((s, i) => (
            <Image
              key={s.src}
              src={s.src}
              alt={i === active ? s.alt : ""}
              aria-hidden={i !== active}
              fill
              priority={i === 0}
              sizes="(min-width: 1024px) 448px, 92vw"
              className={cn(
                "object-cover object-top transition-[opacity,transform] duration-700 ease-out",
                i === active ? "scale-100 opacity-90" : "scale-[1.03] opacity-0",
              )}
            />
          ))}
        </div>
      </div>

      <figcaption className="mt-4 flex justify-center gap-1.5">
        {shots.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => {
              setActive(i);
              setPaused(true);
            }}
            aria-label={`${goToLabel} ${i + 1}: ${s.alt}`}
            aria-current={i === active ? "true" : undefined}
            className="group inline-flex h-6 min-w-6 items-center justify-center"
          >
            <span
              className={cn(
                "block h-1.5 rounded-full transition-all duration-300",
                i === active ? "w-7 bg-accent" : "w-2.5 bg-white/40 group-hover:bg-white/70",
              )}
            />
          </button>
        ))}
      </figcaption>
    </figure>
  );
}
