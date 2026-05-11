import express from 'express'
import 'express-async-errors'
import { setupSwagger } from './configs/swagger'

import errorHandling from './middlewares/error-handling'
import { routes } from './routes'

const app = express()

app.use(express.json())
app.use(routes)

setupSwagger(app)

app.use(errorHandling)

export { app }
