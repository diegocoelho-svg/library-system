import { Request, Response } from "express"
import { AppError } from "@/utils/AppError"
import { normalizeTitle } from "@/utils/normalize"
import { prisma } from "@/database/prisma"
import { z } from "zod"

class BooksController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      title: z.string().trim().refine(val => val === val.toUpperCase(), {
        message: "Título deve estar em letras maiúsculas"
      }),
      author: z.string().trim().min(2),
      category: z.string().trim(),
      description: z.string().trim().max(500).optional()
    }).strict()

    const { title, author, category, description } = bodySchema.parse(request.body)

    const normalizedTitle = normalizeTitle(title)
    
    const bookWithSameTitle = await prisma.book.findFirst({
      where: { normalizedTitle }
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
        description
      }
    })

    response.json(book)
  }
}

export { BooksController }