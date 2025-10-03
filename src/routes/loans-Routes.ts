import { Router } from 'express'
import { LoansController } from '@/controllers/loans-controller'

import { ensureAuthenticated } from '@/middlewares/ensure-authenticated'
import { verifyUserAuthorization } from '@/middlewares/VerifyUserAuthorization'

const loansRoutes = Router()
const loansController = new LoansController()

loansRoutes.use(ensureAuthenticated, verifyUserAuthorization(['collaborator']))
loansRoutes.post('/', loansController.create)
loansRoutes.patch('/:id', loansController.update)
loansRoutes.get('/', loansController.index)
loansRoutes.get('/:id', loansController.show)

export { loansRoutes }
