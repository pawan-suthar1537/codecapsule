import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Supabase } from "./Supabase";
import { usePostHog } from "posthog-js/react";

export type AuthViewType =
  | "sign_in"
  | "sign_up"
  | "magic_link"
  | "forgotten_password"
  | "update_password"
  | "verify_otp";

export function UseAuth(
  setAuthdialog: (value: boolean) => void,
  setAuthView: (value: AuthViewType) => void
) {
  const [session, setSession] = useState<Session | null>(null);
  const posthog = usePostHog();
  let recovery = false;

  useEffect(() => {
    if (!Supabase) {
      console.warn("Supabase not initialized");
      return setSession({ user: { email: "test@gmail.com" } } as Session);
    }
    Supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        posthog.identify(session?.user?.id, {
          email: session?.user?.email,
          supabase_id: session?.user?.id,
        });
        posthog.capture("sign_in");
      }
    });

    const {
      data: { subscription },
    } = Supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (event === "PASSWORD_RECOVERY") {
        recovery = true;
        setAuthView("update_password");
        setAuthdialog(true);
      }
      if (event === "USER_UPDATED" && recovery) {
        recovery = false;
      }
      if (event === "SIGNED_IN" && !recovery) {
        setAuthdialog(false);
        posthog.identify(session?.user?.id, {
          email: session?.user?.email,
          supabase_id: session?.user?.id,
        });
        posthog.capture("sign_in");
      }
      if (event === "SIGNED_OUT") {
        setAuthView("sign_in");
        posthog.capture("sign_out");
        posthog.reset();
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  return { session };
}
