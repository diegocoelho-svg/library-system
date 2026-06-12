import { Link } from 'react-router-dom'
import { Alert } from '@/shared/ui/Alert'
import { Button } from '@/shared/ui/Button'
import { IdCardIcon } from '@/shared/ui/icons'
import { PasswordField } from '@/shared/ui/PasswordField'
import { Spinner } from '@/shared/ui/Spinner'
import { TextField } from '@/shared/ui/TextField'
import type { SignInController } from '../hooks/useSignIn'

type SignInFormProps = {
  controller: SignInController
}

export function SignInForm({ controller }: SignInFormProps) {
  const {
    matricula,
    password,
    fieldErrors,
    status,
    updateMatricula,
    updatePassword,
    handleSubmit,
  } = controller

  const submitting = status.state === 'submitting'

  return (
    <>
      {status.state === 'error' && (
        <div className="mb-4.5">
          <Alert>{status.message}</Alert>
        </div>
      )}

      <form noValidate onSubmit={handleSubmit}>
        <TextField
          autoComplete="username"
          error={fieldErrors.matricula}
          id="matricula"
          inputMode="numeric"
          label="Matrícula ou cartão"
          leadingIcon={<IdCardIcon />}
          onChange={event => updateMatricula(event.target.value)}
          placeholder="Ex.: 20384"
          value={matricula}
        />

        <PasswordField
          autoComplete="current-password"
          error={fieldErrors.password}
          id="password"
          label="Senha"
          labelAction={
            <Link
              className="text-[12.5px] font-semibold text-accent hover:underline"
              to="/forgot-password"
            >
              Esqueci minha senha
            </Link>
          }
          onChange={event => updatePassword(event.target.value)}
          placeholder="••••••••"
          value={password}
        />

        <Button className="mt-2" disabled={submitting} type="submit">
          {submitting ? (
            <>
              <Spinner /> Entrando…
            </>
          ) : (
            'Entrar'
          )}
        </Button>
      </form>
    </>
  )
}
