import { Router } from 'express'

import { BooksController } from '@/controllers/books-controller'

import { ensureAuthenticated } from '@/middlewares/ensure-authenticated'
import { verifyUserAuthorization } from '@/middlewares/VerifyUserAuthorization'

const booksRoutes = Router()
const booksController = new BooksController()

booksRoutes.get('/', booksController.index)
booksRoutes.use(ensureAuthenticated, verifyUserAuthorization(['administrator']))
booksRoutes.patch('/:id', booksController.update)
booksRoutes.post('/', booksController.create)

export { booksRoutes }
