import { forwardRef, SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { SelectPrimitive } from "@/components/ui/select";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  value: string;
  onValueChange: (value: string) => void;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, value, onValueChange, ...props }, ref) => {
    return (
      <select
        ref={ref}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        className={cn(
          "flex h-10 w-full rounded-md border border-primary/20 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
      </select>
    );
  }
);

Select.displayName = "Select";

type SelectTriggerProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
type SelectContentProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
type SelectLabelProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
type SelectItemProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
type SelectSeparatorProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>

export function SelectTrigger({ children, className, ...props }: SelectTriggerProps) {
  return (
    <div
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-primary/20 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function SelectValue({ children }: { children: React.ReactNode }) {
  return <span className="flex-1">{children}</span>;
}

export function SelectContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mt-1">
      <div className="absolute z-10 w-full rounded-md border border-primary/20 bg-background shadow-lg">
        {children}
      </div>
    </div>
  );
}

export function SelectItem({ children, value }: { children: React.ReactNode; value: string }) {
  return (
    <div
      className="relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent focus:bg-accent"
      data-value={value}
    >
      {children}
    </div>
  );
} 