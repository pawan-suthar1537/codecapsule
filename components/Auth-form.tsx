import { AuthViewType } from "@/lib/auth";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { SupabaseClient } from "@supabase/supabase-js";

function AuthForm({
  supabase,
  view,
}: {
  supabase: SupabaseClient;
  view: AuthViewType;
}) {
  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className="flex items-center gap-4 text-xl font-bold mb-2 w-full">
        Sign in to CodeCapsule
      </h1>
      <div className="w-full">
        <Auth
          supabaseClient={supabase}
          view={view}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "#000000",
                  brandAccent: "#000000",
                },
                radii: {
                  borderRadiusButton: "0.7rem",
                  inputBorderRadius: "0.7rem",
                },
              },
            },
          }}
          localization={{
            variables: {
              sign_in: {
                email_label: "Email",
                password_label: "Password",
              },
            },
          }}
          theme="default"
          showLinks={true}
          providers={["google", "github"]}
          providerScopes={{
            github: "email",
          }}
        />
      </div>
    </div>
  );
}

export default AuthForm;
