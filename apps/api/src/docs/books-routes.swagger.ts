/**
 * @swagger
 * /books:
 *   get:
 *     summary: Listar todos os livros
 *     description: Retorna uma lista com todos os livros cadastrados e quantidade de cópias
 *     tags: [Livros]
 *     responses:
 *       200:
 *         description: Lista de livros retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Criar novo livro
 *     description: Cria um novo livro no sistema (apenas administradores)
 *     tags: [Livros]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 200
 *                 example: "O SENHOR DOS ANÉIS"
 *                 description: Título do livro (deve estar em maiúsculas)
 *               author:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 100
 *                 pattern: "^[a-zA-ZÀ-ÿ\\s]+$"
 *                 example: "J.R.R. Tolkien"
 *                 description: Nome do autor (apenas letras e espaços)
 *               category:
 *                 type: string
 *                 minLength: 1
 *                 example: "Fantasia"
 *                 description: Categoria do livro
 *               description:
 *                 type: string
 *                 maxLength: 500
 *                 example: "Uma aventura épica na Terra Média"
 *                 description: Descrição do livro (opcional)
 *     responses:
 *       201:
 *         description: Livro criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Dados inválidos ou livro com mesmo título já existe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/ForbiddenAdmin'
 */

/**
 * @swagger
 * /books/{id}:
 *   patch:
 *     summary: Atualizar livro
 *     description: Atualiza dados de um livro existente (apenas administradores)
 *     tags: [Livros]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do livro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 200
 *                 example: "O SENHOR DOS ANÉIS - TRILOGIA COMPLETA"
 *                 description: Título do livro (deve estar em maiúsculas)
 *               author:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 100
 *                 pattern: "^[a-zA-ZÀ-ÿ\\s]+$"
 *                 example: "J.R.R. Tolkien"
 *                 description: Nome do autor (apenas letras e espaços)
 *               category:
 *                 type: string
 *                 minLength: 1
 *                 example: "Fantasia Épica"
 *                 description: Categoria do livro
 *               description:
 *                 type: string
 *                 maxLength: 500
 *                 example: "A trilogia completa da Terra Média"
 *                 description: Descrição do livro
 *     responses:
 *       200:
 *         description: Livro atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
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
 *         description: Livro não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export {}
