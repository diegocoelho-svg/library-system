import type { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'outline'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
}

const baseStyles =
  'flex w-full cursor-pointer items-center justify-center gap-[9px] rounded-field font-semibold transition disabled:cursor-default'

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-accent px-4 py-3.5 text-[15px] tracking-[0.01em] text-white shadow-pop hover:bg-accent-press active:translate-y-px disabled:opacity-75',
  outline:
    'border border-line-strong bg-card px-4 py-3 text-[14.5px] text-ink-soft hover:border-faint hover:bg-field',
}

export function Button({
  variant = 'primary',
  className = '',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      type={type}
      {...props}
    />
  )
}
