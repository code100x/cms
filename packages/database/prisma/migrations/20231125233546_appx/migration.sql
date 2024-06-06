/*
  Warnings:

  - Added the required column `appx_course_id` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discord_role_id` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "appx_course_id" INTEGER NOT NULL,
ADD COLUMN     "discord_role_id" TEXT NOT NULL;
