import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-lg border border-foreground/15 bg-foreground/[0.04] px-4 py-2 text-sm text-foreground placeholder:text-foreground/40 transition-colors focus-visible:outline-none focus-visible:border-toyota-red focus-visible:ring-2 focus-visible:ring-toyota-red/30 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
