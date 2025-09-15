import { Request, Response } from "express"
import { authConfig } from "@/configs/auth"
import { AppError } from "@/utils/AppError"
import { compare } from "bcrypt"
import { prisma } from "@/database/prisma"
import { z } from "zod"
import { sign } from "jsonwebtoken"

class SessionsController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      matricula: z.number(),
      password: z.string().min(6),
    })

    const { matricula, password } = bodySchema.parse(request.body)

    const user = await prisma.user.findFirst({
      where: { matricula },
    })

    if (!user) {
      throw new AppError("Invalid email or password", 401)
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new AppError("Invalid email or password", 401)
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({ role: user.role ?? "collaborator" }, secret, {
      subject: String(user.id),
      expiresIn
    })

    const { password: hashedPassword, ...userWithoutPassoword } = user

    return response.json({ token, ...userWithoutPassoword })
  }
}

export { SessionsController }