import { BookMarkIcon } from '@/shared/ui/icons'

export function Brand() {
  return (
    <div className="mb-6.5 flex items-center gap-2.75">
      <div className="grid size-9.5 flex-none place-items-center rounded-[10px] bg-accent text-white shadow-pop">
        <BookMarkIcon />
      </div>
      <div>
        <div className="font-display text-[23px] font-semibold leading-none tracking-[-0.015em]">
          Revira
        </div>
        <div className="mt-0.75 text-[11.5px] uppercase tracking-[0.16em] text-faint">
          Sistema de Bibliotecas
        </div>
      </div>
    </div>
  )
}
