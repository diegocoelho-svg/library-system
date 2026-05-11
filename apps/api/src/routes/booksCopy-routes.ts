import { Router } from 'express'

import { BooksCopyController } from '@/controllers/booksCopy-controller'
import { ensureAuthenticated } from '@/middlewares/ensure-authenticated'
import { verifyUserAuthorization } from '@/middlewares/VerifyUserAuthorization'

const booksCopyRoutes = Router()
const booksCopyController = new BooksCopyController()

booksCopyRoutes.get('/', booksCopyController.index)
booksCopyRoutes.get('/:bookId', booksCopyController.show)

booksCopyRoutes.use(
  ensureAuthenticated,
  verifyUserAuthorization(['administrator']),
)

booksCopyRoutes.post('/:bookId/copies', booksCopyController.create)
booksCopyRoutes.patch('/:id', booksCopyController.update)
booksCopyRoutes.delete('/:id', booksCopyController.delete)

export { booksCopyRoutes }
