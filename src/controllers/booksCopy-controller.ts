import { Request, Response, NextFunction } from "express"
import { prisma } from "@/database/prisma"
import { z } from "zod"
import { AppError } from "@/utils/AppError"

class BooksCopyController {
  async create(request: Request, response: Response) {
    const paramsSchema = z.object({
      bookId: z.string().transform((val) => Number(val))
    })

    const { bookId } = paramsSchema.parse(request.params)

    const book = await prisma.book.findUnique({
      where: { id: bookId }
    })

    if (!book) {
      throw new AppError("Book not found", 404)
    }

    const copiesCount = await prisma.bookCopy.count({
      where: { bookId },
    })

    const nextNumber = copiesCount + 1
    const inventoryCode = `COOP_${String(nextNumber).padStart(3, "0")}`

    const copy = await prisma.bookCopy.create({
      data: {
        bookId,
        inventoryCode
      }
    })

    response.status(201).json(copy)
  }

  async index (request: Request, response: Response) {
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
}

export { BooksCopyController }