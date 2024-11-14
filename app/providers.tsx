"use client";

import { ThemeProviderProps } from "next-themes";
import posthog from "posthog-js";
import { PostHogProvider as PosthogProviderJs } from "posthog-js/react";
import { ThemeProvider as NextThemesPRovider } from "next-themes";

if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_ENABLE_POSTHOG) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY ?? "", {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,

    person_profiles: "identified_only",

    session_recording: {
      recordCrossOriginIframes: true,
    },
  });
}

export function PosthogProvider({ children }: { children: React.ReactNode }) {
  return process.env.NEXT_PUBLIC_ENABLE_POSTHOG ? (
    <PosthogProviderJs client={posthog}>{children}</PosthogProviderJs>
  ) : (
    <>{children}</>
  );
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesPRovider {...props}>{children}</NextThemesPRovider>;
}
