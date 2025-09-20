/*
  Warnings:

  - You are about to drop the column `appx_course_id` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `discord_role_id` on the `Course` table. All the data in the column will be lost.
  - Added the required column `appxCourseId` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discordRoleId` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "appx_course_id",
DROP COLUMN "discord_role_id",
ADD COLUMN     "appxCourseId" INTEGER NOT NULL,
ADD COLUMN     "discordRoleId" TEXT NOT NULL;
