import type { AuthenticatedUser, Credentials } from '../types'

export type AuthService = {
  signIn(credentials: Credentials): Promise<AuthenticatedUser>
}

export class InvalidCredentialsError extends Error {}

const MOCK_DELAY_MS = 1400
const MOCK_PASSWORD = '123456'

const mockAuthService: AuthService = {
  async signIn({ matricula, password }) {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY_MS))

    if (password !== MOCK_PASSWORD) {
      throw new InvalidCredentialsError(
        'Matrícula ou senha incorretos. Verifique e tente novamente.',
      )
    }

    return {
      token: 'mock-token',
      id: 1,
      name: 'Leitor Revira',
      matricula,
      role: 'collaborator',
    }
  },
}

/**
 * Mock temporário: senha "123456" autentica qualquer matrícula válida.
 * Para plugar a API real, crie um AuthService que faça POST /sessions
 * e troque a atribuição abaixo — a UI não precisa mudar.
 */
export const authService: AuthService = mockAuthService
