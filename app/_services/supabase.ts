import { createClient } from "@supabase/supabase-js";

export const supabaseURL = process.env.SUPABASE_URL ?? "";

export const supabase = createClient(
  process.env.SUPABASE_ANON_KEY ?? "",
  supabaseURL
);
