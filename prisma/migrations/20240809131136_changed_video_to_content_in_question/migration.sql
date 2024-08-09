-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_videoId_fkey";

-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "videoId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Content"("id") ON DELETE SET NULL ON UPDATE CASCADE;
