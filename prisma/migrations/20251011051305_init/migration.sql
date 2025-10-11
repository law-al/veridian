-- CreateEnum
CREATE TYPE "BlogImagesStatus" AS ENUM ('IN_USE', 'ORPHANED', 'UPLOADED');

-- CreateTable
CREATE TABLE "blog_images" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "publicId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "status" "BlogImagesStatus" NOT NULL DEFAULT 'ORPHANED',

    CONSTRAINT "blog_images_pkey" PRIMARY KEY ("id")
);
