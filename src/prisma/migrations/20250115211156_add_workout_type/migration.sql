/*
  Warnings:

  - Added the required column `workoutType` to the `Workout` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Workout" ADD COLUMN     "workoutType" TEXT NOT NULL;
