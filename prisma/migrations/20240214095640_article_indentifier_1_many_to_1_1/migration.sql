/*
  Warnings:

  - A unique constraint covering the columns `[articleId]` on the table `article_identifier` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "article_identifier_articleId_key" ON "article_identifier"("articleId");
