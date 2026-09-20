"use client";

import { format } from "date-fns";
import { pt } from "date-fns/locale/pt";
import { CalendarIcon } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

type CalendarPickerProps = {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  emptyText?: string;
};

export default function CalendarPicker({
  value,
  onChange,
  emptyText = "Escolhe uma data",
}: CalendarPickerProps) {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            data-empty={!value}
            className="justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
          />
        }
      >
        <CalendarIcon />
        {value ? format(value, "P", { locale: pt }) : <span>{emptyText}</span>}
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          captionLayout="dropdown"
          locale={pt}
        />
      </PopoverContent>
    </Popover>
  );
}
