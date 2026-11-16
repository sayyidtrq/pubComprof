import { MessageCircle } from "lucide-react";
import { site, ui } from "@/content/site";
export function FloatingContact() {
  const { href } = site.contact.whatsapp[0];
  return (
    <a
      href={href}
      aria-label={ui.whatsapp}
      className="shadow-card-hover fixed right-[calc(0.75rem+env(safe-area-inset-right))] bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-30 inline-flex min-h-12 min-w-12 items-center justify-center gap-2 rounded-full border-2 border-white bg-teal-700 p-3 text-white min-[1740px]:px-5"
    >
      <MessageCircle size={22} aria-hidden="true" />
      <span className="font-heading hidden text-sm font-semibold min-[1740px]:inline">
        {ui.whatsapp}
      </span>
    </a>
  );
}
