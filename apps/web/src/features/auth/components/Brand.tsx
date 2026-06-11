import { BookMarkIcon } from '@/shared/ui/icons'

export function Brand() {
  return (
    <div className="mb-[26px] flex items-center gap-[11px]">
      <div className="grid size-[38px] flex-none place-items-center rounded-[10px] bg-accent text-white shadow-pop">
        <BookMarkIcon />
      </div>
      <div>
        <div className="font-display text-[23px] font-semibold leading-none tracking-[-0.015em]">
          Revirasfs
        </div>
        <div className="mt-[3px] text-[11.5px] uppercase tracking-[0.16em] text-faint">
          Sistema de Bibliotecas
        </div>
      </div>
    </div>
  )
}
