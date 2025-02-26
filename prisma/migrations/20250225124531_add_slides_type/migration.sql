-- CreateEnum
CREATE TYPE "SlidesType" AS ENUM ('NOTION', 'NOT_NOTION');

-- AlterTable
ALTER TABLE "VideoMetadata" ADD COLUMN     "slidesType" "SlidesType" DEFAULT 'NOTION';
