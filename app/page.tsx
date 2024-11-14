"use client";

import { AuthDialog } from "@/components/auth-dialog";
import { AuthViewType } from "@/lib/auth";
import { Supabase } from "@/lib/Supabase";
import { useState } from "react";

export default function Home() {
  const [isauthdialogopen, setisauthdialogopen] = useState(true);
  const [isauthview, setisauthview] = useState<AuthViewType>("sign_in");
  return (
    <main className="flex min-h-screen flex-col  max-h-screen">
      {Supabase && (
        <AuthDialog
          open={isauthdialogopen}
          setopen={setisauthdialogopen}
          supabase={Supabase}
          view={isauthview}
        />
      )}
      <div className="grid w-full md:grid-cols-2 gap-4">
        <div></div>
      </div>
    </main>
  );
}
