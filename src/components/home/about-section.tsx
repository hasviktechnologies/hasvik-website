import Link from "next/link";
import { ArrowRight, Award, Flag, HandCoins, Sparkles, Sprout, Users } from "lucide-react";
import { getDictionary } from "@/i18n/server";
import { localizePath, tr } from "@/i18n/config";
import { getProject } from "@/content/projects";
import { Container, Section, SectionHeader } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { BrandVisual } from "./brand-visual";

export async function AboutSection() {
  const { locale, t } = await getDictionary();
  const lr = getProject("lr-engineering-solutions")!;
  const rm = getProject("rm-suncity-public-school")!;
  const valueIcons = [Sparkles, Sprout, Users, HandCoins];
  const timelineIcons = [Flag, Award];

  return (
    <Section id="about" aria-labelledby="about-title">
      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal className="order-2 lg:order-1">
          <BrandVisual
            caption={t.about.visualCaption}
            laptop={{ src: lr.image.src, alt: tr(lr.image.alt, locale) }}
            phone={{ src: rm.caseStudy.gallery![0].src, alt: tr(rm.caseStudy.gallery![0].alt, locale) }}
          />
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionHeader
            align="left"
            id="about-title"
            eyebrow={t.about.eyebrow}
            title={t.about.title}
            highlight={t.about.highlight}
            titleEnd={t.about.titleEnd}
          />
          <Reveal className="-mt-6 flex flex-col gap-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
          </Reveal>

          <ol className="relative mt-8 flex flex-col gap-5 border-l-2 border-dashed border-border pl-6">
            {t.about.timeline.map((item, i) => {
              const TlIcon = timelineIcons[i % timelineIcons.length];
              return (
                <li key={item.date} className="relative">
                  <span className="absolute left-[-2.35rem] top-0 inline-flex size-8 items-center justify-center rounded-full bg-accent text-brand-950 ring-4 ring-background">
                    <TlIcon className="size-4" aria-hidden="true" />
                  </span>
                  <Reveal delay={i * 0.08}>
                    <p className="text-xs font-semibold uppercase tracking-wider text-eyebrow-foreground">{item.date}</p>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.body}</p>
                  </Reveal>
                </li>
              );
            })}
          </ol>

          <Reveal className="mt-8">
            <Link
              href={localizePath("/about", locale)}
              className="group inline-flex min-h-11 items-center gap-2 font-semibold text-link hover:underline"
            >
              {t.about.readMore}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </Container>

      <Container className="mt-16">
        <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.about.values.map((v, i) => {
            const VIcon = valueIcons[i];
            return (
              <RevealItem
                key={v.title}
                className="group rounded-card border border-border bg-card p-6 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-lift"
              >
                <span className="mb-4 inline-flex size-12 items-center justify-center rounded-2xl bg-sky-50 text-brand-700 transition-colors group-hover:bg-accent group-hover:text-brand-950 dark:bg-white/5 dark:text-accent">
                  <VIcon className="size-6" aria-hidden="true" />
                </span>
                <h3 className="mb-1.5 text-base font-semibold">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.body}</p>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </Section>
  );
}
