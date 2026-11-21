import { publicClient, supabaseConfigured } from "@/lib/supabase/server";

/**
 * Daily Vercel Cron hit (see vercel.json). Public pages are served from cache, so
 * without this the free Supabase project would see no queries and get paused.
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`)
    return new Response("Unauthorized", { status: 401 });
  if (!supabaseConfigured) return Response.json({ ok: false, reason: "no-db" });

  const { count, error } = await publicClient()
    .from("categories")
    .select("id", { count: "exact", head: true });
  if (error)
    return Response.json({ ok: false, error: error.message }, { status: 500 });
  return Response.json({ ok: true, categories: count });
}
