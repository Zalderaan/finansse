/*
  Warnings:

  - Added the required column `d_category_type` to the `DefaultCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `u_category_type` to the `UserCategory` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CategoryType" AS ENUM ('EXPENSE', 'INCOME');

-- AlterTable
ALTER TABLE "DefaultCategory" ADD COLUMN     "d_category_icon" TEXT,
ADD COLUMN     "d_category_type" "CategoryType";

UPDATE "DefaultCategory" SET "d_category_type" = 'EXPENSE' WHERE "d_category_type" IS NULL;

ALTER TABLE "DefaultCategory" ALTER COLUMN "d_category_type" SET NOT NULL;  -- Add NOT NULL after update

-- AlterTable
CREATE SEQUENCE usercategory_u_category_id_seq;
ALTER TABLE "UserCategory" ADD COLUMN     "u_category_icon" TEXT,
ADD COLUMN     "u_category_type" "CategoryType" NOT NULL,
ALTER COLUMN "u_category_id" SET DEFAULT nextval('usercategory_u_category_id_seq');
ALTER SEQUENCE usercategory_u_category_id_seq OWNED BY "UserCategory"."u_category_id";
