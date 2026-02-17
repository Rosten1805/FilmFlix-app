import * as React from "react"

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  children: React.ReactNode;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variantStyles = {
      default: 'bg-accent-blue text-white',
      secondary: 'bg-surface-secondary text-text-primary border border-border',
      destructive: 'bg-red-900 text-red-200',
      outline: 'border border-border text-text-secondary',
    };

    return (
      <div
        ref={ref}
        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors ${variantStyles[variant]} ${className || ''}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Badge.displayName = "Badge"

export { Badge }
