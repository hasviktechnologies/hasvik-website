import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { getDictionary } from "@/i18n/server";
import { localizePath, tr } from "@/i18n/config";
import { featuredProjectSlug, getProject } from "@/content/projects";
import { buttonVariants } from "@/components/ui/button";
import { Container, Eyebrow, HighlightTitle } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";
import { BrowserCarousel } from "./browser-carousel";

/** Data-driven "Website Successfully Delivered!" banner. Change `featuredProjectSlug` to feature another project. */
export async function FeaturedProject({ slug = featuredProjectSlug }: { slug?: string }) {
  const { locale, t } = await getDictionary();
  const project = getProject(slug);
  if (!project?.caseStudy.gallery?.length) return null;
  const domain = new URL(project.liveUrl).host.replace(/^www\./, "");

  return (
    <section aria-labelledby="featured-title" className="on-dark bg-band relative isolate overflow-hidden py-20 text-white sm:py-24">
      <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10 opacity-60" />
      <div
        aria-hidden="true"
        className="absolute top-1/2 -right-40 -z-10 size-[34rem] -translate-y-1/2 rounded-full bg-accent/20 blur-[120px]"
      />
      <Container className="grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
        <Reveal className="flex flex-col items-start gap-5">
          <Eyebrow onDark>{t.featured.eyebrow}</Eyebrow>
          <HighlightTitle
            id="featured-title"
            start={t.featured.title}
            highlight={t.featured.highlight}
            className="text-3xl text-white sm:text-4xl lg:text-5xl"
          />
          <span aria-hidden="true" className="h-1 w-14 rounded-full bg-gradient-to-r from-accent to-accent-teal" />
          <p className="max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">{t.featured.body}</p>

          <dl className="mt-2 grid w-full max-w-lg grid-cols-3 gap-3">
            {t.featured.stats.map((s) => (
              <div key={s.label} className="flex flex-col rounded-2xl bg-white/8 p-4 text-center ring-1 ring-white/12">
                <dt className="order-2 mt-1 text-xs text-white/75 sm:text-sm">{s.label}</dt>
                <dd className="order-1 text-2xl font-bold text-[#9be47f] sm:text-3xl">{s.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-3 flex flex-wrap gap-3">
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={buttonVariants()}>
              {t.featured.visit}
              <ExternalLink aria-hidden="true" />
              <span className="sr-only">{t.a11y.external}</span>
            </a>
            <Link href={localizePath(`/work/${project.slug}`, locale)} className={cn(buttonVariants({ variant: "glass" }))}>
              {t.featured.caseStudy}
              <ArrowRight className="transition-transform group-hover/btn:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <BrowserCarousel
            domain={domain}
            slides={project.caseStudy.gallery.map((g) => ({
              src: g.src,
              width: g.width,
              height: g.height,
              alt: tr(g.alt, locale),
              caption: tr(g.caption, locale),
              href: g.href,
            }))}
            strings={{
              previous: t.a11y.previous,
              next: t.a11y.next,
              pause: t.a11y.pause,
              play: t.a11y.play,
              goToSlide: t.a11y.goToSlide,
              live: t.featured.live,
              external: t.a11y.external,
            }}
          />
        </Reveal>
      </Container>
    </section>
  );
}
