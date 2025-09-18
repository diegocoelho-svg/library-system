/** biome-ignore-all lint/style/noMagicNumbers: required by Express controllers naming convention */
import { compare } from "bcrypt"
import type { Request, Response } from "express"
import { sign } from "jsonwebtoken"
import { z } from "zod"
import { authConfig } from "@/configs/auth"
import { HTTP_STATUS } from "@/constants/httpStatus"
import { prisma } from "@/database/prisma"
import { AppError } from "@/utils/AppError"

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
      throw new AppError("Invalid email or password", HTTP_STATUS.UNAUTHORIZED)
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new AppError("Invalid email or password", HTTP_STATUS.UNAUTHORIZED)
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({ role: user.role ?? "collaborator" }, secret, {
      subject: String(user.id),
      expiresIn,
    })

    const { password: _, ...userWithoutPassoword } = user

    return response.json({ token, ...userWithoutPassoword })
  }
}

export { SessionsController }
