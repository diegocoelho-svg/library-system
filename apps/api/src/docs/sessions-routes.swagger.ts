/**
 * @swagger
 * /sessions:
 *   post:
 *     summary: Autenticar usuário
 *     description: Realiza login do usuário e retorna token JWT
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - matricula
 *               - password
 *             properties:
 *               matricula:
 *                 type: integer
 *                 example: 1234567
 *                 description: Número da matrícula do usuário
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: "123456"
 *                 description: Senha do usuário
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                   description: Token JWT para autenticação
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "João Silva"
 *                 matricula:
 *                   type: integer
 *                   example: 1234567
 *                 role:
 *                   type: string
 *                   enum: [administrator, collaborator]
 *                   example: "collaborator"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       401:
 *         description: Credenciais inválidas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: "Invalid email or password"
 *               statusCode: 401
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export {}
