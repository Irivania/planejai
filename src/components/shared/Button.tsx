import type { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
};

function Button({ children, variant = 'primary' }: ButtonProps) {
  const baseClasses = 'rounded-lg px-4 py-2 font-medium transition';
  const variantClasses =
    variant === 'primary'
      ? 'bg-slate-900 text-white hover:bg-slate-700'
      : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-100';

  return <button className={`${baseClasses} ${variantClasses}`}>{children}</button>;
}

export default Button;
