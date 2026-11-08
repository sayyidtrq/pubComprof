import {
  Store,
  BadgeDollarSign,
  Truck,
  FileCheck,
  Handshake,
} from "lucide-react";
const icons = {
  store: Store,
  badge: BadgeDollarSign,
  truck: Truck,
  file: FileCheck,
  handshake: Handshake,
};
export function FeatureCard({
  feature,
  number,
}: {
  feature: { title: string; text: string; icon: keyof typeof icons };
  number?: number;
}) {
  const Icon = icons[feature.icon];
  return (
    <article className="card h-full p-6">
      <div className="flex items-center justify-between">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
          <Icon size={24} strokeWidth={1.75} aria-hidden="true" />
        </span>
        {number && (
          <span className="chip bg-lavender-50 text-navy">
            {String(number).padStart(2, "0")}
          </span>
        )}
      </div>
      <h3 className="h-card mt-5">{feature.title}</h3>
      <p className="text-muted mt-3">{feature.text}</p>
    </article>
  );
}
