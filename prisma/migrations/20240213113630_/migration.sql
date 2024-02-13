-- CreateTable
CREATE TABLE "article" (
    "id" TEXT NOT NULL,
    "isPublished" BOOLEAN NOT NULL,
    "articleContents" TEXT NOT NULL,
    "articleTitle" VARCHAR(255) NOT NULL,
    "articleImageSrc" VARCHAR(255) NOT NULL,
    "articleShortDescription" VARCHAR(255) NOT NULL,
    "articlePublishDate" TIMESTAMP(3),
    "articleHrefURL" VARCHAR(255) NOT NULL,
    "articleImageTitle" VARCHAR(255) NOT NULL,
    "articleImageAlt" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "articleCategoryId" TEXT,

    CONSTRAINT "article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "article_identifier" (
    "id" SERIAL NOT NULL,
    "articleId" TEXT NOT NULL,

    CONSTRAINT "article_identifier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "category_name_key" ON "category"("name");

-- AddForeignKey
ALTER TABLE "article" ADD CONSTRAINT "article_articleCategoryId_fkey" FOREIGN KEY ("articleCategoryId") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_identifier" ADD CONSTRAINT "article_identifier_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
