/*
  Warnings:

  - You are about to drop the column `normalizedTitle` on the `books` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."books_normalizedTitle_key";

-- AlterTable
ALTER TABLE "public"."books" DROP COLUMN "normalizedTitle";
