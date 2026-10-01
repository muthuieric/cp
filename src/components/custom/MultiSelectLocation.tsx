"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { locationGroups } from "@/public/data/properties";

export function MultiSelectLocation({
  selectedLocations,
  onChange,
  max = 5,
}: {
  selectedLocations: string[];
  onChange: (val: string[]) => void;
  max?: number;
}) {
  const [open, setOpen] = React.useState(false);

  const toggleLocation = (location: string) => {
    if (selectedLocations.includes(location)) {
      onChange(selectedLocations.filter((l) => l !== location));
    } else {
      if (selectedLocations.length < max) {
        onChange([...selectedLocations, location]);
      } else {
        alert(`You can select a maximum of ${max} locations.`);
      }
    }
  };

  const removeLocation = (locationToRemove: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(selectedLocations.filter((l) => l !== locationToRemove));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full min-h-[48px] h-auto justify-between px-3 py-2 bg-white"
        >
          <div className="flex flex-wrap gap-1 items-center">
            {selectedLocations.length === 0 && (
              <span className="text-gray-500 font-normal">Select locations...</span>
            )}
            {selectedLocations.map((loc) => (
              <Badge
                key={loc}
                variant="secondary"
                className="mr-1 mb-1 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200"
                onClick={(e) => removeLocation(loc, e)}
              >
                {loc}
                <X className="ml-1 h-3 w-3 cursor-pointer hover:text-red-500" />
              </Badge>
            ))}
          </div>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50 ml-2" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search locations..." />
          <CommandList className="max-h-[300px]">
            <CommandEmpty>No location found.</CommandEmpty>
            {locationGroups.map((group) => (
              <CommandGroup key={group.category} heading={group.category}>
                
                {/* Select All Category Option */}
                <CommandItem
                  onSelect={() => toggleLocation(group.category)}
                  className="font-medium text-blue-600"
                >
                  <div
                    className={cn(
                      "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                      selectedLocations.includes(group.category)
                        ? "bg-primary text-white"
                        : "opacity-50 [&_svg]:invisible"
                    )}
                  >
                    <Check className="h-4 w-4" />
                  </div>
                  All {group.category}
                </CommandItem>

                {/* Sub-locations */}
                {group.items.map((location) => (
                  <CommandItem
                    key={location}
                    onSelect={() => toggleLocation(location)}
                    className="pl-6"
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        selectedLocations.includes(location)
                          ? "bg-primary text-white"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <Check className="h-4 w-4" />
                    </div>
                    {location}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}