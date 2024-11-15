import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Button } from "./ui/button";
import { ArrowUp, PaperclipIcon, Square } from "lucide-react";

export default function ChatInput({
  error,
  retry,
  isloading,
  stop,
  input,
  handleinputchange,
  handleinputsubmit,
  file,
  handlefilechange,
  children,
  ismultomodel,
}: {
  error: undefined | unknown;
  retry: () => void;
  isloading: boolean;
  stop: () => void;

  input: string;
  handleinputchange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleinputsubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  file: File[];
  handlefilechange: (files: File[]) => void;
  children: React.ReactNode;
  ismultomodel: boolean;
}) {
  return (
    <form
      className="mb-2 flex flex-col mt-auto bg-background"
      action="
    "
    >
      {error !== undefined && <div>un unxpected error occured</div>}
      <div className="shadow-md rounded-2xl border">
        <div className="flex items-center px-3  py-2 gap-1">{children}</div>
        <TextareaAutosize
          autoFocus={true}
          minRows={1}
          maxRows={5}
          required={true}
          placeholder="Describe your Idea"
          value={input}
          onChange={handleinputchange}
          className="text-normal px-3 resize-none ring-0 bg-inherit w-full  m-0 outline-none"
        />
        <div className="flex p-3 gap-2 items-center">
          <input
            type="file"
            onChange={() => {}}
            id="multimodel"
            accept="image/*"
            multiple={true}
            className="hidden"
          />
          <div className="flex items-center flex-1 gap-2">
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant={"outline"}
                    size={"icon"}
                    className=" rounded-xl h-10 w-10"
                    disabled={!ismultomodel}
                    onClick={(e) => {
                      e.preventDefault();
                      const input = document.getElementById(
                        "multimodel"
                      ) as HTMLInputElement;
                      input.click();
                    }}
                  >
                    <PaperclipIcon className="h-4 w-4  md:h-5 md:w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Add Attachments</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {}
          </div>
          <div>
            {!isloading ? (
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Button
                      type="submit"
                      variant={"default"}
                      size={"icon"}
                      className=" rounded-xl h-10 w-10"
                    >
                      <ArrowUp className="h-4 w-4  md:h-5 md:w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Send Message</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={"secondary"}
                      size={"icon"}
                      className=" rounded-xl h-10 w-10"
                      onClick={(e) => {
                        e.preventDefault();
                        stop();
                      }}
                    >
                      <Square className="h-4 w-4  md:h-5 md:w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Stop Genration</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-2 text-center">
        Codecapsule Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Vero, minima?
      </p>
    </form>
  );
}
