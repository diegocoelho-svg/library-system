import { prisma } from '@/database/prisma'
import type { UserRole } from '@/generated/prisma'

type CreateUserDataProps = {
  name: string
  matricula: number
  password: string
}

type UpdateUserDataProps = {
  name?: string
  matricula?: number
  role?: UserRole
}

export class UsersRepository {
  async findByMatricula(matricula: number) {
    return prisma.user.findFirst({ where: { matricula } })
  }

  async findAll() {
    return prisma.user.findMany()
  }

  async create(data: CreateUserDataProps) {
    return prisma.user.create({ data })
  }

  async updateById(id: number, data: UpdateUserDataProps) {
    return prisma.user.update({
      where: { id },
      data,
    })
  }

  async deleteById(id: number) {
    return prisma.user.delete({ where: { id } })
  }
}
