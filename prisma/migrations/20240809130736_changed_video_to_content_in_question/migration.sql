/*
  Warnings:

  - Added the required column `videoId` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "videoId",
ADD COLUMN     "videoId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
