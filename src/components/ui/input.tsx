import * as React from "react";

import { cn } from "@/lib/utils";
import Stack from "./stack";
import { Label } from "./label";
import { LucideIcon } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ icon: Icon, label, className, type, ...props }, ref) => {
    return (
      <Stack direction="vertical" spacing="small">
        {label && <Label htmlFor={props.id}>{label}</Label>}

        <div className="relative">
          {Icon && (
            <Icon
              size={16}
              className="absolute top-1/2 left-2.5 -translate-y-1/2 stroke-muted-foreground"
            />
          )}

          <input
            type={type}
            className={cn(
              "flex h-9 w-full rounded-md border border-input bg-transparent pr-2.5 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              Icon ? "pl-8" : "pl-2.5",
              className,
            )}
            ref={ref}
            {...props}
          />
        </div>
      </Stack>
    );
  },
);
Input.displayName = "Input";

export { Input };
