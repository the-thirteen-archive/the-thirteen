"use server";
import { prisma } from "@/lib/prisma";

export async function getMostUsedTags(limit = 7) {
  const tags = await prisma.tag.findMany();

  const withCounts = await Promise.all(
    tags.map(async (tag) => ({
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
      count: await prisma.reference.count({
        where: { tagIds: { has: tag.id } },
      }),
    })),
  );

  return withCounts.sort((a, b) => b.count - a.count).slice(0, limit);
}

export async function getRecentlyAddedTags(limit = 4) {
  const tags = await prisma.tag.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
  });

  return Promise.all(
    tags.map(async (tag) => ({
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
      count: await prisma.reference.count({
        where: { tagIds: { has: tag.id } },
      }),
    })),
  );
}
