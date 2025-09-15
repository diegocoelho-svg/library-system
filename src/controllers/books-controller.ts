import { Request, Response } from "express"

class BooksController {
  create(request: Request, response: Response) {
    response.json({ message: "ok" })
  }
}

export { BooksController }