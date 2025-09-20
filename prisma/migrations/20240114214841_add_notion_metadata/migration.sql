-- AlterTable
ALTER TABLE "Content" ADD COLUMN     "notionMetadataId" INTEGER;

-- CreateTable
CREATE TABLE "NotionMetadata" (
    "id" SERIAL NOT NULL,
    "contentId" TEXT NOT NULL,

    CONSTRAINT "NotionMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NotionMetadata_contentId_key" ON "NotionMetadata"("contentId");

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_notionMetadataId_fkey" FOREIGN KEY ("notionMetadataId") REFERENCES "NotionMetadata"("id") ON DELETE SET NULL ON UPDATE CASCADE;
