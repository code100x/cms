-- CreateTable
CREATE TABLE "YoutubeMetadata" (
    "id" SERIAL NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "contentId" INTEGER NOT NULL,

    CONSTRAINT "YoutubeMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "YoutubeMetadata_contentId_key" ON "YoutubeMetadata"("contentId");

-- AddForeignKey
ALTER TABLE "YoutubeMetadata" ADD CONSTRAINT "YoutubeMetadata_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
