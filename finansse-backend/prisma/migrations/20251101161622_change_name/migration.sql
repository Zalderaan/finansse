/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."Category";

-- CreateTable
CREATE TABLE "DefaultCategory" (
    "d_category_id" SERIAL NOT NULL,
    "d_category_name" TEXT NOT NULL,

    CONSTRAINT "DefaultCategory_pkey" PRIMARY KEY ("d_category_id")
);

-- CreateTable
CREATE TABLE "UserCategory" (
    "u_category_id" INTEGER NOT NULL,
    "u_category_name" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "UserCategory_pkey" PRIMARY KEY ("u_category_id")
);

-- AddForeignKey
ALTER TABLE "UserCategory" ADD CONSTRAINT "UserCategory_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
