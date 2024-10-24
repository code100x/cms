/*
  Warnings:

  - You are about to drop the column `course` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `githubLink` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `submitted` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `submittedAt` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `twitterPost` on the `Assignment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Assignment" DROP COLUMN "course",
DROP COLUMN "githubLink",
DROP COLUMN "submitted",
DROP COLUMN "submittedAt",
DROP COLUMN "twitterPost",
ADD COLUMN     "courseId" INTEGER;

-- CreateTable
CREATE TABLE "Submission" (
    "id" SERIAL NOT NULL,
    "assignmentId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "courseId" INTEGER NOT NULL,
    "githubLink" TEXT,
    "twitterPost" TEXT,
    "videoLink" TEXT,
    "submitted" BOOLEAN NOT NULL DEFAULT false,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "feedback" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
