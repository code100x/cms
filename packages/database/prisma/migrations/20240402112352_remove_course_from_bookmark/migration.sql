/*
  Warnings:

  - You are about to drop the column `courseId` on the `Bookmark` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bookmark" DROP CONSTRAINT "Bookmark_courseId_fkey";

-- AlterTable
ALTER TABLE "Bookmark" DROP COLUMN "courseId";
