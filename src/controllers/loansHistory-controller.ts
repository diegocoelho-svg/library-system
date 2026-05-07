import type { Request, Response } from 'express'
import { z } from 'zod'
import { HTTP_STATUS } from '@/constants/httpStatus'
import { prisma } from '@/database/prisma'
import { AppError } from '@/utils/AppError'
import { handleControllerError } from '@/utils/HandleControllerError'

class LoansHistoryController {
  async index(_request: Request, response: Response) {
    try {
      const loansHistory = await prisma.loanHistory.findMany({})

      if (loansHistory.length === 0) {
        throw new AppError(
          'No loan history found',
          HTTP_STATUS.NOT_FOUND,
        )
      }

      return response.json(loansHistory)
    } catch (error) {
      return handleControllerError(error, response)
    }
  }

  // async show(request: Request, response: Response) {
  //   try {
  //     const paramsSchema = z.object({
  //       id: z.coerce.number(),
  //     })

  //     const { id } = paramsSchema.parse(request.params)

  //     const historySelected = await prisma.loanHistory.findUnique({
  //       where: { id },
  //     })
  //   } catch (error) {
  //     return handleControllerError(error, response)
  //   }
  // }
}

export { LoansHistoryController }
