import type { Express } from 'express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Library System API',
      version: '1.0.0',
      description:
        'API completa para sistema de biblioteca com gerenciamento de colaboradores, livros, empréstimos e histórico',
      contact: {
        name: 'Diego Coelho',
        email: 'diego.vinicius003@cs.cruzeirodosul.edu.br',
      },
    },
    servers: [
      {
        url: 'http://localhost:3333',
        description: 'Servidor local de desenvolvimento',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Token JWT para autenticação',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'João Silva' },
            matricula: { type: 'integer', example: 1234567 },
            role: {
              type: 'string',
              enum: ['administrator', 'collaborator'],
              example: 'collaborator',
            },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Book: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            title: { type: 'string', example: 'O SENHOR DOS ANÉIS' },
            author: { type: 'string', example: 'J.R.R. Tolkien' },
            category: { type: 'string', example: 'Fantasia' },
            description: { type: 'string', example: 'Uma aventura épica...' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
            _count: {
              type: 'object',
              properties: {
                copies: { type: 'integer', example: 3 },
              },
            },
          },
        },
        BookCopy: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            inventoryCode: { type: 'string', example: 'LIV001' },
            status: {
              type: 'string',
              enum: ['DISPONIVEL', 'INDISPONIVEL'],
              example: 'DISPONIVEL',
            },
            bookId: { type: 'integer', example: 1 },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Loan: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            userId: { type: 'integer', example: 1 },
            bookCopyId: { type: 'integer', example: 1 },
            loanDate: { type: 'string', format: 'date-time' },
            dueDate: { type: 'string', format: 'date-time' },
            returnDate: { type: 'string', format: 'date-time', nullable: true },
            status: {
              type: 'string',
              enum: ['EMPRESTADO', 'DEVOLVIDO'],
              example: 'EMPRESTADO',
            },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        LoanHistory: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            loanId: { type: 'integer', example: 1 },
            status: {
              type: 'string',
              enum: ['EMPRESTADO', 'DEVOLVIDO'],
              example: 'EMPRESTADO',
            },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Erro na operação' },
            statusCode: { type: 'integer', example: 400 },
          },
        },
      },
      responses: {
        Unauthorized: {
          description: 'Token de autenticação inválido',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
            },
          },
        },
        ForbiddenAdmin: {
          description: 'Acesso negado - apenas administradores',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
            },
          },
        },
        ForbiddenCollaborator: {
          description: 'Acesso negado - apenas colaboradores',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/docs/*.swagger.ts'],
}

export const swaggerSpec = swaggerJsdoc(options)

export function setupSwagger(app: Express) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}
