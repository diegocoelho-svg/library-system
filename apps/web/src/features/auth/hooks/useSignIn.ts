import { type FormEvent, useState } from 'react'
import { validateMatricula, validatePassword } from '@/shared/lib/validators'
import { authService, InvalidCredentialsError } from '../services/authService'
import type { SignInStatus } from '../types'

type FieldErrors = {
  matricula?: string
  password?: string
}

export function useSignIn() {
  const [matricula, setMatricula] = useState('')
  const [password, setPassword] = useState('')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<SignInStatus>({ state: 'idle' })

  const updateMatricula = (value: string) => {
    setMatricula(value)
    if (fieldErrors.matricula) {
      setFieldErrors(current => ({ ...current, matricula: undefined }))
    }
  }

  const updatePassword = (value: string) => {
    setPassword(value)
    if (fieldErrors.password) {
      setFieldErrors(current => ({ ...current, password: undefined }))
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (status.state === 'submitting') {
      return
    }

    const errors: FieldErrors = {
      matricula: validateMatricula(matricula) ?? undefined,
      password: validatePassword(password) ?? undefined,
    }
    setFieldErrors(errors)

    if (errors.matricula || errors.password) {
      setStatus({ state: 'idle' })
      return
    }

    setStatus({ state: 'submitting' })

    try {
      const user = await authService.signIn({
        matricula: Number(matricula.trim()),
        password,
      })
      setStatus({ state: 'success', user })
    } catch (error) {
      const message =
        error instanceof InvalidCredentialsError
          ? error.message
          : 'Não foi possível entrar agora. Tente novamente em instantes.'
      setStatus({ state: 'error', message })
    }
  }

  return {
    matricula,
    password,
    fieldErrors,
    status,
    updateMatricula,
    updatePassword,
    handleSubmit,
  }
}

export type SignInController = ReturnType<typeof useSignIn>
