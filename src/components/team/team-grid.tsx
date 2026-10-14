import Image from "next/image";
import { tr, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { mentors, team } from "@/content/team";
import { Icon } from "@/components/icon";
import { SectionHeader } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";

export function TeamGrid({ locale }: { locale: Locale }) {
  return (
    <RevealGroup className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-6">
      {team.map((m) => (
        <RevealItem key={m.name}>
          <figure className="group flex h-full flex-col items-center rounded-card border border-border bg-card p-4 text-center shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-lift sm:p-5">
            <div className="relative mb-4 aspect-square w-full max-w-36 overflow-hidden rounded-2xl bg-surface-2 ring-4 ring-sky-50 dark:ring-white/5">
              <Image
                src={m.photo.src}
                alt={m.name}
                fill
                sizes="(min-width: 1024px) 144px, 40vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <figcaption>
              <p className="font-semibold text-heading">{m.name}</p>
              <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">{tr(m.role, locale)}</p>
            </figcaption>
          </figure>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

export function Mentors({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <div className="mt-20">
      <SectionHeader
        as="h2"
        eyebrow={t.team.mentorsEyebrow}
        title={t.team.mentorsTitle}
        highlight={t.team.mentorsHighlight}
        subtitle={t.team.mentorsSubtitle}
      />
      <RevealGroup className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
        {mentors.map((m) => (
          <RevealItem key={tr(m.title, "en")}>
            <div className="on-dark bg-hero relative h-full overflow-hidden rounded-card p-7 text-white shadow-lift">
              <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-50" />
              <div className="relative flex gap-5">
                <span className="inline-flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-accent ring-1 ring-white/15">
                  <Icon name={m.icon} className="size-7" />
                </span>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-white">{tr(m.title, locale)}</h3>
                  <p className="text-sm leading-relaxed text-white/80">{tr(m.body, locale)}</p>
                </div>
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
