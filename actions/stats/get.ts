"use server";

import { prisma } from "@/lib/prisma";

export async function getArchiveStats() {
  const [references, types, areas, tags] = await Promise.all([
    prisma.reference.count(),
    prisma.type.count(),
    prisma.area.count(),
    prisma.tag.count(),
  ]);

  return { references, types, areas, tags };
}