/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Set` table. All the data in the column will be lost.
  - You are about to drop the column `exercise` on the `Set` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `Set` table. All the data in the column will be lost.
  - You are about to drop the column `setNumber` on the `Set` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Set` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Workout` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `Workout` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `Workout` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Workout` table. All the data in the column will be lost.
  - You are about to drop the column `workoutType` on the `Workout` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Set" DROP CONSTRAINT "Set_workoutId_fkey";

-- DropForeignKey
ALTER TABLE "Workout" DROP CONSTRAINT "Workout_userId_fkey";

-- DropIndex
DROP INDEX "Set_exercise_idx";

-- DropIndex
DROP INDEX "Set_workoutId_idx";

-- DropIndex
DROP INDEX "Workout_userId_date_idx";

-- DropIndex
DROP INDEX "Workout_workoutType_idx";

-- AlterTable
ALTER TABLE "Set" DROP COLUMN "createdAt",
DROP COLUMN "exercise",
DROP COLUMN "notes",
DROP COLUMN "setNumber",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "createdAt",
DROP COLUMN "duration",
DROP COLUMN "notes",
DROP COLUMN "updatedAt",
DROP COLUMN "workoutType",
ALTER COLUMN "date" DROP DEFAULT,
ALTER COLUMN "date" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "User";

-- AddForeignKey
ALTER TABLE "Set" ADD CONSTRAINT "Set_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
