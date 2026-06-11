export type UserRole = 'administrator' | 'collaborator'

export type Credentials = {
  matricula: number
  password: string
}

/** Espelha o retorno do POST /sessions da API (token + usuário sem senha) */
export type AuthenticatedUser = {
  token: string
  id: number
  name: string
  matricula: number
  role: UserRole
}

export type SignInStatus =
  | { state: 'idle' }
  | { state: 'submitting' }
  | { state: 'success'; user: AuthenticatedUser }
  | { state: 'error'; message: string }
