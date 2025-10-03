import { Router } from 'express'

import { LoansHistoryController } from '@/controllers/loansHistory-controller'

const loansHistoryRoutes = Router()
const loansHistoryController = new LoansHistoryController()

loansHistoryRoutes.get('/', loansHistoryController.index)

export { loansHistoryRoutes }
