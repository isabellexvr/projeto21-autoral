/*
  Warnings:

  - Added the required column `countryIso2` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stateIso2` to the `addresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "addresses" ADD COLUMN     "countryIso2" TEXT NOT NULL,
ADD COLUMN     "stateIso2" TEXT NOT NULL;
