-- CreateTable
CREATE TABLE "Configarator" (
    "id" TEXT NOT NULL,
    "height" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "ImageUrl" TEXT NOT NULL,
    "CroppedImageUrl" TEXT,

    CONSTRAINT "Configarator_pkey" PRIMARY KEY ("id")
);
