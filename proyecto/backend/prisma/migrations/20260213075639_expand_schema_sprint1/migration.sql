-- CreateEnum
CREATE TYPE "ShiftType" AS ENUM ('MORNING', 'AFTERNOON', 'NIGHT', 'CUSTOM');

-- CreateEnum
CREATE TYPE "ShiftRequestStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "sedeId" TEXT;

-- CreateTable
CREATE TABLE "sedes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "phone" TEXT,
    "managerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sedes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shifts" (
    "id" TEXT NOT NULL,
    "type" "ShiftType" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "employeeId" TEXT NOT NULL,
    "sedeId" TEXT NOT NULL,
    "confirmed" BOOLEAN NOT NULL DEFAULT false,
    "cancelled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shifts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shift_requests" (
    "id" TEXT NOT NULL,
    "initiatorShiftId" TEXT NOT NULL,
    "targetShiftId" TEXT NOT NULL,
    "initiatorId" TEXT NOT NULL,
    "targetId" TEXT NOT NULL,
    "status" "ShiftRequestStatus" NOT NULL DEFAULT 'PENDING',
    "reason" TEXT,
    "decidedAt" TIMESTAMP(3),
    "approvedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shift_requests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sedes_name_key" ON "sedes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "sedes_managerId_key" ON "sedes"("managerId");

-- CreateIndex
CREATE INDEX "sedes_managerId_idx" ON "sedes"("managerId");

-- CreateIndex
CREATE INDEX "shifts_employeeId_idx" ON "shifts"("employeeId");

-- CreateIndex
CREATE INDEX "shifts_sedeId_idx" ON "shifts"("sedeId");

-- CreateIndex
CREATE INDEX "shifts_date_idx" ON "shifts"("date");

-- CreateIndex
CREATE UNIQUE INDEX "shifts_date_type_employeeId_sedeId_key" ON "shifts"("date", "type", "employeeId", "sedeId");

-- CreateIndex
CREATE INDEX "shift_requests_initiatorId_idx" ON "shift_requests"("initiatorId");

-- CreateIndex
CREATE INDEX "shift_requests_targetId_idx" ON "shift_requests"("targetId");

-- CreateIndex
CREATE INDEX "shift_requests_status_idx" ON "shift_requests"("status");

-- CreateIndex
CREATE INDEX "shift_requests_createdAt_idx" ON "shift_requests"("createdAt");

-- CreateIndex
CREATE INDEX "users_sedeId_idx" ON "users"("sedeId");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- AddForeignKey
ALTER TABLE "sedes" ADD CONSTRAINT "sedes_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_sedeId_fkey" FOREIGN KEY ("sedeId") REFERENCES "sedes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shifts" ADD CONSTRAINT "shifts_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shifts" ADD CONSTRAINT "shifts_sedeId_fkey" FOREIGN KEY ("sedeId") REFERENCES "sedes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shift_requests" ADD CONSTRAINT "shift_requests_initiatorShiftId_fkey" FOREIGN KEY ("initiatorShiftId") REFERENCES "shifts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shift_requests" ADD CONSTRAINT "shift_requests_targetShiftId_fkey" FOREIGN KEY ("targetShiftId") REFERENCES "shifts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shift_requests" ADD CONSTRAINT "shift_requests_initiatorId_fkey" FOREIGN KEY ("initiatorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shift_requests" ADD CONSTRAINT "shift_requests_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
