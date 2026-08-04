import type { LucideIcon } from 'lucide-react';
import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary' | 'ghost';
  icon?: LucideIcon;
}

const baseClasses =
  'flex cursor-pointer items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50';

const variantClasses = {
  primary: 'rounded-xl bg-primary font-semibold text-primary-foreground',
  secondary:
    'rounded-3xl border border-border bg-secondary-button text-foreground',
  ghost: 'rounded-lg text-foreground hover:bg-secondary-button',
};

export function Button({
  variant,
  icon: Icon,
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={[baseClasses, variantClasses[variant], className].join(' ')}
      {...props}
    >
      {Icon && <Icon size={16} />}
      {children}
    </button>
  );
}

export default Button;
