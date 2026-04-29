-- CreateTable
CREATE TABLE "Vacancys" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "nombrePuesto" TEXT NOT NULL,
    "descripcion" TEXT,
    "ubicacion" TEXT,
    "salarioMin" TEXT,
    "salarioMax" TEXT,
    "modalidad" TEXT,
    "tipoContrato" TEXT,
    "fechaPublicacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaFinita" TIMESTAMP(3),
    "estado" TEXT,

    CONSTRAINT "Vacancys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "vacanteId" TEXT NOT NULL,
    "fecha_postulacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado" TEXT,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPreference" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "modalidadPref" TEXT,
    "rangoSalarioMin" INTEGER,
    "rangoSalarioMax" INTEGER,
    "ubicacionDeseada" TEXT,
    "categoriasInteres" TEXT,

    CONSTRAINT "UserPreference_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserPreference_userId_key" ON "UserPreference"("userId");

-- AddForeignKey
ALTER TABLE "Vacancys" ADD CONSTRAINT "Vacancys_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Companys"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_vacanteId_fkey" FOREIGN KEY ("vacanteId") REFERENCES "Vacancys"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPreference" ADD CONSTRAINT "UserPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
