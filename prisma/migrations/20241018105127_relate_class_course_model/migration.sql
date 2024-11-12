/*
  Warnings:

  - Added the required column `courseId` to the `Class` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Class" ADD COLUMN     "courseId" INTEGER NOT NULL,
ALTER COLUMN "date" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
