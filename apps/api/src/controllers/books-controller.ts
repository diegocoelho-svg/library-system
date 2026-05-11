import type { Request, Response } from 'express'
import { z } from 'zod'
import { HTTP_STATUS } from '@/constants/httpStatus'
import { BooksRepository } from '@/database/repositories/books-repository'
import { AppError } from '@/utils/AppError'
import { handleControllerError } from '@/utils/HandleControllerError'

class BooksController {
  private booksRepository = new BooksRepository()

  create = async (request: Request, response: Response) => {
    const bodySchema = z
      .object({
        title: z
          .string()
          .trim()
          .min(1, 'Title is required')
          .max(200, 'Title is too long')
          .refine(val => val === val.toUpperCase(), {
            message: 'Title must be in uppercase letters',
          }),
        author: z
          .string()
          .trim()
          .min(2)
          .max(100, 'Author name is too long')
          .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Author name must contain only letters'),
        category: z.string().trim().min(1, 'Category is required'),
        description: z.string().trim().max(500).optional(),
      })
      .strict()

    const { title, author, category, description } = bodySchema.parse(
      request.body,
    )

    const bookWithSameTitle = await this.booksRepository.findByTitle(title)

    if (bookWithSameTitle) {
      throw new AppError('Book with same name already exists')
    }

    const book = await this.booksRepository.create({
      title,
      author,
      category,
      description,
    })

    response.json(book)
  }

  index = async (_request: Request, response: Response) => {
    const books = await this.booksRepository.findAllWithCopiesCount()

    return response.json(books)
  }

  update = async (request: Request, response: Response) => {
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
            .min(1, 'Title is required')
            .max(200, 'Title is too long')
            .refine(val => val === val.toUpperCase(), {
              message: 'Title must be in uppercase letters',
            })
            .optional(),
          author: z
            .string()
            .trim()
            .min(2)
            .max(100, 'Author name is too long')
            .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Author name must contain only letters')
            .optional(),
          category: z.string().trim().min(1, 'Category is required').optional(),
          description: z.string().trim().max(500).optional().optional(),
        })
        .strict()

      const { id } = paramsSchema.parse(request.params)

      const bodySafe = bodySchema.safeParse(request.body)

      if (!bodySafe.success) {
        const errorMessage = bodySafe.error.errors
          .map(error => `${error.path.join('.')}: ${error.message}`)
          .join(', ')

        throw new AppError(
          `Invalid data: ${errorMessage}`,
          HTTP_STATUS.BAD_REQUEST,
        )
      }

      const { title, author, category, description } = bodySafe.data

      const updatedBook = await this.booksRepository.updateById(id, {
        author,
        category,
        title,
        description,
      })

      return response.json(updatedBook)
    } catch (error) {
      return handleControllerError(error, response)
    }
  }
}

export { BooksController }
