/*
  Warnings:

  - You are about to drop the `StaffProfile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "auth"."StaffProfile" DROP CONSTRAINT "StaffProfile_userId_fkey";

-- DropTable
DROP TABLE "auth"."StaffProfile";

-- CreateTable
CREATE TABLE "app"."StaffProfile" (
    "id" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "role" "app"."StaffRole" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "avatarUrl" TEXT,
    "avatarPublicid" TEXT,
    "deletedAt" TIMESTAMP(3),
    "defineltyDeleted" TIMESTAMP(3),

    CONSTRAINT "StaffProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StaffProfile_userId_key" ON "app"."StaffProfile"("userId");

-- AddForeignKey
ALTER TABLE "app"."StaffProfile" ADD CONSTRAINT "StaffProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "auth"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
