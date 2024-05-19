/*
  Warnings:

  - A unique constraint covering the columns `[userId,contentId]` on the table `Bookmark` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Bookmark_contentId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Bookmark_userId_contentId_key" ON "Bookmark"("userId", "contentId");
