import type { ComponentProps, ReactNode } from "react";

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="admin-label">{label}</span>
      {children}
      {hint && <span className="text-muted mt-1 block text-xs">{hint}</span>}
    </label>
  );
}

export function TextInput(props: ComponentProps<"input">) {
  return <input type="text" {...props} className="admin-input" />;
}

export function TextArea(props: ComponentProps<"textarea">) {
  return <textarea rows={4} {...props} className="admin-input" />;
}

export function Select(props: ComponentProps<"select">) {
  return <select {...props} className="admin-input" />;
}

export function Notice({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <p
      role="status"
      className="mb-5 rounded-lg bg-teal-50 px-4 py-3 text-sm font-semibold text-teal-700"
    >
      {text}
    </p>
  );
}
