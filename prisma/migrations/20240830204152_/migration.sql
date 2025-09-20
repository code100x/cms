-- AlterTable
ALTER TABLE "VideoMetadata" ADD COLUMN     "original_mp4_url" TEXT,
ADD COLUMN     "transcoded" BOOLEAN NOT NULL DEFAULT false;
