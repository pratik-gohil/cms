/*
  Warnings:

  - Added the required column `sequence` to the `Faq` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Faq" ADD COLUMN     "sequence" INTEGER NOT NULL;
