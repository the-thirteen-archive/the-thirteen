"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { uploadImage, deleteImage } from "@/lib/cloudinary/upload";
import { slugify } from "@/lib/utils";

export async function updateCollection(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string | null;
  const referenceIds = formData.getAll("referenceIds") as string[];
  const newCoverImageFile = formData.get("coverImage") as File | null;

  const existing = await prisma.collection.findUniqueOrThrow({ where: { id } });

  let coverImage = existing.coverImage;

  if (newCoverImageFile && newCoverImageFile.size > 0) {
    coverImage = await uploadImage(newCoverImageFile);
    if (existing.coverImage.publicId) {
      await deleteImage(existing.coverImage.publicId);
    }
  }

  await prisma.collection.update({
    where: { id },
    data: {
      title,
      slug: slugify(title),
      description: description || null,
      coverImage,
      referenceIds,
    },
  });

  revalidatePath("/admin/collections");
}
