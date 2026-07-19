"use server";

import { prisma } from "@/lib/prisma";
import * as XLSX from "xlsx";

async function getExportRows() {
  const references = await prisma.reference.findMany({
    include: { type: true, areas: true, tags: true },
    orderBy: { createdAt: "desc" },
  });

  return references.map((reference) => ({
    Title: reference.title,
    Subtitle: reference.subtitle ?? "",
    Type: reference.type.name,
    Areas: reference.areas.map((a) => a.name).join(", "),
    Tags: reference.tags.map((t) => t.name).join(", "),
    Description: reference.description ?? "",
    "Main Image URL": reference.mainImage.url,
    Links: reference.links.map((l) => `${l.label}: ${l.url}`).join(" | "),
    "Created At": reference.createdAt.toISOString(),
    "Published At": reference.publishedAt
      ? reference.publishedAt.toISOString()
      : "",
  }));
}

export async function exportReferencesToXLSX(): Promise<string> {
  const rows = await getExportRows();
  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "References");

  const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
  return Buffer.from(buffer).toString("base64");
}

export async function exportReferencesToJSON(): Promise<string> {
  const rows = await getExportRows();
  return JSON.stringify(rows, null, 2);
}
