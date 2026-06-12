import type { InputHTMLAttributes, ReactNode } from 'react'
import { AlertIcon } from './icons'

export type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string
  label: string
  error?: string
  leadingIcon?: ReactNode
  trailingSlot?: ReactNode
  labelAction?: ReactNode
}

export function TextField({
  id,
  label,
  error,
  leadingIcon,
  trailingSlot,
  labelAction,
  ...inputProps
}: TextFieldProps) {
  const errorId = `${id}-error`
  const boxStateStyles = error
    ? 'border-danger shadow-[0_0_0_3px_var(--color-danger-soft)]'
    : 'border-line-strong focus-within:border-accent focus-within:bg-card focus-within:shadow-[0_0_0_3px_var(--color-accent-soft)]'

  return (
    <div className="mb-3.75">
      <div className="mb-1.75 flex items-baseline justify-between text-[13px] font-semibold text-ink-soft">
        <label htmlFor={id}>{label}</label>
        {labelAction}
      </div>
      <div
        className={`flex items-center rounded-field border bg-field transition ${boxStateStyles}`}
      >
        {leadingIcon && (
          <span className="grid w-10.5 flex-none place-items-center text-faint">
            {leadingIcon}
          </span>
        )}
        <input
          aria-describedby={error ? errorId : undefined}
          aria-invalid={Boolean(error)}
          className="min-w-0 flex-1 bg-transparent py-3.25 pr-3 text-[15px] text-ink outline-none placeholder:text-faint"
          id={id}
          {...inputProps}
        />
        {trailingSlot}
      </div>
      {error && (
        <p
          className="mt-1.5 flex animate-fade-in items-center gap-1.5 text-[12.5px] text-danger"
          id={errorId}
        >
          <AlertIcon className="flex-none" /> {error}
        </p>
      )}
    </div>
  )
}
