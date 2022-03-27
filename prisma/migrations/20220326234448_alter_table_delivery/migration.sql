/*
  Warnings:

  - You are about to drop the column `end_at` on the `delivery` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "delivery" DROP COLUMN "end_at",
ADD COLUMN     "end_date" TIMESTAMP(3);
