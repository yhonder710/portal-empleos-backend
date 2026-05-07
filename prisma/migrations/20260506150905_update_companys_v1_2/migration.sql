/*
  Warnings:

  - You are about to drop the column `industry` on the `Companys` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Companys" DROP COLUMN "industry",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "sector" TEXT,
ADD COLUMN     "size" TEXT;
