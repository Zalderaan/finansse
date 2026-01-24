/*
  Warnings:

  - You are about to drop the `Transfer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Transfer" DROP CONSTRAINT "Transfer_from_account_id_fkey";

-- DropForeignKey
ALTER TABLE "Transfer" DROP CONSTRAINT "Transfer_to_account_id_fkey";

-- DropForeignKey
ALTER TABLE "Transfer" DROP CONSTRAINT "Transfer_user_id_fkey";

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "accountAccount_id" INTEGER,
ADD COLUMN     "transfer_account_id" INTEGER;

-- DropTable
DROP TABLE "Transfer";

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_transfer_account_id_fkey" FOREIGN KEY ("transfer_account_id") REFERENCES "Account"("account_id") ON DELETE SET NULL ON UPDATE CASCADE;
