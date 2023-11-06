import * as Popover from "@radix-ui/react-popover";
import { Bot, X } from "lucide-react";

export function ChatGPT() {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="rounded-full w-fit p-4 flex items-center justify-center border bg-zinc-200 border-zinc-300 shadow-md text-zinc-500 absolute bottom-6 right-6 hover:bg-yellow-400 hover:text-zinc-800 hover:border-yellow-200 transition-all duration-200 active:scale-105">
          <Bot className="w-8 h-8 text-current" />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content side="top" sideOffset={5}>
          <div>Teste</div>
          <Popover.Close aria-label="Close">
            <X />
          </Popover.Close>
          <Popover.Arrow />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
