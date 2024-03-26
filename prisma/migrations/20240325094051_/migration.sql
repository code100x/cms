/*
  Warnings:

  - A unique constraint covering the columns `[contentId,userId]` on the table `BookmarkVideoTimestamp` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `BookmarkVideoTimestamp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BookmarkVideoTimestamp" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "BookmarkVideoTimestamp_contentId_userId_key" ON "BookmarkVideoTimestamp"("contentId", "userId");
