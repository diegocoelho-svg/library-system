import { Router } from 'express'

import { LoansHistoryController } from '@/controllers/loansHistory-controller'

const loansHistoryRoutes = Router()
const loansHistoryController = new LoansHistoryController()

/**
 * @swagger
 * /loansHistory:
 *   get:
 *     summary: Listar histórico de empréstimos
 *     description: Retorna o histórico completo de todos os empréstimos realizados
 *     tags: [Histórico de Empréstimos]
 *     responses:
 *       200:
 *         description: Histórico de empréstimos retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LoanHistory'
 *       404:
 *         description: Nenhum histórico encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: "Não há históricos de empréstimos"
 *               statusCode: 404
 */
loansHistoryRoutes.get('/', loansHistoryController.index)

export { loansHistoryRoutes }
