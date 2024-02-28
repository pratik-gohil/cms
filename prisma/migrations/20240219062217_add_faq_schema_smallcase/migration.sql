/*
  Warnings:

  - You are about to drop the `Faq` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Faq" DROP CONSTRAINT "Faq_cat_id_fkey";

-- DropTable
DROP TABLE "Faq";

-- CreateTable
CREATE TABLE "faq" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sequence" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "cat_id" TEXT NOT NULL,

    CONSTRAINT "faq_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "faq" ADD CONSTRAINT "faq_cat_id_fkey" FOREIGN KEY ("cat_id") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
