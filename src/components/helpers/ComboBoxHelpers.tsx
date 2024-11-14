import React, { FunctionComponent } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { People } from "@/types/People";
import { Group } from "@/types/Group";
import { cn } from "@/lib/utils";

// function ComboBoxFFC() {
//     return ( <div></div> );
// }
// export default ComboBoxFFC;

// interface ComboBoxFCProps {}
// const ComboBoxFC: FunctionComponent<ComboBoxFCProps> = () => {
//     return ( <div></div> );
// }
// export default ComboBoxFC;

// const ComboBoxSFC = () => {
//     return ( <div></div> );
// }
// export default ComboBoxSFC;

type Props = {
  groups: Group[];
  event?: Event | undefined;  
  refreshAction: (id: number) => void;
}

export const SelectComboBox = ({ event, groups, refreshAction}: Props) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("0");
  return ( 
    <Popover open={open} onOpenChange={setOpen} >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? groups.find((item) => String(item.id) === value)?.name
            : "Select group..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" >
        <Command >
          <CommandInput placeholder="Search group..." className="h-9" />
          <CommandList>
            <CommandEmpty>No group found.</CommandEmpty>
            <CommandGroup>
              {groups.map((item) => (
                <CommandItem
                  key={item.id}
                  value={String(item.id)}
                  onSelect={(currentValue) => {
                    console.log(currentValue)
                    refreshAction(parseInt(currentValue));
                    setValue(currentValue === (value) ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {item.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === String(item.id) ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}