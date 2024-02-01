/*
  Warnings:

  - A unique constraint covering the columns `[contentId,userId]` on the table `VideoProgress` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "VideoProgress_contentId_userId_key" ON "VideoProgress"("contentId", "userId");
