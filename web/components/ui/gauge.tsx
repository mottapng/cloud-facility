"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface GaugeProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  label?: string;
  strokeColor?: string;
  backgroundColor?: string;
  transitionDuration?: string;
}

const sizeClasses = {
  sm: "w-24 h-10",
  md: "w-32 h-12",
  lg: "w-40 h-14",
};

const Gauge = React.forwardRef<HTMLDivElement, GaugeProps>(
  (
    {
      value,
      max = 100,
      size = "md",
      showValue = false,
      label,
      className,
      strokeColor,
      transitionDuration = "0.5s",
      ...props
    },
    ref
  ) => {
    const percentage = value <= max ? (value / max) * 100 : 100;

    const getGaugeRotation = (percentage: number) => {
      return (percentage / 100) * 180;
    };

    const effectiveStrokeColor = strokeColor;

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex items-center justify-center",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        <svg width="200" height="120" viewBox="0 0 200 120">
          <path
            d="M20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="currentColor"
            className="text-secondary"
            strokeWidth="20"
          />
          <path
            d="M20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke={effectiveStrokeColor}
            strokeWidth="20"
            strokeDasharray="251.2"
            strokeDashoffset={
              251.2 - (getGaugeRotation(percentage) / 180) * 251.2
            }
            style={{
              transition: `stroke-dashoffset ${transitionDuration} ease-in-out, stroke ${transitionDuration} ease-in-out`,
            }}
          />
          <line
            x1="50"
            y1="100"
            x2="100"
            y2="100"
            stroke="currentColor"
            className="text-primary"
            strokeWidth="2"
            transform={`rotate(${getGaugeRotation(percentage)} 100 100)`}
            style={{
              transition: `transform ${transitionDuration} ease-in-out`,
            }}
          />
        </svg>
        {showValue && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold">{value}</span>
          </div>
        )}
        {label && (
          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm text-muted-foreground">
            {label}
          </span>
        )}
      </div>
    );
  }
);

Gauge.displayName = "Gauge";

export { Gauge };

