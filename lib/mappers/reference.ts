import type { Reference, Type, Area, Tag } from "@prisma/client";
import type { ReferenceDetailData } from "@/types/reference";

type ReferenceWithRelations = Reference & {
  type: Type;
  areas: Area[];
  tags: Tag[];
};

export function mapReferenceToDetailData(
  reference: ReferenceWithRelations,
): ReferenceDetailData {
  return {
    id: reference.id,
    slug: reference.slug,
    title: reference.title,
    subtitle: reference.subtitle ?? undefined,
    description: reference.description ?? undefined,
    mainImage: reference.mainImage,
    gallery: reference.gallery,
    links: reference.links,
    metadata: reference.metadata,
    type: { name: reference.type.name, slug: reference.type.slug },
    areas: reference.areas.map((area) => ({
      name: area.name,
      slug: area.slug,
    })),
    tags: reference.tags.map((tag) => ({ name: tag.name, slug: tag.slug })),
    createdAt: reference.createdAt.toISOString(),
  };
}
