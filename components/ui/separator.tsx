import * as React from "react"

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, orientation = 'horizontal', ...props }, ref) => (
    <div
      ref={ref}
      className={`${
        orientation === 'vertical'
          ? 'h-full w-px'
          : 'h-px w-full'
      } bg-border ${className || ''}`}
      {...props}
    />
  )
);
Separator.displayName = "Separator"

export { Separator }
