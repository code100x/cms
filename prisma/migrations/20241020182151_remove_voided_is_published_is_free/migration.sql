/*
  Warnings:

  - You are about to drop the column `isFree` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the column `isPublished` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the column `voided` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the column `isFree` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `isPublished` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `voided` on the `Course` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Content" DROP COLUMN "isFree",
DROP COLUMN "isPublished",
DROP COLUMN "voided";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "isFree",
DROP COLUMN "isPublished",
DROP COLUMN "voided";
