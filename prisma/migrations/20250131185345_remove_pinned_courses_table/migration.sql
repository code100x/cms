/*
  Warnings:

  - You are about to drop the column `isPinned` on the `UserPurchases` table. All the data in the column will be lost.
  - You are about to drop the `PinnedCourses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PinnedCourses" DROP CONSTRAINT "PinnedCourses_courseId_fkey";

-- DropForeignKey
ALTER TABLE "PinnedCourses" DROP CONSTRAINT "PinnedCourses_userId_fkey";

-- AlterTable
ALTER TABLE "UserPurchases" DROP COLUMN "isPinned";

-- DropTable
DROP TABLE "PinnedCourses";
