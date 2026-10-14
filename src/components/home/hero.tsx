import Link from "next/link";
import { ArrowRight, BadgeCheck, CalendarDays, FolderCheck, MapPinned } from "lucide-react";
import { getDictionary } from "@/i18n/server";
import { localizePath, tr } from "@/i18n/config";
import { fmt } from "@/i18n/dictionaries";
import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { RotatingText } from "@/components/motion/rotating-text";
import { HeroMockup } from "./hero-mockup";
import { cn } from "@/lib/utils";

export async function Hero() {
  const { locale, t } = await getDictionary();
  const shots = projects.map((p) => ({ src: p.image.src, alt: tr(p.image.alt, locale), name: p.name, url: p.liveUrl }));
  const trustIcons = [BadgeCheck, CalendarDays, FolderCheck, MapPinned];
  const trust = t.hero.trust.map((s) => fmt(s, { n: site.stats.projectsCompleted }));
  const tagline = tr(site.tagline, locale)
    .split(". ")
    .map((w) => w.replace(/\.$/, ""));

  return (
    <section
      aria-labelledby="hero-title"
      className="on-dark bg-hero relative isolate overflow-hidden pt-32 pb-16 text-white sm:pt-36 lg:pt-44 lg:pb-24"
    >
      {/* Animated aurora + grid background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 size-[36rem] animate-aurora rounded-full bg-[#71c554]/25 blur-[110px]" />
        <div className="absolute top-20 -right-32 size-[32rem] animate-aurora rounded-full bg-[#2fa3ff]/30 blur-[110px] [animation-delay:-6s]" />
        <div className="absolute bottom-[-12rem] left-1/3 size-[30rem] animate-aurora rounded-full bg-[#2f9e60]/25 blur-[120px] [animation-delay:-12s]" />
        <div className="bg-grid absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black/10" />
      </div>

      <Container className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <div className="flex flex-col items-start gap-6">
          <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide text-white/95 sm:text-sm">
            <span aria-hidden="true" className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            {site.legalStatus} · {site.address.locality}, {site.address.district}
          </span>

          <h1
            id="hero-title"
            className="text-[2.5rem] leading-[1.08] font-extrabold tracking-tight text-white sm:text-6xl lg:text-[4.1rem]"
          >
            {t.hero.titleStart} <span className="text-highlight">{t.hero.titleHighlight}</span>
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl">{t.hero.subtitle}</p>

          <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white/80 backdrop-blur-sm sm:text-lg">
            <span className="mb-0.5 block text-xs font-semibold tracking-[0.16em] text-white/60 uppercase">{t.hero.rotatingPrefix}</span>
            <RotatingText items={t.hero.rotating} />
          </div>

          <ul aria-label={tr(site.tagline, locale)} className="flex flex-wrap items-center gap-2 text-sm font-semibold">
            {tagline.map((w, i) => (
              <li key={w} className="flex items-center gap-2">
                {i > 0 ? <span aria-hidden="true" className="size-1 rounded-full bg-white/40" /> : null}
                <span className="rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/15">{w}</span>
              </li>
            ))}
          </ul>

          <div className="mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link href={localizePath("/services", locale)} className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}>
              {t.hero.ctaPrimary}
              <ArrowRight className="transition-transform duration-200 group-hover/btn:translate-x-1" aria-hidden="true" />
            </Link>
            <Link
              href={localizePath("/contact", locale)}
              className={cn(buttonVariants({ variant: "glass", size: "lg" }), "w-full sm:w-auto")}
            >
              {t.hero.ctaSecondary}
            </Link>
          </div>
        </div>

        <HeroMockup shots={shots} badges={t.hero.badges} label={t.hero.mockupLabel} goToLabel={t.a11y.goToSlide} />
      </Container>

      <Container className="mt-16 lg:mt-20">
        <ul className="grid grid-cols-2 gap-3 rounded-3xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm sm:gap-4 lg:grid-cols-4">
          {trust.map((item, i) => {
            const TrustIcon = trustIcons[i];
            return (
              <li key={item} className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium text-white/90 sm:text-[0.95rem]">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-accent">
                  <TrustIcon className="size-5" aria-hidden="true" />
                </span>
                {item}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
