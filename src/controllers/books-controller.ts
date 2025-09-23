import type { Request, Response } from 'express'
import { z } from 'zod'
import { HTTP_STATUS } from '@/constants/httpStatus'
import { prisma } from '@/database/prisma'
import { AppError } from '@/utils/AppError'

class BooksController {
  async create(request: Request, response: Response) {
    const bodySchema = z
      .object({
        title: z
          .string()
          .trim()
          .min(1, 'Título é obrigatório')
          .max(200, 'Título muito longo')
          .refine(val => val === val.toUpperCase(), {
            message: 'Título deve estar em letras maiúsculas',
          }),
        author: z
          .string()
          .trim()
          .min(2)
          .max(100, 'Nome do autor muito longo')
          .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Nome do autor deve conter apenas letras'),
        category: z.string().trim().min(1, 'Categoria é obrigatória'),
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
    try {
      // throw new AppError("Custom Error")
      const paramsSchema = z.object({
        id: z.coerce.number(),
      })

      const bodySchema = z
        .object({
          title: z
            .string()
            .trim()
            .min(1, 'Título é obrigatório')
            .max(200, 'Título muito longo')
            .refine(val => val === val.toUpperCase(), {
              message: 'Título deve estar em letras maiúsculas',
            })
            .optional(),
          author: z
            .string()
            .trim()
            .min(2)
            .max(100, 'Nome do autor muito longo')
            .regex(
              /^[a-zA-ZÀ-ÿ\s]+$/,
              'Nome do autor deve conter apenas letras',
            )
            .optional(),
          category: z
            .string()
            .trim()
            .min(1, 'Categoria é obrigatória')
            .optional(),
          description: z.string().trim().max(500).optional().optional(),
        })
        .strict()

      const { id } = paramsSchema.parse(request.params)

      const bodySafe = bodySchema.safeParse(request.body)

      if (!bodySafe.success) {
        const errorMessage = bodySafe.error.errors
          .map(err => `${err.path.join('.')}: ${err.message}`)
          .join(', ')

        throw new AppError(`Dados inválidos: ${errorMessage}`, 400)
      }

      const { title, author, category, description } = bodySafe.data

      const updatedBook = await prisma.book.update({
        data: {
          author,
          category,
          description,
          title,
        },
        where: {
          id,
        },
      })
      return response.json(updatedBook)
    } catch (error) {
      if (error instanceof AppError) {
        return response
          .status(error.statusCode || HTTP_STATUS.BAD_REQUEST)
          .json({ message: error.message })
      }
      return response.status(500).json({ message: 'Erro interno do servidor' })
    }
  }
}

export { BooksController }
