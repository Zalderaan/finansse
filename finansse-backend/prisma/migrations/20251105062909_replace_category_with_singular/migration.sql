/*
  Warnings:

  - You are about to drop the `DefaultCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."UserCategory" DROP CONSTRAINT "UserCategory_user_id_fkey";

-- DropTable
DROP TABLE "public"."DefaultCategory";

-- DropTable
DROP TABLE "public"."UserCategory";

-- CreateTable
CREATE TABLE "Category" (
    "category_id" SERIAL NOT NULL,
    "category_name" TEXT NOT NULL,
    "category_icon" TEXT,
    "category_type" "CategoryType" NOT NULL,
    "category_isDefault" BOOLEAN NOT NULL,
    "user_id" INTEGER,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("category_id")
);

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
