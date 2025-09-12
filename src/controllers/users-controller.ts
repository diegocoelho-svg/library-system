import { Request, Response, } from "express"
import { z } from "zod"

class UsersController {
  create(request: Request, response: Response) {
    return response.json({ message: "ok" })
  }
}

export { UsersController }