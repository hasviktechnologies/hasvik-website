import { tr, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { processSteps } from "@/content/services";
import { Icon } from "@/components/icon";
import { SectionHeader } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";

export function ProcessStrip({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <div>
      <SectionHeader
        eyebrow={t.services.processEyebrow}
        title={t.services.processTitle}
        highlight={t.services.processHighlight}
        subtitle={t.services.processSubtitle}
      />
      <RevealGroup className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div
          aria-hidden="true"
          className="absolute top-9 right-[10%] left-[10%] hidden h-0.5 bg-gradient-to-r from-brand-600/20 via-accent to-brand-600/20 lg:block"
        />
        {processSteps.map((step, i) => (
          <RevealItem key={tr(step.title, "en")} className="relative">
            <div className="flex h-full flex-col items-center rounded-card border border-border bg-card p-6 text-center shadow-soft">
              <span className="relative mb-4 inline-flex size-[4.5rem] items-center justify-center rounded-full bg-gradient-to-br from-brand-900 to-brand-600 text-white ring-8 ring-background">
                <Icon name={step.icon} className="size-7" />
                <span className="absolute -top-1 -right-1 inline-flex size-7 items-center justify-center rounded-full bg-accent text-xs font-bold text-brand-950">
                  {i + 1}
                </span>
              </span>
              <h3 className="mb-1 text-lg font-semibold">{tr(step.title, locale)}</h3>
              <p className="text-sm text-muted-foreground">{tr(step.body, locale)}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
