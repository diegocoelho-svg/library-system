import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

export function BookMarkIcon({ width = 22, height = 22, ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height={height}
      viewBox="0 0 24 24"
      width={width}
      {...props}
    >
      <path
        d="M12 6.2C10.4 5 8.2 4.6 5.6 5.1c-.5.1-.9.6-.9 1.1v9.4c0 .7.6 1.2 1.3 1.1 2.2-.4 4.2 0 6 1.2 1.8-1.2 3.8-1.6 6-1.2.7.1 1.3-.4 1.3-1.1V6.2c0-.5-.4-1-.9-1.1C15.8 4.6 13.6 5 12 6.2Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M12 6.4v11.6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </svg>
  )
}

export function IdCardIcon(props: IconProps) {
  return (
    <svg fill="none" height="18" viewBox="0 0 24 24" width="18" {...props}>
      <rect
        height="14"
        rx="2.4"
        stroke="currentColor"
        strokeWidth="1.6"
        width="18"
        x="3"
        y="5"
      />
      <circle
        cx="8.5"
        cy="11"
        r="2.1"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M5.6 16.2c.5-1.5 1.7-2.2 2.9-2.2s2.4.7 2.9 2.2M14 9.5h4M14 12.5h4M14 15.5h2.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </svg>
  )
}

export function LockIcon(props: IconProps) {
  return (
    <svg fill="none" height="18" viewBox="0 0 24 24" width="18" {...props}>
      <rect
        height="10"
        rx="2.4"
        stroke="currentColor"
        strokeWidth="1.6"
        width="15"
        x="4.5"
        y="10"
      />
      <path
        d="M8 10V7.5a4 4 0 0 1 8 0V10"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="15" fill="currentColor" r="1.3" />
    </svg>
  )
}

export function EyeIcon(props: IconProps) {
  return (
    <svg fill="none" height="19" viewBox="0 0 24 24" width="19" {...props}>
      <path
        d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

export function EyeOffIcon(props: IconProps) {
  return (
    <svg fill="none" height="19" viewBox="0 0 24 24" width="19" {...props}>
      <path
        d="M4 5.5 20 18.5M9.6 6.2A9.6 9.6 0 0 1 12 5.5C18 5.5 21.5 12 21.5 12a14 14 0 0 1-2.8 3.2M6 8.1A14 14 0 0 0 2.5 12S6 18.5 12 18.5c.9 0 1.7-.1 2.5-.4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.6"
      />
      <path
        d="M9.8 10.2a2.6 2.6 0 0 0 3.6 3.6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.6"
      />
    </svg>
  )
}

export function AlertIcon(props: IconProps) {
  return (
    <svg fill="none" height="17" viewBox="0 0 24 24" width="17" {...props}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M12 7.5v5.2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="16" fill="currentColor" r="1.05" />
    </svg>
  )
}

export function AnimatedCheckIcon(props: IconProps) {
  return (
    <svg fill="none" height="34" viewBox="0 0 24 24" width="34" {...props}>
      <path
        className="animate-draw [stroke-dasharray:28] [stroke-dashoffset:28]"
        d="M6 12.5l3.6 3.6L18 7.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.4"
      />
    </svg>
  )
}
