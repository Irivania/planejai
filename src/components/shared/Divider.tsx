import type { HTMLAttributes } from 'react'

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical'
}

export function Divider({
  orientation = 'horizontal',
  className = '',
  ...props
}: DividerProps) {
  const isVertical = orientation === 'vertical'

  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={`bg-border shrink-0 ${
        isVertical ? 'h-5 w-[1px] mx-2' : 'h-[1px] w-full my-2'
      } ${className}`}
      {...props}
    />
  )
}

export default Divider