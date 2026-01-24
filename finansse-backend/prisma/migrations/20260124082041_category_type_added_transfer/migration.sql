/*
  Warnings:

  - You are about to drop the column `accountAccount_id` on the `Transaction` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "CategoryType" ADD VALUE 'TRANSFER';

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "accountAccount_id";
