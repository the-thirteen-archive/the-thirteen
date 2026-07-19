"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { uploadImage } from "@/lib/cloudinary/upload";
import { slugify } from "@/lib/utils";

async function findOrCreateTag(name: string) {
  const slug = slugify(name);
  const existing = await prisma.tag.findUnique({ where: { slug } });
  if (existing) return existing.id;
  const created = await prisma.tag.create({ data: { name, slug } });
  return created.id;
}

export async function createReference(formData: FormData) {
  const title = formData.get("title") as string;
  const subtitle = formData.get("subtitle") as string | null;
  const description = formData.get("description") as string | null;
  const typeId = formData.get("typeId") as string;
  const areaIds = formData.getAll("areaIds") as string[];
  const tagNames = formData.getAll("tagNames") as string[];
  const metadataRaw = formData.get("metadata") as string | null;
  const mainImageFile = formData.get("mainImage") as File;
  const galleryFiles = formData.getAll("gallery") as File[];

  const linksRaw = formData.get("links") as string | null;

  if (!title || !typeId || !mainImageFile || mainImageFile.size === 0) {
    throw new Error("Title, Type and Main Image are required.");
  }

  const mainImage = await uploadImage(mainImageFile);

  const gallery = await Promise.all(
    galleryFiles
      .filter((file) => file.size > 0)
      .map(async (file) => ({ ...(await uploadImage(file)), alt: null })),
  );

  const resolvedTagIds = await Promise.all(tagNames.map(findOrCreateTag));
  const tagIds = [...new Set(resolvedTagIds)];
  const metadata = metadataRaw ? JSON.parse(metadataRaw) : [];
  const links = linksRaw ? JSON.parse(linksRaw) : [];

  await prisma.reference.create({
    data: {
      title,
      slug: slugify(title),
      subtitle: subtitle || null,
      description: description || null,
      mainImage,
      gallery,
      typeId,
      areaIds,
      tagIds,
      collectionIds: [],
      links,
      metadata,
      publishedAt: new Date(),
    },
  });

  revalidatePath("/admin");
}
