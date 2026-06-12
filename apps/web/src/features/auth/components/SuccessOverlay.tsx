import { AnimatedCheckIcon } from '@/shared/ui/icons'

export function SuccessOverlay() {
  return (
    <div className="absolute inset-0 z-30 grid animate-fade-in place-items-center bg-paper/90 backdrop-blur-[6px]">
      <div className="max-w-90 p-3 text-center">
        <div className="mx-auto mb-5.5 grid size-19 animate-pop place-items-center rounded-full bg-accent-soft text-accent">
          <AnimatedCheckIcon />
        </div>
        <h2 className="font-display text-[25px] font-medium tracking-[-0.01em]">
          Bem-vindo de volta
        </h2>
        <p className="mt-2 text-[14.5px] text-muted">
          Acesso autorizado. Abrindo seu acervo…
        </p>
        <div className="mx-auto mt-5.5 h-0.75 w-45 overflow-hidden rounded-[3px] bg-line">
          <span className="block h-full w-0 animate-progress bg-accent" />
        </div>
      </div>
    </div>
  )
}
