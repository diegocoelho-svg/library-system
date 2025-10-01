/** biome-ignore-all lint/style/noMagicNumbers: required by Express controllers naming convention */
import type { Request, Response } from 'express'
import { z } from 'zod'
import { HTTP_STATUS } from '@/constants/httpStatus'
import { prisma } from '@/database/prisma'
import { AppError } from '@/utils/AppError'
import { handleControllerError } from '@/utils/HandleControllerError'

class BooksCopyController {
  async create(request: Request, response: Response) {
    const paramsSchema = z.object({
      bookId: z
        .string()
        .transform(val => Number(val))
        .pipe(z.number().int().positive()),
    })

    try {
      // throw new AppError("Custom Error")
      const { bookId } = paramsSchema.parse(request.params)

      const book = await prisma.book.findUnique({
        where: { id: bookId },
      })

      if (!book) {
        throw new AppError('Book not found', HTTP_STATUS.NOT_FOUND)
      }

      const copiesCount = await prisma.bookCopy.count()

      const nextNumber = copiesCount + 1
      const inventoryCode = `COOP_${String(nextNumber).padStart(3, '0')}`

      const copy = await prisma.bookCopy.create({
        data: {
          bookId,
          inventoryCode,
        },
      })

      response.status(HTTP_STATUS.CREATED).json(copy)
    } catch (error) {
      if (error instanceof AppError) {
        return response
          .status(error.statusCode || HTTP_STATUS.BAD_REQUEST)
          .json({ message: error.message })
      }
      return response
        .status(HTTP_STATUS.INTERNAL_ERROR)
        .json({ message: 'Internal Server Error' })
    }
  }

  async index(_request: Request, response: Response) {
    const copies = await prisma.bookCopy.findMany({
      include: {
        book: {
          select: {
            title: true,
            author: true,
          },
        },
      },
    })

    return response.json(copies)
  }

  async show(request: Request, response: Response) {
    const paramsSchema = z.object({
      bookId: z.coerce.number(),
    })

    try {
      const { bookId } = paramsSchema.parse(request.params)

      const bookSelected = await prisma.bookCopy.findMany({
        where: { bookId },
      })

      if (bookSelected.length === 0) {
        throw new AppError('Book not found', HTTP_STATUS.NOT_FOUND)
      }

      return response.json(bookSelected)
    } catch (error) {
      if (error instanceof AppError) {
        return response
          .status(error.statusCode || HTTP_STATUS.BAD_REQUEST)
          .json({ message: error.message })
      }

      return response.status(500).json({ message: 'Internal Server Error' })
    }
  }

  async update(request: Request, response: Response) {
    try {
      const paramsSchema = z.object({
        id: z.coerce.number(),
      })

      const bodySchema = z.object({
        status: z.enum(['DISPONIVEL', 'RESERVADO', 'INDISPONIVEL']),
      })

      const { id } = paramsSchema.parse(request.params)
      const { status } = bodySchema.parse(request.body)

      const copy = await prisma.bookCopy.findUnique({ where: { id } })

      if (!copy) {
        throw new AppError('Book copy not found', HTTP_STATUS.NOT_FOUND)
      }

      const updatedCopy = await prisma.bookCopy.update({
        where: { id },
        data: { status },
      })

      return response.json(updatedCopy)
    } catch (error) {
      return handleControllerError(error, response)
    }
  }
}

export { BooksCopyController }
