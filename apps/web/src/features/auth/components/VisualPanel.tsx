import { BookMarkIcon } from '@/shared/ui/icons'
import { AuthBackground } from './AuthBackground'

export function VisualPanel() {
  return (
    <aside className="relative hidden flex-col justify-between overflow-hidden px-[52px] py-12 text-[#f4f1e9] min-[880px]:flex">
      <AuthBackground />

      <div className="relative flex items-center gap-[11px]">
        <BookMarkIcon height={26} width={26} />
        <span className="font-display font-semibold text-[22px] tracking-[-0.01em]">
          Revira
        </span>
      </div>

      <div className="relative">
        <p className="max-w-[16ch] text-balance font-display text-[clamp(26px,2.6vw,40px)] leading-[1.22] tracking-[-0.01em]">
          Um lugar para cada livro, e cada livro em seu <em>lugar</em>.
        </p>
        <p className="mt-[18px] text-[13px] text-[#f4f1e9]/70 uppercase tracking-[0.14em]">
          Acervo · Reservas · Empréstimos
        </p>
      </div>

      <p className="relative text-[13px] text-[#f4f1e9]/70 uppercase tracking-[0.14em]">
        © 2026 Revira
      </p>
    </aside>
  )
}
