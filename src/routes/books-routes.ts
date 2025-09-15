import { Router } from "express"

import { BooksController } from "@/controllers/books-controller"

const booksRoutes = Router()
const booksController = new BooksController()

booksRoutes.post("/", booksController.create)

export { booksRoutes }