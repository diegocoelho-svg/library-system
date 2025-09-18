import type { Request, Response } from "express"
import { z } from "zod"
import { HTTP_STATUS } from "@/constants/httpStatus"
import { prisma } from "@/database/prisma"
import { AppError } from "@/utils/AppError"
import { checkSimilarBookTitle } from "@/utils/fuzzyCheck"
import { normalizeTitle } from "@/utils/normalize"

class BooksController {
  async create(request: Request, response: Response) {
    const bodySchema = z
      .object({
        title: z
          .string()
          .trim()
          .refine((val) => val === val.toUpperCase(), {
            message: "Título deve estar em letras maiúsculas",
          }),
        author: z.string().trim().min(2),
        category: z.string().trim(),
        description: z
          .string()
          .trim()
          .max(HTTP_STATUS.INTERNAL_ERROR)
          .optional(),
      })
      .strict()

    const { title, author, category, description } = bodySchema.parse(
      request.body
    )

    await checkSimilarBookTitle(title)

    const normalizedTitle = normalizeTitle(title)

    const bookWithSameTitle = await prisma.book.findFirst({
      where: { normalizedTitle },
    })

    if (bookWithSameTitle) {
      throw new AppError("Book with same name already exists")
    }

    const book = await prisma.book.create({
      data: {
        title,
        normalizedTitle,
        author,
        category,
        description,
      },
    })

    response.json(book)
  }

  async index(response: Response) {
    const books = await prisma.book.findMany({
      orderBy: {
        id: "asc",
      },
    })

    return response.json(books)
  }
}

export { BooksController }
