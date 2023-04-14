/*
  Warnings:

  - You are about to drop the column `cityId` on the `communities` table. All the data in the column will be lost.
  - You are about to drop the column `cityId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `cities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `countries` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `states` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "cities" DROP CONSTRAINT "cities_countriesId_fkey";

-- DropForeignKey
ALTER TABLE "cities" DROP CONSTRAINT "cities_fk0";

-- DropForeignKey
ALTER TABLE "communities" DROP CONSTRAINT "communities_fk2";

-- DropForeignKey
ALTER TABLE "states" DROP CONSTRAINT "states_fk0";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_cityId_fkey";

-- AlterTable
ALTER TABLE "communities" DROP COLUMN "cityId",
ADD COLUMN     "city" TEXT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "cityId";

-- DropTable
DROP TABLE "cities";

-- DropTable
DROP TABLE "countries";

-- DropTable
DROP TABLE "states";

-- CreateTable
CREATE TABLE "addresses" (
    "id" SERIAL NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "addresses_pk" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
