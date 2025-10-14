/*
  Warnings:

  - You are about to drop the column `postId` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "categories" DROP COLUMN "postId";

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "categoryId";
