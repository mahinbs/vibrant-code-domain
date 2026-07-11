import { SelectContent, SelectItem } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

/** Dark-safe select dropdown for admin email marketing (portal renders outside .dark). */
export function EmSelectContent({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof SelectContent>) {
  return (
    <SelectContent
      className={cn(
        "z-[100] bg-gray-900 border-gray-700 text-white",
        className,
      )}
      {...props}
    />
  );
}

export function EmSelectItem({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof SelectItem>) {
  return (
    <SelectItem
      className={cn(
        "text-gray-200 focus:bg-gray-800 focus:text-white",
        className,
      )}
      {...props}
    />
  );
}
