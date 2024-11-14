import { AuthViewType } from "@/lib/auth";
import { SupabaseClient } from "@supabase/supabase-js";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import AuthForm from "./Auth-form";

export function AuthDialog({
  supabase,
  view,
  open,
  setopen,
}: {
  open: boolean;
  setopen: (open: boolean) => void;
  supabase: SupabaseClient;
  view: AuthViewType;
}) {
  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogContent>
        <VisuallyHidden>
          <DialogTitle>Sign in to CodeCapsule</DialogTitle>
        </VisuallyHidden>
        <AuthForm supabase={supabase} view={view} />
      </DialogContent>
    </Dialog>
  );
}
