import type { Request, Response } from 'express'
import { z } from 'zod'
import { HTTP_STATUS } from '@/constants/httpStatus'
import { BooksRepository } from '@/database/repositories/books-repository'
import { BooksCopyRepository } from '@/database/repositories/booksCopy-repository'
import { AppError } from '@/utils/AppError'
import { handleControllerError } from '@/utils/HandleControllerError'

class BooksCopyController {
  private booksCopyRepository = new BooksCopyRepository()
  private booksRepository = new BooksRepository()

  create = async (request: Request, response: Response) => {
    try {
      // throw new AppError("Custom Error")
      const paramsSchema = z.object({
        bookId: z
          .string()
          .transform(val => Number(val))
          .pipe(z.number().int().positive()),
      })

      const { bookId } = paramsSchema.parse(request.params)

      const book = await this.booksRepository.findById(bookId)

      if (!book) {
        throw new AppError('Book not found', HTTP_STATUS.NOT_FOUND)
      }

      const copiesCount = await this.booksCopyRepository.count()

      const nextNumber = copiesCount + 1
      const inventoryCode = `COOP_${String(nextNumber).padStart(3, '0')}`

      const copy = await this.booksCopyRepository.create({
        bookId,
        inventoryCode,
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

  index = async (_request: Request, response: Response) => {
    try {
      const copies = await this.booksCopyRepository.findAll()

      return response.json(copies)
    } catch (error) {
      return handleControllerError(error, response)
    }
  }

  show = async (request: Request, response: Response) => {
    try {
      const paramsSchema = z.object({
        bookId: z.coerce.number(),
      })
      const { bookId } = paramsSchema.parse(request.params)

      const bookSelected =
        await this.booksCopyRepository.findAllByBookId(bookId)

      if (bookSelected.length === 0) {
        throw new AppError('Book not found', HTTP_STATUS.NOT_FOUND)
      }

      return response.json(bookSelected)
    } catch (error) {
      return handleControllerError(error, response)
    }
  }

  update = async (request: Request, response: Response) => {
    try {
      const paramsSchema = z.object({
        id: z.coerce.number(),
      })

      const bodySchema = z.object({
        status: z.enum(['DISPONIVEL', 'RESERVADO', 'INDISPONIVEL']),
      })

      const { id } = paramsSchema.parse(request.params)
      const { status } = bodySchema.parse(request.body)

      const copy = await this.booksCopyRepository.findById(id)

      if (!copy) {
        throw new AppError('Book copy not found', HTTP_STATUS.NOT_FOUND)
      }

      const updatedCopy = await this.booksCopyRepository.updateById(id, {
        status,
      })

      return response.json(updatedCopy)
    } catch (error) {
      return handleControllerError(error, response)
    }
  }

  delete = async (request: Request, response: Response) => {
    try {
      const paramsSchema = z.object({
        id: z.coerce.number(),
      })

      const { id } = paramsSchema.parse(request.params)

      const copy = await this.booksCopyRepository.findById(id)

      if (!copy) {
        throw new AppError('Book copy not found', HTTP_STATUS.NOT_FOUND)
      }

      if (copy.deletedAt) {
        throw new AppError('Book copy already deleted', HTTP_STATUS.BAD_REQUEST)
      }

      const deletedBy = Number(request.user?.id)

      const deletedCopy = await this.booksCopyRepository.softDeleteById(
        id,
        deletedBy,
      )

      return response.json({
        message: 'Book copy deleted successfully!',
        deletedCopy,
      })
    } catch (error) {
      return handleControllerError(error, response)
    }
  }
}

export { BooksCopyController }
