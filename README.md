# 📚 Sistema de Biblioteca - Sicoob Cooplivre

Sistema interno de gerenciamento de biblioteca da cooperativa Sicoob para controle de empréstimos de livros entre colaboradores.

## 🚀 Tecnologias

- **Node.js** + **TypeScript**
- **Express.js** - Framework web
- **Prisma** - ORM para banco de dados
- **JWT** - Autenticação
- **Swagger** - Documentação da API
- **Zod** - Validação de dados
- **Day.js** - Manipulação de datas

## 📋 Pré-requisitos

- Node.js 18+
- npm ou yarn
- PostgreSQL (ou outro banco compatível com Prisma)

## ⚙️ Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd library-system
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
# Crie um arquivo .env na raiz do projeto
DATABASE_URL="postgresql://usuario:senha@localhost:5432/library_system"
JWT_SECRET="seu-jwt-secret-aqui"
```

4. Execute as migrações do banco:
```bash
npx prisma migrate dev
```

5. (Opcional) Popule o banco com dados de exemplo:
```bash
npm run seed
```

## 🏃‍♂️ Executando o Projeto

```bash
# Desenvolvimento
npm run dev

# O servidor estará rodando em http://localhost:3333
```

## 📖 Documentação da API

Acesse a documentação interativa do Swagger em:
**http://localhost:3333/api-docs**

## 🔐 Autenticação

A API utiliza JWT para autenticação. Para acessar rotas protegidas:

1. Faça login via `POST /sessions`
2. Use o token retornado no header `Authorization: Bearer <token>`

## 👥 Roles de Usuário

- **Administrator**: Acesso total ao sistema
- **Collaborator**: Pode gerenciar empréstimos

## 🛠️ Endpoints Principais

### Autenticação
- `POST /sessions` - Login

### Usuários
- `POST /users` - Criar usuário
- `GET /users` - Listar usuários
- `PATCH /users/:id` - Atualizar usuário (admin)
- `DELETE /users/:id` - Deletar usuário (admin)

### Livros
- `GET /books` - Listar livros
- `POST /books` - Criar livro (admin)
- `PATCH /books/:id` - Atualizar livro (admin)

### Cópias de Livros
- `GET /booksCopy` - Listar cópias
- `GET /booksCopy/:bookId` - Cópias de um livro
- `POST /booksCopy/:bookId/copies` - Criar cópia (admin)
- `PATCH /booksCopy/:id` - Atualizar status (admin)

### Empréstimos
- `POST /loans` - Criar empréstimo (colaborador)
- `GET /loans` - Listar empréstimos (colaborador)
- `GET /loans/:id` - Buscar empréstimo (colaborador)
- `PATCH /loans/:id` - Devolver livro (colaborador)

### Histórico
- `GET /loansHistory` - Histórico de empréstimos

## 🗄️ Estrutura do Banco

### Principais Entidades
- **User**: Usuários do sistema
- **Book**: Livros cadastrados
- **BookCopy**: Cópias físicas dos livros
- **Loan**: Empréstimos realizados
- **LoanHistory**: Histórico de movimentações

## 🔧 Scripts Disponíveis

```bash
npm run dev      # Executa em modo desenvolvimento
npm run seed     # Popula o banco com dados de exemplo
```

## 📁 Estrutura do Projeto

```
src/
├── configs/          # Configurações (auth, swagger)
├── constants/        # Constantes do sistema
├── controllers/      # Controladores das rotas
├── database/         # Configuração do Prisma
├── middlewares/      # Middlewares (auth, error handling)
├── routes/           # Definição das rotas
├── types/            # Tipos TypeScript
└── utils/            # Utilitários
```

## 🚀 Melhorias Futuras

### 🔍 **Funcionalidades Essenciais**
- [ ] Sistema de reservas de livros
- [ ] Notificações de empréstimos vencidos
- [ ] Busca de livros por título/autor
- [ ] Relatórios simples de empréstimos

### 📊 **Melhorias de Usabilidade**
- [ ] Paginação nas listagens
- [ ] Filtros por status de empréstimo
- [ ] Histórico de empréstimos por usuário

### 🧪 **Qualidade de Código**
- [ ] Testes unitários básicos
- [ ] Validações adicionais de entrada

---

**Sistema interno da Sicoob Cooplivre**  
**Desenvolvido por Diego Coelho**  
📧 diego.vinicius003@cs.cruzeirodosul.edu.br
