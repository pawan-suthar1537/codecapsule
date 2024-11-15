import {
  ArrowRight,
  MoonIcon,
  RefreshCcw,
  SunIcon,
  Trash,
  Undo,
} from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { Session } from "@supabase/supabase-js";
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function Navbar({
  session,
  showlogin,
  signout,
  onclear,
  canclear,
  onsocialclick,
  onundo,
  canundo,
}: {
  session: Session | null;
  showlogin: () => void;
  signout: () => void;
  onclear: () => void;
  canclear: boolean;
  onsocialclick: (target: "github" | "X" | "discord") => void;
  onundo: () => void;
  canundo: boolean;
}) {
  const { theme, setTheme } = useTheme();
  return (
    <nav className="w-full flex bg-background py-4">
      <div className="flex flex-1 items-center">
        <Link href="/" className="flex items-center gap-2">
          <RefreshCcw className="h-6 w-6 dark:text-white" />
          <h1 className="whitespace-pre">Code Capsule</h1>
        </Link>
      </div>
      <div className="flex items-center gap-1 md:gap-4">
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                variant={"ghost"}
                size={"icon"}
                onClick={onundo}
                disabled={!canundo}
              >
                <Undo className="h-4 w-4  md:h-5 md:w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Undo</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                variant={"ghost"}
                size={"icon"}
                onClick={onclear}
                disabled={!canclear}
              >
                <Trash className="h-4 w-4  md:h-5 md:w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Clear Chat</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                variant={"ghost"}
                size={"icon"}
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                disabled={false}
              >
                {theme === "light" ? (
                  <MoonIcon className="h-4 w-4" />
                ) : (
                  <SunIcon className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {session ? (
          <DropdownMenu>
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="w-8 h-8">
                      <AvatarImage
                        src={
                          session.user.user_metadata?.avatar_url ||
                          "https://avatar.vercel.sh/" + session.user.email
                        }
                        alt={session.user.email}
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>My Account</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </DropdownMenu>
        ) : (
          <Button variant={"default"} onClick={showlogin}>
            Sign in <ArrowRight className=" h-4 w-4" />
          </Button>
        )}
      </div>
    </nav>
  );
}
