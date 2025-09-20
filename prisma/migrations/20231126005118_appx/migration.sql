/*
  Warnings:

  - You are about to drop the column `inviteLink` on the `DiscordConnect` table. All the data in the column will be lost.
  - Added the required column `username` to the `DiscordConnect` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DiscordConnect" DROP COLUMN "inviteLink",
ADD COLUMN     "username" TEXT NOT NULL;
