/*
  Warnings:

  - You are about to alter the column `forms` on the `registration` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.

*/
-- AlterTable
ALTER TABLE `registration` MODIFY `forms` JSON NOT NULL;
