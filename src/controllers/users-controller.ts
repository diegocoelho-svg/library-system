import { Request, Response, } from "express"
import { AppError } from "@/utils/AppError"
import { prisma } from "@/database/prisma"
import { hash } from "bcrypt"
import { z } from "zod"

class UsersController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z.string().trim().min(2),
      matricula: z.number(),
      password: z.string().min(6)
    })

    const { name, matricula, password } = bodySchema.parse(request.body)

    const userWithSameRegistration = await prisma.user.findFirst({ where: { matricula } })

    if (userWithSameRegistration) {
      throw new AppError("User with same register already exists")
    }

    const hashedPassword = await hash(password, 8)

    const user = await prisma.user.create({
      data: {
        name,
        matricula,
        password: hashedPassword
      },
    })

    const { password:_, ...userWithoutPassword } = user

    return response.status(201).json(userWithoutPassword)
  }
}

export { UsersController }