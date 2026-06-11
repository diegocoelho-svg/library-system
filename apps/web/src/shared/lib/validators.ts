const MATRICULA_PATTERN = /^\d{4,}$/

export const PASSWORD_MIN_LENGTH = 6

export function validateMatricula(value: string): string | null {
  const trimmed = value.trim()

  if (!trimmed) {
    return 'Informe sua matrícula.'
  }

  if (!MATRICULA_PATTERN.test(trimmed)) {
    return 'A matrícula deve ter ao menos 4 dígitos.'
  }

  return null
}

export function validatePassword(value: string): string | null {
  if (!value) {
    return 'Informe sua senha.'
  }

  if (value.length < PASSWORD_MIN_LENGTH) {
    return `A senha deve ter ao menos ${PASSWORD_MIN_LENGTH} caracteres.`
  }

  return null
}
