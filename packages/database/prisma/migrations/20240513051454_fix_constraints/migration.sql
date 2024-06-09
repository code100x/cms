-- DropForeignKey
ALTER TABLE "Bookmark" DROP CONSTRAINT "Bookmark_contentId_fkey";

-- DropIndex
DROP INDEX "Bookmark_contentId_key";

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
