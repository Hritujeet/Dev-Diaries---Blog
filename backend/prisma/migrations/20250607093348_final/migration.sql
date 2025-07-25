/*
  Warnings:

  - You are about to drop the column `parent_id` on the `Comment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_parent_id_fkey";

-- DropIndex
DROP INDEX "Comment_parent_id_idx";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "parent_id";
