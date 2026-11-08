import type { Tone } from "./site";
export const toneStyles: Record<
  Tone,
  { accent: string; tint: string; text: string; active: string }
> = {
  teal: {
    accent: "bg-teal",
    tint: "bg-teal-50",
    text: "text-teal-700",
    active: "bg-teal-700 text-white",
  },
  navy: {
    accent: "bg-navy",
    tint: "bg-navy-50",
    text: "text-navy",
    active: "bg-navy text-white",
  },
  lavender: {
    accent: "bg-lavender",
    tint: "bg-lavender-50",
    text: "text-navy",
    active: "bg-lavender text-navy",
  },
  yellow: {
    accent: "bg-yellow",
    tint: "bg-yellow-50",
    text: "text-navy",
    active: "bg-yellow text-navy",
  },
};
