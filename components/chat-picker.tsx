import { LLMModel } from "@/lib/models";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function ChatPicker({ models }: { models: LLMModel[] }) {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex flex-col">
        <Select name="languagemodel" defaultValue={""} onValueChange={() => {}}>
          <SelectTrigger className="whitespace-nowrap border-none focus:ring-0 shadow-none px-0 py-0 h-6  text-xs">
            <SelectValue placeholder="Langauge Model" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(
              Object.groupBy(models, ({ provider }) => provider)
            ).map(([provider, models]) => (
              <SelectGroup key={provider}>
                <SelectLabel>{provider}</SelectLabel>
                {models?.map(({ id, name }) => (
                  <SelectItem key={id} value={id}>
                    <div>
                      <span>{name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col">
        <Select name="languagemodel" defaultValue={""} onValueChange={() => {}}>
          <SelectTrigger className="whitespace-nowrap border-none focus:ring-0 shadow-none px-0 py-0 h-6  text-xs">
            <SelectValue placeholder="Langauge Model" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(
              Object.groupBy(models, ({ provider }) => provider)
            ).map(([provider, models]) => (
              <SelectGroup key={provider}>
                <SelectLabel>{provider}</SelectLabel>
                {models?.map(({ id, name }) => (
                  <SelectItem key={id} value={id}>
                    <div>
                      <span>{name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
