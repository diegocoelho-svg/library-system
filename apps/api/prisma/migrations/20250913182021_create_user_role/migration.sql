-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('administrator', 'collaborator');

-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "role" "public"."UserRole" NOT NULL DEFAULT 'collaborator';
