import { prisma } from '@/database/prisma'
import type { BookStatus } from '@/generated/prisma'

type bookCopyDataProps = {
  bookId: number
  inventoryCode: string
}

type UpdateBookCopyDataProps = {
  status?: BookStatus
}

export class BooksCopyRepository {
  async findById(id: number) {
    return prisma.bookCopy.findUnique({ where: { id } })
  }

  async findAll() {
    return prisma.bookCopy.findMany({
      include: {
        book: {
          select: {
            title: true,
            author: true,
          },
        },
      },
    })
  }

  async findAllByBookId(bookId: number) {
    return prisma.bookCopy.findMany({
      where: {
        bookId,
        deletedAt: null,
      },
    })
  }

  async create(data: bookCopyDataProps) {
    return prisma.bookCopy.create({
      data,
    })
  }

  async count() {
    return prisma.bookCopy.count()
  }

  async updateById(id: number, data: UpdateBookCopyDataProps) {
    return prisma.bookCopy.update({
      where: { id },
      data,
    })
  }

  async softDeleteById(id: number, deletedBy: number) {
    return prisma.bookCopy.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        deletedBy,
      },
    })
  }
}
