/*
  Warnings:

  - You are about to drop the column `postId` on the `tags` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `tags` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "tags" DROP COLUMN "postId";

-- CreateIndex
CREATE UNIQUE INDEX "tags_slug_key" ON "tags"("slug");
