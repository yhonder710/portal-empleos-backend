/*
  Warnings:

  - You are about to drop the `Cuentas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Companys" DROP CONSTRAINT "Companys_userId_fkey";

-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_userId_fkey";

-- DropTable
DROP TABLE "Cuentas";

-- CreateTable
CREATE TABLE "Accounts" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "refreshToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Accounts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Accounts_email_key" ON "Accounts"("email");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Companys" ADD CONSTRAINT "Companys_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
