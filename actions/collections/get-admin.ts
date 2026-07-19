"use server";

import { prisma } from "@/lib/prisma";

export async function getCollectionsForAdmin() {
  const collections = await prisma.collection.findMany({
    orderBy: { createdAt: "desc" },
  });

  return collections.map((collection) => ({
    id: collection.id,
    slug: collection.slug,
    title: collection.title,
    description: collection.description,
    coverImage: collection.coverImage,
    referenceIds: collection.referenceIds,
    referenceCount: collection.referenceIds.length,
  }));
}
