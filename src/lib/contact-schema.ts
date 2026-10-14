import { z } from "zod";

export type ContactMessages = {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
};

const defaultMessages: ContactMessages = {
  name: "Please enter your name.",
  phone: "Please enter a valid 10-digit mobile number.",
  email: "Please enter a valid email address.",
  service: "Please choose a service.",
  message: "Please add a few details.",
};

const normalisePhone = (v: string) => v.replace(/[\s()-]/g, "");

/** Visible form fields — used by the client form with localised messages. */
export function contactFieldsSchema(m: ContactMessages = defaultMessages) {
  return z.object({
    name: z.string().trim().min(2, m.name).max(80, m.name),
    phone: z
      .string()
      .trim()
      .refine((v) => /^(\+?91|0)?[6-9]\d{9}$/.test(normalisePhone(v)), m.phone),
    // Email is optional: many of our clients prefer phone/WhatsApp.
    email: z.union([z.literal(""), z.string().trim().email(m.email).max(120, m.email)]),
    service: z.string().min(1, m.service).max(80),
    budget: z.string().max(40),
    message: z.string().trim().min(10, m.message).max(2000, m.message),
    website: z.string(), // honeypot (validated on the server)
  });
}

/** Server-side schema: adds spam checks. */
export const contactServerSchema = contactFieldsSchema().extend({
  website: z.string().max(0), // honeypot must stay empty
  startedAt: z.number().int().nonnegative(), // ms timestamp when the user started typing
});

export type ContactFields = z.infer<ReturnType<typeof contactFieldsSchema>>;
export type ContactPayload = z.input<typeof contactServerSchema>;

export type ContactResult =
  | { ok: true }
  | { ok: false; error: "validation" | "rate_limited" | "server"; fields?: string[] };
