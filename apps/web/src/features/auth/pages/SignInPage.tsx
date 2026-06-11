import { Link } from 'react-router-dom'
import { Brand } from '../components/Brand'
import { SignInForm } from '../components/SignInForm'
import { SuccessOverlay } from '../components/SuccessOverlay'
import { VisualPanel } from '../components/VisualPanel'
import { useSignIn } from '../hooks/useSignIn'

export function SignInPage() {
  const controller = useSignIn()

  return (
    <main className="relative grid h-full overflow-hidden min-[880px]:grid-cols-[1.05fr_1fr]">
      <VisualPanel />

      <div className="grid place-items-center bg-paper p-8">
        <section className="w-full max-w-[452px] px-1 py-2">
          <Brand />

          <h1 className="font-display font-medium text-[27px] leading-[1.18] tracking-[-0.018em]">
            Entrar na sua conta
          </h1>
          <p className="mt-1.5 mb-6 text-[14.5px] text-muted leading-normal">
            Acesse o acervo, suas reservas e empréstimos.
          </p>

          <SignInForm controller={controller} />

          <p className="mt-6 text-center text-muted text-sm">
            Não tem uma conta?{' '}
            <Link
              className="font-semibold text-accent hover:underline"
              to="/sign-up"
            >
              Criar conta
            </Link>
          </p>
        </section>
      </div>

      {controller.status.state === 'success' && <SuccessOverlay />}
    </main>
  )
}
