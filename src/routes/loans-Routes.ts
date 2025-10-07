import { Router } from 'express'
import { LoansController } from '@/controllers/loans-controller'

import { ensureAuthenticated } from '@/middlewares/ensure-authenticated'
import { verifyUserAuthorization } from '@/middlewares/VerifyUserAuthorization'

const loansRoutes = Router()
const loansController = new LoansController()

loansRoutes.use(ensureAuthenticated, verifyUserAuthorization(['collaborator']))

/**
 * @swagger
 * /loans:
 *   post:
 *     summary: Criar novo empréstimo
 *     description: Cria um novo empréstimo de livro (apenas colaboradores)
 *     tags: [Empréstimos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - bookCopyId
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *                 description: ID do usuário que está fazendo o empréstimo
 *               bookCopyId:
 *                 type: integer
 *                 example: 1
 *                 description: ID da cópia do livro a ser emprestada
 *     responses:
 *       200:
 *         description: Empréstimo criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: integer
 *                   example: 1
 *                 inventoryCode:
 *                   type: string
 *                   example: "COOP_001"
 *                 username:
 *                   type: string
 *                   example: "João Silva"
 *                 bookCopyId:
 *                   type: integer
 *                   example: 1
 *                 loanDate:
 *                   type: string
 *                   example: "15/01/2024 14:30"
 *                 dueDate:
 *                   type: string
 *                   example: "14/05/2024 14:30"
 *                 status:
 *                   type: string
 *                   enum: [EMPRESTADO, DEVOLVIDO]
 *                   example: "EMPRESTADO"
 *       400:
 *         description: Dados inválidos ou livro não disponível
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Token de autenticação inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Acesso negado - apenas colaboradores
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
loansRoutes.post('/', loansController.create)

/**
 * @swagger
 * /loans:
 *   get:
 *     summary: Listar todos os empréstimos
 *     description: Retorna uma lista com todos os empréstimos (apenas colaboradores)
 *     tags: [Empréstimos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de empréstimos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   userName:
 *                     type: string
 *                     example: "João Silva"
 *                   bookTitle:
 *                     type: string
 *                     example: "O SENHOR DOS ANÉIS"
 *                   status:
 *                     type: string
 *                     enum: [EMPRESTADO, DEVOLVIDO]
 *                     example: "EMPRESTADO"
 *                   loanDate:
 *                     type: string
 *                     example: "15/01/2024 14:30"
 *                   returnDate:
 *                     type: string
 *                     nullable: true
 *                     example: "20/01/2024 10:15"
 *       401:
 *         description: Token de autenticação inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Acesso negado - apenas colaboradores
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
loansRoutes.get('/', loansController.index)

/**
 * @swagger
 * /loans/{id}:
 *   get:
 *     summary: Buscar empréstimo específico
 *     description: Retorna detalhes de um empréstimo específico (apenas colaboradores)
 *     tags: [Empréstimos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do empréstimo
 *     responses:
 *       200:
 *         description: Empréstimo encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 userName:
 *                   type: string
 *                   example: "João Silva"
 *                 bookTitle:
 *                   type: string
 *                   example: "O SENHOR DOS ANÉIS"
 *                 inventoryCode:
 *                   type: string
 *                   example: "COOP_001"
 *                 status:
 *                   type: string
 *                   enum: [EMPRESTADO, DEVOLVIDO]
 *                   example: "EMPRESTADO"
 *       401:
 *         description: Token de autenticação inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Acesso negado - apenas colaboradores
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Empréstimo não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
loansRoutes.get('/:id', loansController.show)

/**
 * @swagger
 * /loans/{id}:
 *   patch:
 *     summary: Devolver livro
 *     description: Marca um empréstimo como devolvido (apenas colaboradores)
 *     tags: [Empréstimos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do empréstimo
 *     responses:
 *       200:
 *         description: Livro devolvido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 loanId:
 *                   type: integer
 *                   example: 1
 *                 userId:
 *                   type: integer
 *                   example: 1
 *                 inventoryCode:
 *                   type: string
 *                   example: "COOP_001"
 *                 returnDate:
 *                   type: string
 *                   example: "20/01/2024 10:15"
 *                 status:
 *                   type: string
 *                   enum: [EMPRESTADO, DEVOLVIDO]
 *                   example: "DEVOLVIDO"
 *       400:
 *         description: Empréstimo já foi devolvido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Token de autenticação inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Acesso negado - apenas colaboradores
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Empréstimo não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
loansRoutes.patch('/:id', loansController.update)

export { loansRoutes }
