-- CreateTable
CREATE TABLE "VideoBookmark" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "contentId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    "timestamp" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VideoBookmark_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VideoBookmark" ADD CONSTRAINT "VideoBookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoBookmark" ADD CONSTRAINT "VideoBookmark_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoBookmark" ADD CONSTRAINT "VideoBookmark_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
