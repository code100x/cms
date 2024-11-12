-- AlterTable
ALTER TABLE "Assignment" ADD COLUMN     "githubLink" TEXT,
ADD COLUMN     "submitted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "submittedAt" TIMESTAMP(3),
ADD COLUMN     "twitterPost" TEXT;
