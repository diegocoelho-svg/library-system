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
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/ForbiddenAdmin'
 *       404:
 *         description: Livro não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

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
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/ForbiddenAdmin'
 *       404:
 *         description: Cópia não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /booksCopy/{id}:
 *   delete:
 *     summary: Deletar cópia de livro (soft delete)
 *     description: Marca a cópia como deletada, preservando histórico (apenas administradores). Registra quem deletou e quando.
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
 *     responses:
 *       200:
 *         description: Cópia deletada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book copy deleted successfully!"
 *                 deletedCopy:
 *                   $ref: '#/components/schemas/BookCopy'
 *       400:
 *         description: Cópia já deletada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/ForbiddenAdmin'
 *       404:
 *         description: Cópia não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export {}
