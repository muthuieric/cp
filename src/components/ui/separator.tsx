// import * as React from "react"
// import * as SeparatorPrimitive from "@radix-ui/react-separator"

// import { cn } from "@/lib/utils"

// const Separator = React.forwardRef<
//   React.ElementRef<typeof SeparatorPrimitive.Root>,
//   React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
// >(
//   (
//     { className, orientation = "horizontal", decorative = true, ...props },
//     ref
//   ) => (
//     <SeparatorPrimitive.Root
//       ref={ref}
//       decorative={decorative}
//       orientation={orientation}
//       className={cn(
//         "shrink-0 bg-border",
//         orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
//         className
//       )}
//       {...props}
//     />
//   )
// )
// Separator.displayName = SeparatorPrimitive.Root.displayName

// export { Separator }

"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Separator({ className, ...props }: SeparatorProps) {
  return (
    <div
      role="separator"
      className={cn("shrink-0 bg-border h-[1px] w-full", className)}
      {...props}
    />
  )
}

