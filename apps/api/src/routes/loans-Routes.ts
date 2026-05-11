import { Router } from 'express'
import { LoansController } from '@/controllers/loans-controller'

import { ensureAuthenticated } from '@/middlewares/ensure-authenticated'

const loansRoutes = Router()
const loansController = new LoansController()

loansRoutes.use(ensureAuthenticated)

loansRoutes.post('/', loansController.create)
loansRoutes.get('/', loansController.index)
loansRoutes.get('/:id', loansController.show)
loansRoutes.patch('/:id', loansController.update)

export { loansRoutes }
