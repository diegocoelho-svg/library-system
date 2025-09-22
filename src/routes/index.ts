import { Router } from "express"
import { booksRoutes } from "./books-routes"
import { booksCopyRoutes } from "./booksCopy-routes"
import { sessionsRoutes } from "./sessions-routes"
import { usersRoutes } from "./users-routes"

const routes = Router()
routes.use("/users", usersRoutes)
routes.use("/sessions", sessionsRoutes)
routes.use("/books", booksRoutes)
routes.use("/booksCopy", booksCopyRoutes)

export { routes }
