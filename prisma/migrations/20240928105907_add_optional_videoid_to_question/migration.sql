-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "videoId" INTEGER;

-- CreateIndex
CREATE INDEX "Question_videoId_idx" ON "Question"("videoId");

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Content"("id") ON DELETE SET NULL ON UPDATE CASCADE;
