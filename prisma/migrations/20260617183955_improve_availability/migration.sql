/*
  Warnings:

  - You are about to drop the column `date` on the `Availability` table. All the data in the column will be lost.
  - You are about to drop the column `endTime` on the `Availability` table. All the data in the column will be lost.
  - You are about to drop the column `isAvailable` on the `Availability` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Availability` table. All the data in the column will be lost.
  - Added the required column `endAt` to the `Availability` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startAt` to the `Availability` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Availability" DROP COLUMN "date",
DROP COLUMN "endTime",
DROP COLUMN "isAvailable",
DROP COLUMN "startTime",
ADD COLUMN     "endAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "startAt" TIMESTAMP(3) NOT NULL;
