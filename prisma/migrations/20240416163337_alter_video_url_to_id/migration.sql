/*
  Warnings:

  - You are about to drop the column `videoUrl` on the `YoutubeMetadata` table. All the data in the column will be lost.
  - Added the required column `videoId` to the `YoutubeMetadata` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "YoutubeMetadata" DROP COLUMN "videoUrl",
ADD COLUMN     "videoId" TEXT NOT NULL;
