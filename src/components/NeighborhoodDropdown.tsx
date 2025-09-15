'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { neighborhoods } from '../data/neighborhoods';
import { cn } from '../lib/utils';
import { Button } from './ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';

interface NeighborhoodDropdownProps {
  selectedNeighborhood: string;
  onNeighborhoodChange: (neighborhood: string) => void;
}

const NeighborhoodDropdown: React.FC<NeighborhoodDropdownProps> = ({
  selectedNeighborhood,
  onNeighborhoodChange,
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedNeighborhood
            ? neighborhoods.find((neighborhood) => neighborhood.value === selectedNeighborhood)?.label
            : "Seleccionar barrio..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Buscar barrio..." className="h-9" />
          <CommandList>
            <CommandEmpty>No se encontró el barrio.</CommandEmpty>
            <CommandGroup>
              {neighborhoods.map((neighborhood) => (
                <CommandItem
                  key={neighborhood.value}
                  value={neighborhood.value}
                  onSelect={(currentValue) => {
                    onNeighborhoodChange(currentValue === selectedNeighborhood ? "all" : currentValue);
                    setOpen(false);
                  }}
                >
                  {neighborhood.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      selectedNeighborhood === neighborhood.value ? "opacity-100" : "opacity-0"
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
};

export default NeighborhoodDropdown;
