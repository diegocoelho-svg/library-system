import { Router } from 'express'

import { UsersController } from '@/controllers/users-controller'
import { ensureAuthenticated } from '@/middlewares/ensure-authenticated'
import { verifyUserAuthorization } from '@/middlewares/VerifyUserAuthorization'

const usersRoutes = Router()
const usersController = new UsersController()

usersRoutes.post('/', usersController.create)
usersRoutes.get('/', usersController.index)
usersRoutes.use(ensureAuthenticated, verifyUserAuthorization(['administrator']))
usersRoutes.patch('/:id', usersController.update)
usersRoutes.delete('/:id', usersController.delete)

export { usersRoutes }
