"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import type { ActionState } from "../actions";

export function DeleteButton({
  action,
  label,
  confirmText,
}: {
  action: () => Promise<ActionState>;
  label: string;
  confirmText: string;
}) {
  const router = useRouter();
  const [pending, start] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      aria-label={label}
      title={label}
      onClick={() => {
        if (!window.confirm(confirmText)) return;
        start(async () => {
          const res = await action();
          if (res?.error) window.alert(res.error);
          else router.refresh();
        });
      }}
      className="rounded-btn inline-flex min-h-11 min-w-11 items-center justify-center text-red-700 hover:bg-red-50 disabled:opacity-50"
    >
      <Trash2 size={18} aria-hidden="true" />
    </button>
  );
}
