"use server";

import { adminDb } from "@/firebase-admin";

export async function createNewImage({
  croppedImageUrl,
  height,
  width,
  imageUrl,
}: {
  croppedImageUrl: string;
  height: number;
  width: number;
  imageUrl: string;
}) {
  const imgCollectionRef = adminDb.collection("Configuration");
  const imgRef = await imgCollectionRef.add({
    croppedImageUrl: croppedImageUrl,
    height: height,
    width: width,
    imageUrl: imageUrl,
  });
  return { imageId: imgRef.id };
}

export async function updateImage({
  imageId,
  croppedImageUrl,
}: {
  imageId: string;
  croppedImageUrl: string;
}) {
  await adminDb.collection("Configuration").doc(imageId).update({
    croppedImageUrl: croppedImageUrl,
  });
}
