-- CreateTable
CREATE TABLE "VideoMetadata" (
    "id" SERIAL NOT NULL,
    "contentId" INTEGER NOT NULL,
    "video_1080p_1" TEXT,
    "video_1080p_2" TEXT,
    "video_1080p_3" TEXT,
    "video_720p_1" TEXT,
    "video_720p_2" TEXT,
    "video_720p_3" TEXT,
    "video_360p_1" TEXT,
    "video_360p_2" TEXT,
    "video_360p_3" TEXT,

    CONSTRAINT "VideoMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VideoMetadata_contentId_key" ON "VideoMetadata"("contentId");

-- AddForeignKey
ALTER TABLE "VideoMetadata" ADD CONSTRAINT "VideoMetadata_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
