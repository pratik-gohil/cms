/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "category" ADD COLUMN     "slug" VARCHAR(255) NOT NULL,
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX "category_slug_key" ON "category"("slug");