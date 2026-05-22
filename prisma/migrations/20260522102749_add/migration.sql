/*
  Warnings:

  - Added the required column `role` to the `StaffProfile` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "app"."StaffRole" AS ENUM ('VIEWER', 'ADMIN', 'OWNER');

-- AlterTable
ALTER TABLE "auth"."StaffProfile" ADD COLUMN     "role" "app"."StaffRole" NOT NULL;
