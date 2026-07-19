"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { uploadImage } from "@/lib/cloudinary/upload";
import { slugify } from "@/lib/utils";

export async function createCollection(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string | null;
  const referenceIds = formData.getAll("referenceIds") as string[];
  const coverImageFile = formData.get("coverImage") as File;

  if (!title || !coverImageFile || coverImageFile.size === 0) {
    throw new Error("Title and Cover Image are required.");
  }

  const coverImage = await uploadImage(coverImageFile);

  await prisma.collection.create({
    data: {
      title,
      slug: slugify(title),
      description: description || null,
      coverImage,
      referenceIds,
      publishedAt: new Date(),
    },
  });

  revalidatePath("/admin/collections");
}
