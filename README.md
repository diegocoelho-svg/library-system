# 📚 Library System

Internal library management system for Sicoob cooperative to control book loans between employees.

## 🚀 Technologies

- **Node.js** + **TypeScript**
- **Express.js** - Web framework
- **Prisma** - Database ORM
- **JWT** - Authentication
- **Swagger** - API documentation
- **Zod** - Data validation
- **Day.js** - Date manipulation

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL (or other Prisma-compatible database)

## ⚙️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd library-system
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
# Create a .env file in the project root
DATABASE_URL="postgresql://user:password@localhost:5432/library_system"
JWT_SECRET="your-jwt-secret-here"
```

4. Run database migrations:
```bash
npx prisma migrate dev
```

5. (Optional) Populate the database with sample data:
```bash
npm run seed
```

## 🏃‍♂️ Running the Project

```bash
# Development
npm run dev

# Server will be running at http://localhost:3333
```

## 📖 API Documentation

Access the interactive Swagger documentation at:
**http://localhost:3333/api-docs**

## 🔐 Authentication

The API uses JWT for authentication. To access protected routes:

1. Login via `POST /sessions`
2. Use the returned token in the header `Authorization: Bearer <token>`

## 👥 User Roles

- **Administrator**: Full system access
- **Collaborator**: Can manage loans

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

### Loans
- `POST /loans` - Create loan (collaborator)
- `GET /loans` - List loans (collaborator)
- `GET /loans/:id` - Get loan (collaborator)
- `PATCH /loans/:id` - Return book (collaborator)

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

```bash
npm run dev      # Run in development mode
npm run seed     # Populate database with sample data
```

## 📁 Project Structure

```
src/
├── configs/          # Configurations (auth, swagger)
├── constants/        # System constants
├── controllers/      # Route controllers
├── database/         # Prisma configuration
├── middlewares/      # Middlewares (auth, error handling)
├── routes/           # Route definitions
├── types/            # TypeScript types
└── utils/            # Utilities
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
