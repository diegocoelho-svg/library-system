import type { Request, Response } from 'express'
import { z } from 'zod'
import { prisma } from '@/database/prisma'
import { AppError } from '@/utils/AppError'

class BooksController {
  async create(request: Request, response: Response) {
    const bodySchema = z
      .object({
        title: z
          .string()
          .trim()
          .refine(val => val === val.toUpperCase(), {
            message: 'Título deve estar em letras maiúsculas',
          }),
        author: z.string().trim().min(2),
        category: z.string().trim(),
        description: z.string().trim().max(500).optional(),
      })
      .strict()

    const { title, author, category, description } = bodySchema.parse(
      request.body,
    )

    const bookWithSameTitle = await prisma.book.findFirst({
      where: { title },
    })

    if (bookWithSameTitle) {
      throw new AppError('Book with same name already exists')
    }

    const book = await prisma.book.create({
      data: {
        title,
        author,
        category,
        description,
      },
    })

    response.json(book)
  }

  async index(_request: Request, response: Response) {
    const books = await prisma.book.findMany({
      include: {
        _count: { select: { copies: true } },
      },
    })

    return response.json(books)
  }

  async update(request: Request, response: Response) {
    const paramsSchema = z.object({
      id: z.coerce.number(),
    })

    const bodySchema = z
      .object({
        title: z
          .string()
          .trim()
          .refine(val => val === val.toUpperCase(), {
            message: 'Título deve estar em letras maiúsculas',
          }),
        author: z.string().trim().min(2),
        category: z.string().trim(),
        description: z.string().trim().max(500).optional(),
      })
      .strict()

    const { id } = paramsSchema.parse(request.params)
    const { title, author, category, description } = bodySchema.parse(
      request.body,
    )
  }
}

export { BooksController }
