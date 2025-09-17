import { Request, Response, NextFunction } from "express"
import { JsonWebTokenError, TokenExpiredError, verify } from "jsonwebtoken"

import { authConfig } from "@/configs/auth"
import { AppError } from "@/utils/AppError"

interface TokenPayload {
  role: string
  sub: string
}

function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const authHeader = request.headers.authorization

    if (!authHeader) {
      throw new AppError("JWT token not found", 404)
    }

    const [, token] = authHeader.split(" ")

    const { role, sub: user_id } = verify(token, authConfig.jwt.secret) as TokenPayload

    request.user = {
      id: user_id,
      role,
    }

    return next()

  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new AppError("JWT token expired", 401)
    }

    if (error instanceof JsonWebTokenError) {
      throw new AppError("Invalid JWT token", 401)
    }

    throw new AppError("Authentication error", 401)
  }
}

export { ensureAuthenticated }