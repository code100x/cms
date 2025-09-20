'use client';
import React, { useState, forwardRef } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useRecoilState } from 'recoil';
import { selectFilter } from '@/store/atoms/filterContent';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const allFilters = [
  { value: 'all', label: 'ALL' },
  { value: 'unwatched', label: 'Unwatched' },
  { value: 'watched', label: 'Watched' },
  { value: 'watching', label: 'Watching' },
];

type FilterContentProps = {
  // Add any other props here if needed
  className?: string;
};

export const FilterContent = forwardRef<HTMLDivElement, FilterContentProps>(
  (props, ref) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useRecoilState(selectFilter);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={`w-fit gap-2 ${props.className || ''}`}
          >
            {value
              ? allFilters.find((filters) => filters.value === value)?.label
              : 'Filter'}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="z-[99999] w-fit p-0" ref={ref}>
          <Command>
            <CommandList>
              <CommandGroup>
                {allFilters.map((filters) => (
                  <CommandItem
                    key={filters.value}
                    value={filters.value}
                    className={`px-4 ${props.className || ''}`}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? '' : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        value === filters.value ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                    {filters.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  },
);
