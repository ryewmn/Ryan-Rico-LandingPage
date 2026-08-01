import { cn } from "@/lib/utils";

export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-[11px] font-mono uppercase tracking-[0.24em] text-toyota-red",
        className
      )}
    >
      {children}
    </p>
  );
}
