import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { FLOW_THRESHOLDS } from "@/utils/constants";
import { PumpStatus } from "@/utils/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getStatusFromFlow = (flow: number): PumpStatus => {
  if (flow > FLOW_THRESHOLDS.CRITICAL) return "critical";
  if (flow > FLOW_THRESHOLDS.WARNING) return "warning";
  return "normal";
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
};

export const capitalizeFirstLetter = (str: string): string => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
