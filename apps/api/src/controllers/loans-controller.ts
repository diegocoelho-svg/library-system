import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import type { Request, Response } from 'express'
import { z } from 'zod'
import { HTTP_STATUS } from '@/constants/httpStatus'
import { LoansRepository } from '@/database/repositories/loans-repository'
import { AppError } from '@/utils/AppError'
import { handleControllerError } from '@/utils/HandleControllerError'

class LoansController {
  private loansRepository = new LoansRepository()

  create = async (request: Request, response: Response) => {
    try {
      const bodySchema = z.object({
        userId: z.number(),
        bookCopyId: z.number(),
      })

      const { userId, bookCopyId } = bodySchema.parse(request.body)

      const result = await this.loansRepository.create({ userId, bookCopyId })

      const formattedLoanDate = dayjs(result.loan.loanDate).format(
        'DD/MM/YYYY HH:mm',
      )
      const formattedDueDate = dayjs(result.loan.dueDate).format(
        'DD/MM/YYYY HH:mm',
      )

      return response.json({
        userId: result.loan.userId,
        inventoryCode: result.bookCopy?.inventoryCode,
        username: result.user.name,
        bookCopyId: result.loan.bookCopyId,
        loanDate: formattedLoanDate,
        dueDate: formattedDueDate,
        status: result.loan.status,
      })
    } catch (error) {
      return handleControllerError(error, response)
    }
  }

  update = async (request: Request, response: Response) => {
    try {
      const paramsSchema = z.object({
        id: z.coerce.number(),
      })

      const { id } = paramsSchema.parse(request.params)

      const result = await this.loansRepository.returnById(id)

      const formattedReturnDate = dayjs(result.updatedLoan.returnDate).format(
        'DD/MM/YYYY HH:mm',
      )

      return response.json({
        loanId: result.updatedLoan.id,
        userId: result.loan.userId,
        inventoryCode: result.loan.book.inventoryCode,
        returnDate: formattedReturnDate,
        status: result.updatedLoan.status,
      })
    } catch (error) {
      return handleControllerError(error, response)
    }
  }

  index = async (_request: Request, response: Response) => {
    try {
      const loans = await this.loansRepository.findAll()

      return response.json(
        loans.map(loan => ({
          id: loan.id,
          userName: loan.user.name,
          bookTitle: loan.book.book.title,
          status: loan.status,
          loanDate: dayjs(loan.loanDate)
            .locale('pt-br')
            .format('DD/MM/YYYY HH:mm'),
          returnDate: loan.returnDate
            ? dayjs(loan.returnDate).locale('pt-br').format('DD/MM/YYYY HH:mm')
            : null,
        })),
      )
    } catch (error) {
      return handleControllerError(error, response)
    }
  }

  show = async (request: Request, response: Response) => {
    try {
      const paramsSchema = z.object({
        id: z.coerce.number(),
      })

      const { id } = paramsSchema.parse(request.params)

      const loanSelected = await this.loansRepository.findById(id)
      if (!loanSelected) {
        throw new AppError('Loan not found', HTTP_STATUS.NOT_FOUND)
      }

      return response.json({
        id: loanSelected.id,
        userName: loanSelected.user.name,
        bookTitle: loanSelected.book.book.title,
        inventoryCode: loanSelected.book.inventoryCode,
        status: loanSelected.status,
      })
    } catch (error) {
      return handleControllerError(error, response)
    }
  }
}

export { LoansController }
