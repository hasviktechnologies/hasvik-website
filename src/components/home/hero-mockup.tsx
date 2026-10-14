"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { BadgeCheck, Rocket, Star } from "lucide-react";
import { cn } from "@/lib/utils";

type Shot = { src: string; alt: string; name: string; url: string };

/** 3D-tilted browser mockup cycling real project screenshots, with floating glass badges. */
export function HeroMockup({ shots, badges, label, goToLabel }: { shots: Shot[]; badges: string[]; label: string; goToLabel: string }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (paused || reduce) return;
    const id = setInterval(() => setActive((i) => (i + 1) % shots.length), 3600);
    return () => clearInterval(id);
  }, [paused, reduce, shots.length]);

  const badgeIcons = [BadgeCheck, Star, Rocket];
  const badgePos = ["-left-3 top-[14%] sm:-left-8", "-right-2 top-[44%] sm:-right-6", "left-[8%] -bottom-6 sm:left-[14%]"];

  return (
    <figure
      aria-label={label}
      className="relative mx-auto w-full max-w-xl [perspective:1600px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative">
      <div aria-hidden="true" className="absolute -inset-8 rounded-[2.5rem] bg-accent/25 blur-3xl" />
      <div className="relative rounded-2xl border border-white/20 bg-white/10 p-2 shadow-[0_40px_80px_-24px_rgb(2_6_23/0.7)] backdrop-blur-md transition-transform duration-700 ease-out [transform:rotateY(-10deg)_rotateX(6deg)] hover:[transform:rotateY(-3deg)_rotateX(2deg)] motion-reduce:[transform:none]">
        <div className="overflow-hidden rounded-xl bg-white">
          <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-3 py-2">
            <span aria-hidden="true" className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
            </span>
            <span className="ml-2 flex min-w-0 flex-1 items-center gap-1.5 truncate rounded-md bg-white px-2.5 py-1 text-[11px] text-slate-600 ring-1 ring-slate-200">
              <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-[#28c840]" />
              <span className="truncate">{shots[active].url.replace(/^https?:\/\//, "").replace(/\/$/, "")}</span>
            </span>
          </div>
          <div className="relative aspect-[16/9.5] bg-slate-100">
            {shots.map((s, i) => (
              <Image
                key={s.src}
                src={s.src}
                alt={i === active ? s.alt : ""}
                aria-hidden={i !== active}
                fill
                priority={i === 0}
                sizes="(min-width: 1024px) 560px, 92vw"
                className={cn(
                  "object-cover object-top transition-[opacity,transform] duration-700 ease-out",
                  i === active ? "scale-100 opacity-100" : "scale-[1.03] opacity-0",
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {badges.map((b, i) => {
        const BadgeIcon = badgeIcons[i % badgeIcons.length];
        return (
          <div
            key={b}
            className={cn(
              "glass absolute z-10 flex items-center gap-2 rounded-2xl px-3 py-2 text-xs font-semibold text-white shadow-lg animate-float sm:px-4 sm:py-2.5 sm:text-sm",
              badgePos[i % badgePos.length],
            )}
            style={{ animationDelay: `${i * 1.3}s` }}
          >
            <span className="inline-flex size-7 items-center justify-center rounded-full bg-accent text-brand-950">
              <BadgeIcon className="size-4" aria-hidden="true" />
            </span>
            {b}
          </div>
        );
      })}
      </div>

      <figcaption className="mt-12 flex justify-center gap-1.5">
        {shots.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => {
              setActive(i);
              setPaused(true);
            }}
            aria-label={`${goToLabel} ${i + 1}: ${s.name}`}
            aria-current={i === active ? "true" : undefined}
            className="group inline-flex h-6 items-center px-0.5"
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
