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

      const user = await prisma.user.findUnique({ where: { id: userId } })
      if (!user) {
        throw new AppError('Usuário não encontrado', HTTP_STATUS.NOT_FOUND)
      }

      const bookCopy = await prisma.bookCopy.findUnique({
        where: { id: bookCopyId },
      })
      if (!bookCopy) {
        throw new AppError('Cópia não encontrada', HTTP_STATUS.NOT_FOUND)
      }

      if (bookCopy.status !== 'DISPONIVEL') {
        throw new AppError(
          'Livro não está disponível para empréstimo',
          HTTP_STATUS.BAD_REQUEST,
        )
      }

      const loan = await prisma.loan.create({
        data: {
          userId,
          bookCopyId,
          loanDate: new Date(),
          dueDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000), // 120 dias
          status: 'EMPRESTADO',
        },
      })

      await prisma.bookCopy.update({
        where: { id: bookCopyId },
        data: { status: 'RESERVADO' },
      })

      await prisma.loanHistory.create({
        data: {
          loanId: loan.id,
          status: 'EMPRESTADO',
        },
      })

      const formattedLoanDate = dayjs(loan.loanDate).format('DD/MM/YYYY HH:mm')
      const formattedDueDate = dayjs(loan.dueDate).format('DD/MM/YYYY HH:mm')

      return response.json({
        userId: loan.userId,
        inventoryCode: bookCopy.inventoryCode,
        username: user.name,
        bookCopyId: loan.bookCopyId,
        loanDate: formattedLoanDate,
        dueDate: formattedDueDate,
        status: loan.status,
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

      const loan = await prisma.loan.findUnique({
        where: { id },
        include: {
          book: true,
        },
      })
      if (!loan) {
        throw new AppError('Empréstimo não encontrado', HTTP_STATUS.NOT_FOUND)
      }

      if (loan.status === 'DEVOLVIDO') {
        throw new AppError(
          'Esse empréstimo já foi devolvido',
          HTTP_STATUS.BAD_REQUEST,
        )
      }

      const updatedLoan = await prisma.loan.update({
        where: { id },
        data: {
          returnDate: new Date(),
          status: 'DEVOLVIDO',
        },
      })

      await prisma.bookCopy.update({
        where: { id: loan.bookCopyId },
        data: { status: 'DISPONIVEL' },
      })

      await prisma.loanHistory.create({
        data: {
          loanId: loan.id,
          status: 'DEVOLVIDO',
        },
      })

      const formattedReturnDate = dayjs(updatedLoan.returnDate).format(
        'DD/MM/YYYY HH:mm',
      )

      return response.json({
        loanId: updatedLoan.id,
        userId: loan.userId,
        inventoryCode: loan.book.inventoryCode,
        returnDate: formattedReturnDate,
        status: updatedLoan.status,
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
