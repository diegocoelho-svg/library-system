type SpinnerProps = {
  className?: string
}

export function Spinner({ className = '' }: SpinnerProps) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block size-4.25 animate-spin rounded-full border-2 border-white/40 border-t-white ${className}`}
    />
  )
}
