import "server-only";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { connection } from "next/server";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const supabaseConfigured = Boolean(url && key);

/** Anonymous client with no session: safe inside "use cache" scopes. */
export function publicClient() {
  return createClient(url!, key!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/** Client bound to the visitor's auth cookies, for /admin pages and actions. */
export async function sessionClient() {
  // Session-bound work is always per request; keeps Supabase's clock reads out of prerendering.
  await connection();
  const store = await cookies();
  return createServerClient(url!, key!, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (list) => {
        try {
          for (const { name, value, options } of list)
            store.set(name, value, options);
        } catch {
          // Server Components cannot set cookies; the proxy refreshes the session instead.
        }
      },
    },
  });
}

/** Returns the signed-in admin, or null when the visitor is not an admin. */
export async function getAdmin() {
  if (!supabaseConfigured) return null;
  const supabase = await sessionClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: isAdmin } = await supabase.rpc("is_admin");
  return isAdmin ? { supabase, user } : null;
}
