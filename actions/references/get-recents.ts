"use server";
import { prisma } from "@/lib/prisma";

export async function getRecentReferences(limit = 7) {
  return prisma.reference.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
    include: { type: true, areas: true, tags: true },
  });
}
