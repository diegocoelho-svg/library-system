/*
  Warnings:

  - A unique constraint covering the columns `[normalizedTitle]` on the table `books` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `normalizedTitle` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."books" ADD COLUMN     "normalizedTitle" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "books_normalizedTitle_key" ON "public"."books"("normalizedTitle");
