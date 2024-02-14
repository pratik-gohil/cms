-- DropForeignKey
ALTER TABLE "article_identifier" DROP CONSTRAINT "article_identifier_articleId_fkey";

-- AddForeignKey
ALTER TABLE "article_identifier" ADD CONSTRAINT "article_identifier_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "article"("id") ON DELETE CASCADE ON UPDATE CASCADE;
