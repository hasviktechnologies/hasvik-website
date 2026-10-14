"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { useForm, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { submitContact } from "@/app/actions/contact";
import { contactFieldsSchema, type ContactFields } from "@/lib/contact-schema";
import { whatsappLink } from "@/content/site";
import type { Dictionary } from "@/i18n/dictionaries";
import { buttonVariants } from "@/components/ui/button";
import { WhatsappGlyph } from "@/components/layout/whatsapp-fab";
import { cn } from "@/lib/utils";

type Option = { value: string; label: string };

type Props = {
  strings: Dictionary["contact"]["form"];
  validation: Dictionary["contact"]["validation"];
  techOptions: Option[];
  nonTechOptions: Option[];
  defaultService?: string;
};

const fieldOrder = ["name", "phone", "email", "service", "message"] as const;

export function ContactForm({ strings, validation, techOptions, nonTechOptions, defaultService = "" }: Props) {
  const schema = useMemo(() => contactFieldsSchema(validation), [validation]);
  const [pending, startTransition] = useTransition();
  const [sent, setSent] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);
  const startedAt = useRef(0);
  const [showSummary, setShowSummary] = useState(false);
  const [summaryFocusKey, setSummaryFocusKey] = useState(0);

  useEffect(() => {
    if (summaryFocusKey) summaryRef.current?.focus();
  }, [summaryFocusKey]);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    formState: { errors },
  } = useForm<ContactFields>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    shouldFocusError: false, // we manage focus: error summary (2+ errors) or the single invalid field
    defaultValues: { name: "", phone: "", email: "", service: defaultService, budget: "", message: "", website: "" },
  });

  const values = watch();
  const allOptions = [...techOptions, ...nonTechOptions];
  const waText = [
    "Hello HASVIK,",
    values.name && `Name: ${values.name}`,
    values.service && `Service: ${allOptions.find((o) => o.value === values.service)?.label ?? values.service}`,
    values.budget && `Budget: ${values.budget}`,
    values.message,
  ]
    .filter(Boolean)
    .join("\n");

  const onValid = (data: ContactFields) => {
    setShowSummary(false);
    startTransition(async () => {
      const res = await submitContact({ ...data, startedAt: startedAt.current });
      if (res.ok) {
        setSent(true);
        reset();
        toast.success(strings.success);
        return;
      }
      if (res.error === "validation" && res.fields) {
        for (const f of res.fields) if ((fieldOrder as readonly string[]).includes(f)) setError(f as (typeof fieldOrder)[number], { message: validation[f as keyof typeof validation] });
      }
      toast.error(res.error === "rate_limited" ? strings.rateLimited : strings.error);
    });
  };

  const onInvalid = (errs: FieldErrors<ContactFields>) => {
    const count = fieldOrder.filter((f) => errs[f]).length;
    if (count > 1) {
      setShowSummary(true);
      setSummaryFocusKey((k) => k + 1); // focus moves in the effect below, after the summary renders
    } else {
      setShowSummary(false);
      const first = fieldOrder.find((f) => errs[f]);
      if (first) document.getElementById(`cf-${first}`)?.focus();
    }
  };

  const input =
    "block w-full min-h-12 rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground shadow-sm transition-colors placeholder:text-muted-foreground/70 hover:border-brand-600/40 focus:border-brand-600 focus:outline-none focus:ring-4 focus:ring-brand-600/15 aria-[invalid=true]:border-red-600 aria-[invalid=true]:ring-red-600/15 dark:aria-[invalid=true]:border-red-400";
  const label = "mb-1.5 block text-sm font-semibold text-heading";
  const errorCls = "mt-1.5 text-sm font-medium text-red-700 dark:text-red-300";

  const Req = () => (
    <span className="text-red-700 dark:text-red-300">
      <span aria-hidden="true"> *</span>
      <span className="sr-only"> ({strings.required})</span>
    </span>
  );

  if (sent) {
    return (
      <div role="status" className="flex flex-col items-center gap-4 rounded-xl2 border border-accent/40 bg-eyebrow p-10 text-center">
        <CheckCircle2 className="size-14 text-accent-ink dark:text-accent" aria-hidden="true" />
        <p className="text-lg font-semibold text-heading">{strings.success}</p>
        <button type="button" onClick={() => setSent(false)} className={buttonVariants({ variant: "outline", size: "sm" })}>
          {strings.title}
        </button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onValid, onInvalid)}
      onFocusCapture={() => {
        // First interaction time, used by the server-side time trap.
        if (!startedAt.current) startedAt.current = Date.now();
      }}
      className="flex flex-col gap-5"
    >
      {showSummary ? (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-800 dark:border-red-400/40 dark:bg-red-950/40 dark:text-red-200">
          <p className="mb-2 font-semibold">{strings.errorSummary}</p>
          <ul className="list-inside list-disc">
            {fieldOrder
              .filter((f) => errors[f])
              .map((f) => (
                <li key={f}>
                  <a href={`#cf-${f}`} className="underline">
                    {errors[f]?.message}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      ) : null}

      {/* Honeypot — hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="cf-website">Website</label>
        <input id="cf-website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={label}>
            {strings.name}
            <Req />
          </label>
          <input id="cf-name" autoComplete="name" className={input} aria-invalid={!!errors.name} aria-describedby={errors.name ? "cf-name-err" : undefined} {...register("name")} />
          {errors.name ? <p id="cf-name-err" className={errorCls}>{errors.name.message}</p> : null}
        </div>
        <div>
          <label htmlFor="cf-phone" className={label}>
            {strings.phone}
            <Req />
          </label>
          <input id="cf-phone" type="tel" inputMode="tel" autoComplete="tel" className={input} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "cf-phone-err" : undefined} {...register("phone")} />
          {errors.phone ? <p id="cf-phone-err" className={errorCls}>{errors.phone.message}</p> : null}
        </div>
      </div>

      <div>
        <label htmlFor="cf-email" className={label}>
          {strings.email}
        </label>
        <input id="cf-email" type="email" inputMode="email" autoComplete="email" className={input} aria-invalid={!!errors.email} aria-describedby={errors.email ? "cf-email-err" : undefined} {...register("email")} />
        {errors.email ? <p id="cf-email-err" className={errorCls}>{errors.email.message}</p> : null}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-service" className={label}>
            {strings.service}
            <Req />
          </label>
          <select id="cf-service" className={cn(input, "appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10")} style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%235e6c82' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")" }} aria-invalid={!!errors.service} aria-describedby={errors.service ? "cf-service-err" : undefined} {...register("service")}>
            <option value="">{strings.servicePlaceholder}</option>
            <optgroup label={strings.serviceTech}>
              {techOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </optgroup>
            <optgroup label={strings.serviceNonTech}>
              {nonTechOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
              <option value="other">{strings.serviceOther}</option>
            </optgroup>
          </select>
          {errors.service ? <p id="cf-service-err" className={errorCls}>{errors.service.message}</p> : null}
        </div>
        <div>
          <label htmlFor="cf-budget" className={label}>
            {strings.budget}
          </label>
          <select id="cf-budget" className={cn(input, "appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10")} style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%235e6c82' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")" }} {...register("budget")}>
            <option value="">{strings.budgetPlaceholder}</option>
            {strings.budgets.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="cf-message" className={label}>
          {strings.message}
          <Req />
        </label>
        <textarea id="cf-message" rows={5} placeholder={strings.messagePlaceholder} className={cn(input, "resize-y")} aria-invalid={!!errors.message} aria-describedby={errors.message ? "cf-message-err" : "cf-privacy"} {...register("message")} />
        {errors.message ? <p id="cf-message-err" className={errorCls}>{errors.message.message}</p> : null}
      </div>

      <p id="cf-privacy" className="text-xs text-muted-foreground">
        {strings.privacy}
      </p>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="submit" disabled={pending} aria-disabled={pending} className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}>
          {pending ? <Loader2 className="animate-spin" aria-hidden="true" /> : <Send aria-hidden="true" />}
          {pending ? strings.sending : strings.submit}
        </button>
        <a href={whatsappLink(waText)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 text-sm font-semibold text-link hover:underline">
          <WhatsappGlyph className="size-4 text-[#1a9e4b]" />
          {strings.whatsappFallback}
        </a>
      </div>
    </form>
  );
}
