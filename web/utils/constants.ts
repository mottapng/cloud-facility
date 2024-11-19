export const themes = [
  {
    value: "light",
    label: "Light",
  },
  {
    value: "dark",
    label: "Dark",
  },
  {
    value: "system",
    label: "System",
  },
] as const;

export const STATUS_COLORS = {
  normal: "bg-status-normal",
  warning: "bg-status-warning",
  critical: "bg-status-critical",
  default: "bg-status-default",
} as const;

export const STATUS_COLORS_HEX = {
  normal: "#50dc84",
  warning: "#ffcc00",
  critical: "#ff7474",
  default: "#808080",
} as const;

export const MAX_FLOW = 100;

export const FLOW_THRESHOLDS = {
  CRITICAL: 70,
  WARNING: 40,
} as const;
