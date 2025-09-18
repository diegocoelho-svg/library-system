/** biome-ignore-all lint/style/noMagicNumbers: required by Express controllers naming convention */
import { hash } from "bcrypt"
import type { Request, Response } from "express"
import { z } from "zod"
import { HTTP_STATUS } from "@/constants/httpStatus"
import { prisma } from "@/database/prisma"
import { AppError } from "@/utils/AppError"

class UsersController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z.string().trim().min(2),
      matricula: z.number(),
      password: z.string().min(6),
    })

    const { name, matricula, password } = bodySchema.parse(request.body)

    const userWithSameRegistration = await prisma.user.findFirst({
      where: { matricula },
    })

    if (userWithSameRegistration) {
      throw new AppError("User with same register already exists")
    }

    const hashedPassword = await hash(password, 8)

    const user = await prisma.user.create({
      data: {
        name,
        matricula,
        password: hashedPassword,
      },
    })

    const { password: _, ...userWithoutPassword } = user

    return response.status(HTTP_STATUS.CREATED).json(userWithoutPassword)
  }
}

export { UsersController }
