"use client";

import { useActionState } from "react";
import { LoaderCircle } from "lucide-react";
import { signIn } from "../actions";
import { Field } from "../_components/fields";

export function LoginForm() {
  const [state, action, pending] = useActionState(signIn, undefined);
  return (
    <form action={action} className="mt-6 space-y-4">
      <Field label="Email">
        <input
          type="email"
          name="email"
          required
          autoComplete="username"
          className="admin-input"
        />
      </Field>
      <Field label="Kata sandi">
        <input
          type="password"
          name="password"
          required
          autoComplete="current-password"
          className="admin-input"
        />
      </Field>
      {state?.error && (
        <p
          role="alert"
          className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800"
        >
          {state.error}
        </p>
      )}
      <button type="submit" className="btn btn-navy w-full" disabled={pending}>
        {pending && (
          <LoaderCircle size={18} className="animate-spin" aria-hidden="true" />
        )}
        Masuk
      </button>
    </form>
  );
}
