import {
  BadgeCheck,
  Briefcase,
  Code2,
  Database,
  GraduationCap,
  Keyboard,
  LayoutTemplate,
  LifeBuoy,
  MapPin,
  Megaphone,
  MessagesSquare,
  Monitor,
  Palette,
  PenTool,
  Rocket,
  ScanLine,
  Server,
  ShoppingBag,
  Wrench,
  type LucideProps,
} from "lucide-react";

// String keys keep content files serialisable (CMS-ready).
const registry = {
  layout: LayoutTemplate,
  "shopping-bag": ShoppingBag,
  "graduation-cap": GraduationCap,
  wrench: Wrench,
  "map-pin": MapPin,
  "badge-check": BadgeCheck,
  database: Database,
  briefcase: Briefcase,
  scan: ScanLine,
  keyboard: Keyboard,
  megaphone: Megaphone,
  palette: Palette,
  messages: MessagesSquare,
  "pen-tool": PenTool,
  code: Code2,
  rocket: Rocket,
  "life-buoy": LifeBuoy,
  monitor: Monitor,
  server: Server,
} as const;

export type IconName = keyof typeof registry;

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Cmp = registry[name];
  return <Cmp aria-hidden="true" {...props} />;
}
