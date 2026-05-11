import { HTTP_STATUS } from '@/constants/httpStatus'
import { prisma } from '@/database/prisma'
import { AppError } from '@/utils/AppError'

type CreateLoanDataProps = {
  userId: number
  bookCopyId: number
}

const LOAN_DURATION_DAYS = 120
const MS_PER_DAY = 24 * 60 * 60 * 1000

export class LoansRepository {
  async create(data: CreateLoanDataProps) {
    return prisma.$transaction(async tx => {
      const user = await tx.user.findUnique({ where: { id: data.userId } })
      if (!user) {
        throw new AppError('User not found', HTTP_STATUS.NOT_FOUND)
      }

      const updatedCopies = await tx.bookCopy.updateMany({
        where: { id: data.bookCopyId, status: 'DISPONIVEL' },
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
          userId: data.userId,
          bookCopyId: data.bookCopyId,
          loanDate: new Date(),
          dueDate: new Date(Date.now() + LOAN_DURATION_DAYS * MS_PER_DAY),
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
        where: { id: data.bookCopyId },
      })

      return { loan, user, bookCopy }
    })
  }

  async returnById(id: number) {
    return prisma.$transaction(async tx => {
      const loan = await tx.loan.findUnique({
        where: { id },
        include: { book: true },
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
  }

  async findAll() {
    return prisma.loan.findMany({
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
  }

  async findById(id: number) {
    return prisma.loan.findUnique({
      where: { id },
      include: {
        user: true,
        book: {
          include: { book: true },
        },
      },
    })
  }
}
