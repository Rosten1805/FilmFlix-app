import * as React from "react"

interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={`overflow-x-auto ${className || ''}`}
      {...props}
    >
      <div className="flex gap-4">
        {children}
      </div>
    </div>
  )
);
ScrollArea.displayName = "ScrollArea"

export { ScrollArea }
