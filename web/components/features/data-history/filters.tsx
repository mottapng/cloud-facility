"use client";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import type { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const DataHistoryFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedPump, setSelectedPump] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const [dateRange, setDateRange] = useState<DateRange | undefined>(() => {
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    if (!startDate) return undefined;

    return {
      from: new Date(startDate),
      ...(endDate ? { to: new Date(endDate) } : {}),
    };
  });

  const formatDateToUserLocale = (date: Date | undefined) => {
    if (!date) return "";
    try {
      const safeDate = new Date(date);

      return format(safeDate, "PPP", { locale: ptBR });
    } catch (error) {
      console.error("Error formatting date:", error);
      return date.toLocaleDateString();
    }
  };

  const handleDateRangeChange = (dateRange: DateRange | undefined) => {
    setDateRange(dateRange);
    handleDateRangeParams(dateRange);
  };

  const handleDateRangeParams = (dateRange: DateRange | undefined) => {
    const startDate = dateRange?.from
      ? new Date(dateRange.from.setHours(0, 0, 0, 0)).toString()
      : "";
    const endDate = dateRange?.to
      ? new Date(dateRange.to.setHours(23, 59, 59, 999)).toString()
      : "";

    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("startDate", startDate);
    newParams.set("endDate", endDate);

    router.push(`${pathname}?${newParams.toString()}`);
  };

  const addParams = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set(key, value);

    router.push(`${pathname}?${newParams.toString()}`);
  };

  const removeParam = (key: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete(key);

    router.push(`${pathname}?${newParams.toString()}`);
  };

  const handlePumpChange = (value: string) => {
    setSelectedPump(value);
    if (value === "all") removeParam("pump");
    else addParams("pump", value);
  };

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
    if (value === "all") removeParam("status");
    else addParams("status", value);
  };

  return (
    <div className="flex flex-row gap-4 flex-wrap">
      <Select onValueChange={handlePumpChange} defaultValue={selectedPump}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Select Pump" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas as bombas</SelectItem>
          <SelectItem value="mqtt">Bomba MQTT</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={handleStatusChange} defaultValue={selectedStatus}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Select Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos os status</SelectItem>
          <SelectItem value="normal">Normal</SelectItem>
          <SelectItem value="warning">Aviso</SelectItem>
          <SelectItem value="critical">Crítico</SelectItem>
        </SelectContent>
      </Select>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="justify-start text-left font-normal !my-0"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {formatDateToUserLocale(dateRange.from)} -{" "}
                  {formatDateToUserLocale(dateRange.to)}
                </>
              ) : (
                formatDateToUserLocale(dateRange.from)
              )
            ) : (
              <span>Selecione um período</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={handleDateRangeChange}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
