import * as React from "react"

import { cn } from "@/lib/utils"
import {LucideIcon} from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    startIcon?: LucideIcon;
    endIcon?: LucideIcon;
    onStartIconClick?: () => void;
    onEndIconClick?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, startIcon, endIcon, onStartIconClick, onEndIconClick, ...props }, ref) => {
    const StartIcon = startIcon;
    const EndIcon = endIcon;
    return (
        <div className="w-full relative flex items-center">
            {StartIcon && <button
                className="absolute left-3 text-center transition-all disabled:pointer-events-none disabled:opacity-50"
                type="button"
                onClick={onStartIconClick}
            >
                <StartIcon className={"w-4 h-4 text-foreground-faded"} />
            </button>
            }
            <input
                type={type}
                className={cn("w-full py-2 rounded-sm bg-background placeholder:text-foreground-faded border border-border-faded transition duration-300 ease focus:outline-none focus:border-border-primary",
                    startIcon && 'pl-9',
                    endIcon && 'pr-9',
                    className
                )}
                ref={ref}
                {...props }
            />
            {EndIcon && <button
                className="absolute right-3 text-center transition-all disabled:pointer-events-none disabled:opacity-50"
                type="button"
                onClick={onEndIconClick}
            >
                <EndIcon className="w-4 h-4 text-foreground" />
            </button>
            }
        </div>
    );
})
Input.displayName = "Input"

export { Input }
