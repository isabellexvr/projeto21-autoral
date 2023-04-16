/*
  Warnings:

  - You are about to drop the column `adminId` on the `communities` table. All the data in the column will be lost.
  - Added the required column `addressId` to the `communities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `communities` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "communities" DROP CONSTRAINT "communities_fk1";

-- AlterTable
ALTER TABLE "communities" DROP COLUMN "adminId",
ADD COLUMN     "addressId" INTEGER NOT NULL,
ADD COLUMN     "ownerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "communities" ADD CONSTRAINT "communities_fk1" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "communities" ADD CONSTRAINT "communities_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
