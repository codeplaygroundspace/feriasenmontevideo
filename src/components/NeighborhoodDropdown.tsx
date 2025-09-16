'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { neighborhoods } from '../data/neighborhoods';
import { cn } from '../lib/utils';
import { useIsMobile } from '../hooks/use-mobile';
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';

interface NeighborhoodDropdownProps {
  selectedNeighborhood: string;
  onNeighborhoodChange: (neighborhood: string) => void;
}

const NeighborhoodDropdown: React.FC<NeighborhoodDropdownProps> = ({
  selectedNeighborhood,
  onNeighborhoodChange,
}) => {
  const [open, setOpen] = React.useState(false);
  const isMobile = useIsMobile();

  const handleSelect = (currentValue: string) => {
    onNeighborhoodChange(currentValue === selectedNeighborhood ? "all" : currentValue);
    setOpen(false);
  };

  const triggerButton = (
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
  );

  const commandContent = (
    <Command>
      <CommandInput placeholder="Buscar barrio..." className="h-9" />
      <CommandList>
        <CommandEmpty>No se encontró el barrio.</CommandEmpty>
        <CommandGroup>
          {neighborhoods.map((neighborhood) => (
            <CommandItem
              key={neighborhood.value}
              value={neighborhood.value}
              onSelect={handleSelect}
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
  );

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          {triggerButton}
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[80vh]">
          <SheetHeader>
            <SheetTitle>Seleccionar Barrio</SheetTitle>
          </SheetHeader>
          <div className="mt-4">
            {commandContent}
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {triggerButton}
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        {commandContent}
      </PopoverContent>
    </Popover>
  );
};

export default NeighborhoodDropdown;
