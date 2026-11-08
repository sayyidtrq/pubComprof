import { Phone, MessageCircle } from "lucide-react";
import { site, ui } from "@/content/site";
export function FloatingContact() {
  const wa = site.contact.whatsappHref;
  const Icon = wa ? MessageCircle : Phone;
  const label = wa ? ui.whatsapp : ui.telephone;
  return (
    <a
      href={wa || site.contact.phoneHref}
      aria-label={label}
      className="shadow-card-hover fixed right-5 bottom-5 z-30 inline-flex min-h-12 min-w-12 items-center justify-center gap-2 rounded-full border-2 border-white bg-teal-700 p-3 text-white sm:px-5"
    >
      <Icon size={22} aria-hidden="true" />
      <span className="font-heading hidden text-sm font-semibold sm:inline">
        {label}
      </span>
    </a>
  );
}
