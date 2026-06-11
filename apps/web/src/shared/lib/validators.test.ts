import { describe, expect, it } from 'vitest'
import { validateMatricula, validatePassword } from './validators'

describe('validateMatricula', () => {
  it('rejects empty values', () => {
    expect(validateMatricula('')).toBe('Informe sua matrícula.')
    expect(validateMatricula('   ')).toBe('Informe sua matrícula.')
  })

  it('rejects values with non-digit characters', () => {
    expect(validateMatricula('12a4')).not.toBeNull()
    expect(validateMatricula('12.34')).not.toBeNull()
  })

  it('rejects values shorter than 4 digits', () => {
    expect(validateMatricula('123')).toBe(
      'A matrícula deve ter ao menos 4 dígitos.',
    )
  })

  it('accepts 4 or more digits, ignoring surrounding spaces', () => {
    expect(validateMatricula('2038')).toBeNull()
    expect(validateMatricula(' 20384 ')).toBeNull()
  })
})

describe('validatePassword', () => {
  it('rejects empty values', () => {
    expect(validatePassword('')).toBe('Informe sua senha.')
  })

  it('rejects values shorter than 6 characters', () => {
    expect(validatePassword('12345')).toBe(
      'A senha deve ter ao menos 6 caracteres.',
    )
  })

  it('accepts values with 6 or more characters', () => {
    expect(validatePassword('123456')).toBeNull()
    expect(validatePassword('senha-segura')).toBeNull()
  })
})
