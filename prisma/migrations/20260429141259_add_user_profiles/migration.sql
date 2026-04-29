-- AlterTable
ALTER TABLE "UserCompany" ALTER COLUMN "companyName" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UserIndividual" ALTER COLUMN "firstName" DROP NOT NULL,
ALTER COLUMN "lastName" DROP NOT NULL;
