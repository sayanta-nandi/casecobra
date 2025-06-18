/*
  Warnings:

  - You are about to drop the column `CroppedImageUrl` on the `Configarator` table. All the data in the column will be lost.
  - You are about to drop the column `ImageUrl` on the `Configarator` table. All the data in the column will be lost.
  - Added the required column `imageUrl` to the `Configarator` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Configarator" DROP COLUMN "CroppedImageUrl",
DROP COLUMN "ImageUrl",
ADD COLUMN     "croppedImageUrl" TEXT,
ADD COLUMN     "imageUrl" TEXT NOT NULL;
