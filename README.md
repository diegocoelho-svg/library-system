# 📚 Library System

Internal library management system for cooperative to control book loans between employees.

Monorepo with npm workspaces:
- **`apps/api`** — REST API (Node.js + Express + Prisma)
- **`apps/web`** — Frontend (React 19 + Vite)

## 🚀 Technologies

### API (`apps/api`)
- **Node.js** + **TypeScript**
- **Express.js** - Web framework
- **Prisma** - Database ORM (PostgreSQL)
- **JWT** - Authentication
- **Swagger** - API documentation
- **Zod** - Data validation
- **Day.js** - Date manipulation

### Web (`apps/web`)
- **React 19** + **TypeScript**
- **Vite** - Build tool and dev server

### Tooling
- **Biome** - Lint and format (root)
- **npm workspaces** - Monorepo management

## 📋 Prerequisites

- Node.js 18+
- npm 8+ (workspaces support)
- PostgreSQL (or other Prisma-compatible database)

## ⚙️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd library-system
```

2. Install all workspace dependencies (run from the root):
```bash
npm install
```

3. Configure the API environment variables:
```bash
# Create apps/api/.env (see apps/api/.env-example)
DATABASE_URL="postgresql://user:password@localhost:5432/library_system"
JWT_SECRET="your-jwt-secret-here"
```

4. Run database migrations:
```bash
npm run prisma:migrate --workspace @library-system/api
```

5. (Optional) Populate the database with sample data:
```bash
npm run seed --workspace @library-system/api
```

## 🏃‍♂️ Running the Project

From the repository root:

```bash
# API (http://localhost:3333)
npm run dev:api

# Web (http://localhost:5173 — Vite default)
npm run dev:web
```

## 📖 API Documentation

With the API running, access the interactive Swagger UI at:
**http://localhost:3333/api-docs**

## 🔐 Authentication

The API uses JWT for authentication. To access protected routes:

1. Login via `POST /sessions`
2. Use the returned token in the header `Authorization: Bearer <token>`

## 👥 User Roles

- **Administrator**: Full system access
- **Collaborator**: Standard authenticated user

## 🛠️ Main Endpoints

### Authentication
- `POST /sessions` - Login

### Users
- `POST /users` - Create user
- `GET /users` - List users
- `PATCH /users/:id` - Update user (admin)
- `DELETE /users/:id` - Delete user (admin)

### Books
- `GET /books` - List books
- `POST /books` - Create book (admin)
- `PATCH /books/:id` - Update book (admin)

### Book Copies
- `GET /booksCopy` - List copies
- `GET /booksCopy/:bookId` - Copies of a book
- `POST /booksCopy/:bookId/copies` - Create copy (admin)
- `PATCH /booksCopy/:id` - Update status (admin)
- `DELETE /booksCopy/:id` - Soft delete copy (admin)

### Loans
- `POST /loans` - Create loan (authenticated)
- `GET /loans` - List loans (authenticated)
- `GET /loans/:id` - Get loan (authenticated)
- `PATCH /loans/:id` - Return book (authenticated)

### History
- `GET /loansHistory` - Loan history

## 🗄️ Database Structure

### Main Entities
- **User**: System users
- **Book**: Registered books
- **BookCopy**: Physical copies of books
- **Loan**: Loans made
- **LoanHistory**: Movement history

## 🔧 Available Scripts

### Root
```bash
npm run dev:api    # Run API in development mode
npm run dev:web    # Run web in development mode
npm run build:web  # Build the web app for production
npm run lint       # Lint with Biome
npm run lint:fix   # Lint and auto-fix with Biome
```

### API workspace (`apps/api`)
```bash
npm run dev --workspace @library-system/api              # Dev server (tsx watch)
npm run seed --workspace @library-system/api             # Seed sample data
npm run prisma:generate --workspace @library-system/api  # Generate Prisma client
npm run prisma:migrate --workspace @library-system/api   # Run migrations (dev)
npm run typecheck --workspace @library-system/api        # TypeScript check
```

### Web workspace (`apps/web`)
```bash
npm run dev --workspace @library-system/web      # Vite dev server
npm run build --workspace @library-system/web    # Production build
npm run preview --workspace @library-system/web  # Preview production build
```

## 📁 Project Structure

```
library-system/
├── apps/
│   ├── api/                  # REST API
│   │   ├── prisma/           # Prisma schema, migrations, seed
│   │   └── src/
│   │       ├── configs/      # Configurations (auth, swagger)
│   │       ├── constants/    # System constants
│   │       ├── controllers/  # Route controllers
│   │       ├── database/     # Prisma client and repositories
│   │       ├── docs/         # Swagger JSDoc (one file per resource)
│   │       ├── middlewares/  # Middlewares (auth, error handling)
│   │       ├── routes/       # Route definitions
│   │       ├── types/        # TypeScript types
│   │       └── utils/        # Utilities
│   └── web/                  # React + Vite frontend
│       └── src/
├── docker-compose.yml        # PostgreSQL container
├── biome.jsonc               # Biome (lint/format) config
└── package.json              # Root workspace config
```

## 🚀 Future Improvements

### 🔍 **Essential Features**
- [ ] Book reservation system
- [ ] Overdue loan notifications
- [ ] Book search by title/author
- [ ] Simple loan reports

### 📊 **Usability Improvements**
- [ ] Pagination in listings
- [ ] Filters by loan status
- [ ] Loan history per user

### 🧪 **Code Quality**
- [ ] Basic unit tests
- [ ] Additional input validations

### 🌐 **Internationalization**
- [ ] Translate code comments and error messages to English
- [ ] Update enum values to English
- [ ] Translate API documentation examples

---

**Sicoob Cooplivre Internal System**  
**Developed by Diego Coelho**  
📧 diego.vinicius003@cs.cruzeirodosul.edu.br
