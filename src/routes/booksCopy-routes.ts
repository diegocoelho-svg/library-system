import { Router } from 'express'

import { BooksCopyController } from '@/controllers/booksCopy-controller'
import { ensureAuthenticated } from '@/middlewares/ensure-authenticated'
import { verifyUserAuthorization } from '@/middlewares/VerifyUserAuthorization'

const booksCopyRoutes = Router()
const booksCopyController = new BooksCopyController()

/**
 * @swagger
 * /booksCopy:
 *   get:
 *     summary: Listar todas as cópias de livros
 *     description: Retorna uma lista com todas as cópias de livros cadastradas
 *     tags: [Cópias de Livros]
 *     responses:
 *       200:
 *         description: Lista de cópias retornada com sucesso
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
 *                   inventoryCode:
 *                     type: string
 *                     example: "COOP_001"
 *                   status:
 *                     type: string
 *                     enum: [DISPONIVEL, RESERVADO, INDISPONIVEL]
 *                     example: "DISPONIVEL"
 *                   bookId:
 *                     type: integer
 *                     example: 1
 *                   book:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: "O SENHOR DOS ANÉIS"
 *                       author:
 *                         type: string
 *                         example: "J.R.R. Tolkien"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 */
booksCopyRoutes.get('/', booksCopyController.index)

/**
 * @swagger
 * /booksCopy/{bookId}:
 *   get:
 *     summary: Listar cópias de um livro específico
 *     description: Retorna todas as cópias de um livro específico
 *     tags: [Cópias de Livros]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do livro
 *     responses:
 *       200:
 *         description: Lista de cópias do livro retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BookCopy'
 *       404:
 *         description: Livro não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
booksCopyRoutes.get('/:bookId', booksCopyController.show)

booksCopyRoutes.use(
  ensureAuthenticated,
  verifyUserAuthorization(['administrator']),
)

/**
 * @swagger
 * /booksCopy/{bookId}/copies:
 *   post:
 *     summary: Criar nova cópia de livro
 *     description: Cria uma nova cópia de um livro existente (apenas administradores)
 *     tags: [Cópias de Livros]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do livro
 *     responses:
 *       201:
 *         description: Cópia criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookCopy'
 *       401:
 *         description: Token de autenticação inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Acesso negado - apenas administradores
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Livro não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
booksCopyRoutes.post('/:bookId/copies', booksCopyController.create)

/**
 * @swagger
 * /booksCopy/{id}:
 *   patch:
 *     summary: Atualizar status da cópia
 *     description: Atualiza o status de uma cópia de livro (apenas administradores)
 *     tags: [Cópias de Livros]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da cópia do livro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [DISPONIVEL, RESERVADO, INDISPONIVEL]
 *                 example: "DISPONIVEL"
 *                 description: Novo status da cópia
 *     responses:
 *       200:
 *         description: Cópia atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookCopy'
 *       400:
 *         description: Dados inválidos
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
 *         description: Acesso negado - apenas administradores
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Cópia não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
booksCopyRoutes.patch('/:id', booksCopyController.update)

export { booksCopyRoutes }
