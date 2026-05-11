import { prisma } from '@/database/prisma'

export class LoansHistoryRepository {
  async findAll() {
    return prisma.loanHistory.findMany()
  }
}
