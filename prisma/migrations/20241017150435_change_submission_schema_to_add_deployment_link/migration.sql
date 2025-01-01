/*
  Warnings:

  - You are about to drop the column `videoLink` on the `Submission` table. All the data in the column will be lost.
  - Added the required column `bounty` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "videoLink",
ADD COLUMN     "bounty" TEXT NOT NULL,
ADD COLUMN     "deploymentLink" TEXT;
