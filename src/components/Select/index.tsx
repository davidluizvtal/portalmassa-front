import * as Select from "@radix-ui/react-select";
import { Check, ChevronDownIcon } from "lucide-react";

interface SelectFormProps {
  list: { id: string; name: string }[];
}

export function SelectForm({ list }: SelectFormProps) {
  return (
    <Select.Root>
      <Select.Trigger className="flex h-11 w-full items-center justify-between gap-2 rounded-lg border border-zinc-300 px-3 py-2 shadow-sm outline-none">
        <Select.Value placeholder="Selecione o Teste" />
        <Select.Icon>
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className="flex w-[var(--radix-select-trigger-width)] py-3 pl-3 pr-9 overflow-hidden rounded-lg border border-zinc-200 bg-white"
          sideOffset={8}
          position="popper"
          side="bottom"
        >
          <Select.Viewport className="gap-2">
            {list.map(({ id, name }) => (
              <Select.Item
                className="flex text-sm h-14 ml-3"
                key={id}
                value={id}
              >
                <Select.ItemText>{name}</Select.ItemText>
                <Select.ItemIndicator className="ml-auto">
                  <Check className="h-4 w-4" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
