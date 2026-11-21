"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type ReactNode, useActionState, useEffect } from "react";
import { LoaderCircle } from "lucide-react";
import type { ActionState } from "../actions";

/** Form shell for create/edit: shows errors inline and returns to the list on success. */
export function AdminForm({
  action,
  title,
  backHref,
  children,
}: {
  action: (state: ActionState, form: FormData) => Promise<ActionState>;
  title: string;
  backHref: string;
  children: ReactNode;
}) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(action, undefined);

  useEffect(() => {
    if (state?.ok)
      router.replace(`${backHref}?pesan=${encodeURIComponent(state.ok)}`);
  }, [state, backHref, router]);

  return (
    <form action={formAction} className="card space-y-4 p-5 sm:p-6">
      <h2 className="h-card">{title}</h2>
      {children}
      {state?.error && (
        <p
          role="alert"
          className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800"
        >
          {state.error}
        </p>
      )}
      <div className="flex flex-wrap gap-2 pt-2">
        <button type="submit" className="btn btn-navy" disabled={pending}>
          {pending && (
            <LoaderCircle
              size={18}
              className="animate-spin"
              aria-hidden="true"
            />
          )}
          Simpan
        </button>
        <Link href={backHref} className="btn btn-secondary">
          Batal
        </Link>
      </div>
    </form>
  );
}
