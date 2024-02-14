-- AlterTable
ALTER TABLE "article" ADD COLUMN     "metaTags" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "redirectionURL" VARCHAR(255) NOT NULL DEFAULT '';
