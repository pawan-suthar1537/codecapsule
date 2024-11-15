"use client";

import { AuthDialog } from "@/components/auth-dialog";
import Chat from "@/components/chat";
import { ChatPicker } from "@/components/chat-picker";
import ChatInput from "@/components/chatinput";
import { Navbar } from "@/components/Navbar";
import { AuthViewType, UseAuth } from "@/lib/auth";
import { Supabase } from "@/lib/Supabase";
import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import modelsList from "@/lib/models.json";

export default function Home() {
  const [isauthdialogopen, setisauthdialogopen] = useState(false);
  const [isauthview, setisauthview] = useState<AuthViewType>("sign_in");
  const { session } = UseAuth(setisauthdialogopen, setisauthview);
  const [chatinput, setchatinput] = useLocalStorage("chat", "");
  const [file, setfile] = useState<File[]>([]);
  const [selectedtemplate, setselectedtemplate] = useState<"auto">("auto");
  const [languagemodel, setlanguagemodel] = useLocalStorage("languagemodel", {
    model: "gpt-4o-mini",
  });

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
      <div className="grid w-full md:grid-cols-2 ">
        <div className="flex flex-col w-full max-w-[800px] mx-auto px-4 overflow-hidden col-span-2 h-screen">
          <Navbar
            session={session}
            showlogin={() => setisauthdialogopen(true)}
            signout={logout}
          />

          <div className="flex-1 overflow-y-auto">
            <Chat />
          </div>

          <div className="mt-auto">
            <ChatInput
              isloading={false}
              input={chatinput}
              handleinputchange={() => {}}
              handleinputsubmit={() => {}}
              handlefilechange={() => {}}
              file={file}
              error={undefined}
              retry={() => {}}
              ismultomodel={false}
              stop={() => {}}
            >
              <ChatPicker models={modelsList.models} />
            </ChatInput>
          </div>
        </div>
      </div>
    </main>
  );
}
