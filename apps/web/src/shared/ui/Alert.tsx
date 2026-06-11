import type { ReactNode } from 'react'
import { AlertIcon } from './icons'

type AlertProps = {
  children: ReactNode
}

export function Alert({ children }: AlertProps) {
  return (
    <div
      className="flex animate-fade-in items-start gap-2.5 rounded-field border border-danger/30 bg-danger-soft px-[13px] py-[11px] text-[13.5px] leading-[1.4] text-danger-strong"
      role="alert"
    >
      <AlertIcon className="mt-px flex-none" />
      <span>{children}</span>
    </div>
  )
}
