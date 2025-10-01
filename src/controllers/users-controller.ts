/** biome-ignore-all lint/complexity/noCommaOperator: biome require this */
import { hash } from 'bcrypt'
import type { Request, Response } from 'express'
import { z } from 'zod'
import { HTTP_STATUS } from '@/constants/httpStatus'
import { prisma } from '@/database/prisma'
import { UserRole } from '@/generated/prisma'
import { AppError } from '@/utils/AppError'
import { handleControllerError } from '@/utils/HandleControllerError'

class UsersController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z.string().trim().min(2),
      matricula: z.number(),
      password: z.string().min(6),
    })

    const bodySafe = bodySchema.safeParse(request.body)

    if (!bodySafe.success) {
      const errorMessage = bodySafe.error.errors
        .map(err => `${err.path.join('.')}: ${err.message}`)
        .join(', ')

      throw new AppError(`Dados inválidos: ${errorMessage}`, 400)
    }

    const { name, matricula, password } = bodySafe.data

    const userWithSameRegistration = await prisma.user.findFirst({
      where: { matricula },
    })

    if (userWithSameRegistration) {
      throw new AppError('User with same register already exists')
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

  async index(_request: Request, response: Response) {
    const users = await prisma.user.findMany()

    return response.json(users)
  }

  async update(request: Request, response: Response) {
    try {
      const paramsSchema = z.object({
        id: z.coerce.number(),
      })

      const { id } = paramsSchema.parse(request.params)

      const bodySchema = z.object({
        name: z.string().trim().min(1).max(200).optional(),
        matricula: z.number().max(7).positive().optional(),
        role: z.enum(['administrator', 'collaborator']).optional(),
      })

      const bodySafe = bodySchema.safeParse(request.body)

      if (!bodySafe.success) {
        const errorMessage = bodySafe.error.errors.map(
          error => `${error.path.join('.')}: ${error.message}`,
        )

        throw new AppError(
          `Dados inválidos: ${errorMessage}`,
          HTTP_STATUS.BAD_REQUEST,
        )
      }

      const { name, matricula, role } = bodySafe.data

      const updatedUser = await prisma.user.update({
        data: {
          name,
          matricula,
          role,
        },
        where: {
          id,
        },
      })

      return response.json({
        message: 'Usuário atualizado com sucesso!',
        user: updatedUser,
      })
    } catch (error) {
      return handleControllerError(error, response)
    }
  }

  async delete(request: Request, response: Response) {
    const paramsSchema = z.object({
      id: z.coerce.number(),
    })

    const { id } = paramsSchema.parse(request.params)

    const loggedUserId = Number(request.user?.id)
    const loggedUserRole = request.user?.role

    if (loggedUserRole === UserRole.administrator && loggedUserId === id) {
      throw new AppError(
        `Administradores não podem excluir a si mesmos.`,
        HTTP_STATUS.FORBIDDEN,
      )
    }

    const userDeleted = await prisma.user.delete({
      where: { id },
    })

    return response.json({
      message: 'Usuário deletado com sucesso!',
      userDeleted,
    })
  }
}

export { UsersController }
