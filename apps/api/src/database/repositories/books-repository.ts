import { prisma } from '@/database/prisma'

type CreateBookDataProps = {
  title: string
  author: string
  category: string
  description?: string
}

type UpdateBookDataProps = Partial<CreateBookDataProps>

export class BooksRepository {
  async findByTitle(title: string) {
    return prisma.book.findFirst({ where: { title } })
  }

  async findAll() {
    return prisma.book.findMany()
  }

  async findById(id: number) {
    return prisma.book.findUnique({ where: { id } })
  }

  async findAllWithCopiesCount() {
    return prisma.book.findMany({
      include: {
        _count: { select: { copies: true } },
      },
    })
  }

  async create(data: CreateBookDataProps) {
    return prisma.book.create({ data })
  }

  async updateById(id: number, data: UpdateBookDataProps) {
    return prisma.book.update({
      where: { id },
      data,
    })
  }

  async deleteById(id: number) {
    return prisma.user.delete({ where: { id } })
  }
}
