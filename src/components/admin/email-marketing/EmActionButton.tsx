import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  default: "",
  destructive: "",
  outline: "border-gray-600 bg-gray-800 text-gray-100 hover:bg-gray-700 hover:text-white",
  secondary: "bg-gray-700 text-white hover:bg-gray-600",
  ghost: "text-gray-300 border border-gray-700 hover:bg-gray-800 hover:text-white",
  link: "text-cyan-400",
};

export function EmActionButton({ className, variant = "outline", ...props }: ButtonProps) {
  return (
    <Button
      variant={variant}
      className={cn(variant && variantClasses[variant], className)}
      {...props}
    />
  );
}
