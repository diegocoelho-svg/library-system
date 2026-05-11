import type { Response } from 'express'
import { ZodError } from 'zod'
import { HTTP_STATUS } from '@/constants/httpStatus'
import { AppError } from './AppError'

export function handleControllerError(error: unknown, response: Response) {
  if (error instanceof AppError) {
    return response
      .status(error.statusCode || HTTP_STATUS.BAD_REQUEST)
      .json({ message: error.message })
  }

  if (error instanceof ZodError) {
    const formattedErrors = error.errors.map(
      err => `${err.path.join('.')}: ${err.message}`,
    )
    return response
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: `Dados inválidos: ${formattedErrors.join(', ')}` })
  }

  console.error(error)
  return response
    .status(HTTP_STATUS.INTERNAL_ERROR)
    .json({ message: 'Erro interno do servidor' })
}
