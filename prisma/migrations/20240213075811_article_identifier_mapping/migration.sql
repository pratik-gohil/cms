
-- CreateTable
CREATE TABLE "article_identifier" (
    "id" SERIAL NOT NULL,
    "articleId" TEXT NOT NULL,

    CONSTRAINT "article_identifier_pkey" PRIMARY KEY ("id")
    
);


-- AddForeignKey
ALTER TABLE "article_identifier" ADD CONSTRAINT "article_identifier_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER SEQUENCE "article_identifier_id_seq" RESTART WITH 1001