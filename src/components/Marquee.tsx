import { marquee } from "@/content/site";
export function Marquee() {
  return (
    <div className="marquee bg-navy overflow-hidden py-4 text-white">
      <div className="marquee-track">
        {[false, true].map((copy) => (
          <div
            key={String(copy)}
            aria-hidden={copy || undefined}
            className="flex shrink-0 items-center whitespace-nowrap"
          >
            {marquee.map((text) => (
              <span key={text} className="flex items-center gap-8 pr-8">
                <span>{text}</span>
                <span
                  aria-hidden="true"
                  className="bg-yellow h-1.5 w-1.5 shrink-0 rounded-full"
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
