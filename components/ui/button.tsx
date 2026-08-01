import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-toyota-red text-foreground hover:bg-toyota-red-dark shadow-red-glow hover:shadow-[0_12px_40px_rgba(235,10,30,0.28)] active:scale-[0.98]",
        outline:
          "border border-neutral-300 bg-foreground text-neutral-900 hover:border-neutral-900 hover:bg-neutral-50 active:scale-[0.98]",
        ghost:
          "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900",
        dark:
          "bg-neutral-900 text-foreground hover:bg-neutral-800 active:scale-[0.98]",
        "outline-light":
          "border border-foreground/20 bg-foreground/5 text-foreground backdrop-blur hover:bg-foreground/10 hover:border-foreground/40 active:scale-[0.98]",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
