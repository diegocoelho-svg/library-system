/*
  Warnings:

  - You are about to drop the column `quantity` on the `books` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."BookStatus" AS ENUM ('disponível', 'reservado', 'indisponível');

-- DropForeignKey
ALTER TABLE "public"."loans" DROP CONSTRAINT "loans_book_id_fkey";

-- AlterTable
ALTER TABLE "public"."books" DROP COLUMN "quantity";

-- CreateTable
CREATE TABLE "public"."BookCopy" (
    "id" SERIAL NOT NULL,
    "inventoryCode" TEXT NOT NULL,
    "book_id" INTEGER NOT NULL,
    "status" "public"."BookStatus" NOT NULL DEFAULT 'disponível',

    CONSTRAINT "BookCopy_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BookCopy_inventoryCode_key" ON "public"."BookCopy"("inventoryCode");

-- AddForeignKey
ALTER TABLE "public"."loans" ADD CONSTRAINT "loans_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "public"."BookCopy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BookCopy" ADD CONSTRAINT "BookCopy_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "public"."books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
