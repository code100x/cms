/*
  Warnings:

  - The `timestamp` column on the `VideoMetadata` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "VideoMetadata" ALTER COLUMN "date" SET DATA TYPE DATE,
DROP COLUMN "timestamp",
ADD COLUMN     "timestamp" TIMESTAMP;
