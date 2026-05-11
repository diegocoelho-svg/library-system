import { Router } from 'express'
import { booksRoutes } from './books-routes'
import { booksCopyRoutes } from './booksCopy-routes'
import { loansRoutes } from './loans-Routes'
import { loansHistoryRoutes } from './loansHistory-routes'
import { sessionsRoutes } from './sessions-routes'
import { usersRoutes } from './users-routes'

const routes = Router()
routes.use('/users', usersRoutes)
routes.use('/sessions', sessionsRoutes)
routes.use('/books', booksRoutes)
routes.use('/booksCopy', booksCopyRoutes)
routes.use('/loans', loansRoutes)
routes.use('/loansHistory', loansHistoryRoutes)

export { routes }
