/*
  Warnings:

  - Added the required column `notionId` to the `NotionMetadata` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `contentId` on the `NotionMetadata` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Content" DROP CONSTRAINT "Content_notionMetadataId_fkey";

-- AlterTable
ALTER TABLE "NotionMetadata" ADD COLUMN     "notionId" TEXT NOT NULL,
DROP COLUMN "contentId",
ADD COLUMN     "contentId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "NotionMetadata_contentId_key" ON "NotionMetadata"("contentId");

-- AddForeignKey
ALTER TABLE "NotionMetadata" ADD CONSTRAINT "NotionMetadata_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
