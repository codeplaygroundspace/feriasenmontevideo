"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: "sm" | "md" | "lg";
  onCheckedChange?: (checked: boolean) => void;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, size = "md", onCheckedChange, ...props }, ref) => {
    const sizeClasses = {
      sm: "h-4 w-7",
      md: "h-5 w-9",
      lg: "h-6 w-11",
    };

    const thumbSizeClasses = {
      sm: "h-3 w-3",
      md: "h-4 w-4",
      lg: "h-5 w-5",
    };

    const translateClasses = {
      sm: "translate-x-3",
      md: "translate-x-4",
      lg: "translate-x-5",
    };

    return (
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only"
          ref={ref}
          onChange={(e) => onCheckedChange?.(e.target.checked)}
          {...props}
        />
        <div
          className={cn(
            "relative inline-flex items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
            sizeClasses[size],
            props.checked
              ? "bg-blue-600"
              : "bg-gray-200",
            className
          )}
        >
          <span
            className={cn(
              "inline-block rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out",
              thumbSizeClasses[size],
              props.checked
                ? translateClasses[size]
                : "translate-x-0.5"
            )}
          />
        </div>
      </label>
    );
  }
);

Switch.displayName = "Switch";

export { Switch };
