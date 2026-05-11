/*
  Warnings:

  - The values [disponível,reservado,indisponível] on the enum `BookStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [emprestado,devolvido,atrasado] on the enum `LoanStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."BookStatus_new" AS ENUM ('DISPONIVEL', 'RESERVADO', 'INDISPONIVEL', 'DANIFICADO', 'PERDIDO');
ALTER TABLE "public"."BookCopy" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."BookCopy" ALTER COLUMN "status" TYPE "public"."BookStatus_new" USING ("status"::text::"public"."BookStatus_new");
ALTER TYPE "public"."BookStatus" RENAME TO "BookStatus_old";
ALTER TYPE "public"."BookStatus_new" RENAME TO "BookStatus";
DROP TYPE "public"."BookStatus_old";
ALTER TABLE "public"."BookCopy" ALTER COLUMN "status" SET DEFAULT 'DISPONIVEL';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "public"."LoanStatus_new" AS ENUM ('EMPRESTADO', 'DEVOLVIDO', 'ATRASADO', 'CANCELADO', 'PRORROGADO');
ALTER TABLE "public"."loans" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."loans" ALTER COLUMN "status" TYPE "public"."LoanStatus_new" USING ("status"::text::"public"."LoanStatus_new");
ALTER TABLE "public"."LoanHistory" ALTER COLUMN "status" TYPE "public"."LoanStatus_new" USING ("status"::text::"public"."LoanStatus_new");
ALTER TYPE "public"."LoanStatus" RENAME TO "LoanStatus_old";
ALTER TYPE "public"."LoanStatus_new" RENAME TO "LoanStatus";
DROP TYPE "public"."LoanStatus_old";
ALTER TABLE "public"."loans" ALTER COLUMN "status" SET DEFAULT 'EMPRESTADO';
COMMIT;

-- AlterTable
ALTER TABLE "public"."BookCopy" ALTER COLUMN "status" SET DEFAULT 'DISPONIVEL';

-- AlterTable
ALTER TABLE "public"."loans" ALTER COLUMN "status" SET DEFAULT 'EMPRESTADO';
