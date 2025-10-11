/*
  Warnings:

  - The values [ORPHANED,UPLOADED] on the enum `BlogImagesStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BlogImagesStatus_new" AS ENUM ('IN_USE', 'NOT_IN_USE');
ALTER TABLE "public"."blog_images" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "blog_images" ALTER COLUMN "status" TYPE "BlogImagesStatus_new" USING ("status"::text::"BlogImagesStatus_new");
ALTER TYPE "BlogImagesStatus" RENAME TO "BlogImagesStatus_old";
ALTER TYPE "BlogImagesStatus_new" RENAME TO "BlogImagesStatus";
DROP TYPE "public"."BlogImagesStatus_old";
ALTER TABLE "blog_images" ALTER COLUMN "status" SET DEFAULT 'IN_USE';
COMMIT;

-- AlterTable
ALTER TABLE "blog_images" ALTER COLUMN "status" SET DEFAULT 'IN_USE';
