/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserCompany` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserIndividual` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserCompany" DROP CONSTRAINT "UserCompany_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserIndividual" DROP CONSTRAINT "UserIndividual_userId_fkey";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "UserCompany";

-- DropTable
DROP TABLE "UserIndividual";

-- CreateTable
CREATE TABLE "Cuentas" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "refreshToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cuentas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "phone" TEXT,
    "location" TEXT,
    "cvUrl" TEXT,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Companys" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "companyName" TEXT,
    "rif" TEXT,
    "website" TEXT,
    "logoUrl" TEXT,
    "industry" TEXT,

    CONSTRAINT "Companys_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cuentas_email_key" ON "Cuentas"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_userId_key" ON "Users"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Companys_userId_key" ON "Companys"("userId");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Cuentas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Companys" ADD CONSTRAINT "Companys_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Cuentas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
