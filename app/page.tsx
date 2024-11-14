"use client";

import { AuthDialog } from "@/components/auth-dialog";
import { Navbar } from "@/components/Navbar";
import { AuthViewType, UseAuth } from "@/lib/auth";
import { Supabase } from "@/lib/Supabase";
import { useState } from "react";

export default function Home() {
  const [isauthdialogopen, setisauthdialogopen] = useState(false);
  const [isauthview, setisauthview] = useState<AuthViewType>("sign_in");
  const { session } = UseAuth(setisauthdialogopen, setisauthview);

  function logout() {
    Supabase
      ? Supabase.auth.signOut()
      : console.warn("supabase not initialized");
  }

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
        <div>
          <Navbar
            session={session}
            showlogin={() => setisauthdialogopen(true)}
            signout={logout}
          />
        </div>
      </div>
    </main>
  );
}
