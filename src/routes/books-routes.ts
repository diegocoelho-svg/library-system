import { Router } from "express"

import { BooksController } from "@/controllers/books-controller"

import { ensureAuthenticated } from "@/middlewares/ensure-authenticated"
import { verifyUserAuthorization } from "@/middlewares/VerifyUserAuthorization"

const booksRoutes = Router()
const booksController = new BooksController()

booksRoutes.use(ensureAuthenticated, verifyUserAuthorization(["administrator"]))
booksRoutes.post("/", booksController.create)
booksRoutes.get("/", booksController.index)

export { booksRoutes }