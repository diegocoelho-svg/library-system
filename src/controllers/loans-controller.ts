import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import type { Request, Response } from 'express'
import { z } from 'zod'
import { HTTP_STATUS } from '@/constants/httpStatus'
import { prisma } from '@/database/prisma'
import { AppError } from '@/utils/AppError'
import { handleControllerError } from '@/utils/HandleControllerError'

class LoansController {
  async create(request: Request, response: Response) {
    try {
      const bodySchema = z.object({
        userId: z.number(),
        bookCopyId: z.number(),
      })

      const { userId, bookCopyId } = bodySchema.parse(request.body)

      const result = await prisma.$transaction(async tx => {
        const user = await tx.user.findUnique({ where: { id: userId } })
        if (!user) {
          throw new AppError('User not found', HTTP_STATUS.NOT_FOUND)
        }

        const updatedCopies = await tx.bookCopy.updateMany({
          where: { id: bookCopyId, status: 'DISPONIVEL' },
          data: { status: 'INDISPONIVEL' },
        })
        if (updatedCopies.count === 0) {
          throw new AppError(
            'Book is not available for loan',
            HTTP_STATUS.BAD_REQUEST,
          )
        }

        const loan = await tx.loan.create({
          data: {
            userId,
            bookCopyId,
            loanDate: new Date(),
            dueDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000), // 120 days
            status: 'EMPRESTADO',
          },
        })

        await tx.loanHistory.create({
          data: {
            loanId: loan.id,
            status: 'EMPRESTADO',
          },
        })

        const bookCopy = await tx.bookCopy.findUnique({
          where: { id: bookCopyId },
        })

        return { loan, user, bookCopy }
      })

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

  async update(request: Request, response: Response) {
    try {
      const paramsSchema = z.object({
        id: z.coerce.number(),
      })

      const { id } = paramsSchema.parse(request.params)

      const result = await prisma.$transaction(async tx => {
        const loan = await tx.loan.findUnique({
          where: { id },
          include: {
            book: true,
          },
        })
        if (!loan) {
          throw new AppError('Loan not found', HTTP_STATUS.NOT_FOUND)
        }

        if (loan.status === 'DEVOLVIDO') {
          throw new AppError(
            'This loan has already been returned',
            HTTP_STATUS.BAD_REQUEST,
          )
        }

        const updatedLoan = await tx.loan.update({
          where: { id },
          data: {
            returnDate: new Date(),
            status: 'DEVOLVIDO',
          },
        })

        await tx.bookCopy.update({
          where: { id: loan.bookCopyId },
          data: { status: 'DISPONIVEL' },
        })

        await tx.loanHistory.create({
          data: {
            loanId: loan.id,
            status: 'DEVOLVIDO',
          },
        })

        return { updatedLoan, loan }
      })

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

  async index(_request: Request, response: Response) {
    try {
      const loans = await prisma.loan.findMany({
        orderBy: {
          status: 'asc',
        },
        include: {
          user: true,
          book: {
            include: {
              book: true,
            },
          },
        },
      })

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

  async show(request: Request, response: Response) {
    try {
      const paramsSchema = z.object({
        id: z.coerce.number(),
      })

      const { id } = paramsSchema.parse(request.params)

      const loanSelected = await prisma.loan.findUnique({
        where: { id },
        include: {
          user: true,
          book: {
            include: { book: true },
          },
        },
      })
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
