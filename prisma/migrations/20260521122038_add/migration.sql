/*
  Warnings:

  - You are about to drop the column `appealMessage` on the `Post` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `StaffProfile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `StaffProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "app"."Post" DROP COLUMN "appealMessage";

-- AlterTable
ALTER TABLE "auth"."StaffProfile" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "StaffProfile_userId_key" ON "auth"."StaffProfile"("userId");

-- AddForeignKey
ALTER TABLE "auth"."StaffProfile" ADD CONSTRAINT "StaffProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "auth"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
