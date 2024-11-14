import { createClient } from "@supabase/supabase-js";

export const Supabase = process.env.NEXT_PUBLIC_ENABLE_SUPABSE
  ? createClient(
      process.env.NEXT_PUBLIC_SUPABSE_URL!,
      process.env.NEXT_PUBLIC_SUPABSE_ANON!
    )
  : undefined;
