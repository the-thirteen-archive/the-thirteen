"use server";

import { prisma } from "@/lib/prisma";

export async function getCollections(limit?: number) {
  const collections = await prisma.collection.findMany({
    orderBy: { createdAt: "desc" },
    ...(limit ? { take: limit } : {}),
  });

  return collections.map((collection) => ({
    id: collection.id,
    slug: collection.slug,
    title: collection.title,
    description: collection.description,
    coverImage: collection.coverImage,
    referenceCount: collection.referenceIds.length,
  }));
}

export async function getCollectionBySlug(slug: string) {
  return prisma.collection.findUnique({
    where: { slug },
    include: {
      references: {
        include: { type: true, areas: true, tags: true },
      },
    },
  });
}
