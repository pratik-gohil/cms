/*
  Warnings:

  - You are about to drop the column `metaTags` on the `article` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "article" DROP COLUMN "metaTags",
ADD COLUMN     "pageDescription" VARCHAR(255) NOT NULL DEFAULT '',
ADD COLUMN     "pageTitle" VARCHAR(255) NOT NULL DEFAULT '';
