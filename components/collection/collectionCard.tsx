import Link from "next/link";
import Image from "next/image";
import type { CollectionCardData } from "@/types/collections";

export default function CollectionCard({
  collection,
}: {
  collection: CollectionCardData;
}) {
  return (
    <Link
      href={`/collections/${collection.slug}`}
      className="group flex flex-col gap-3 bg-night-black p-2 rounded-2xl border border-gs-900"
    >
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-gs-900">
        <Image
          src={collection.coverImage.url}
          alt={collection.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.01]"
        />
      </div>

      <div>
        <h3 className="line-clamp-2 text-sm font-medium text-off-white">
          {collection.title}
        </h3>
        {collection.description && (
          <p className="line-clamp-2 text-xs text-gs-500">
            {collection.description}
          </p>
        )}
        <p className="mt-1 text-xs text-gs-600">
          {collection.referenceCount}{" "}
          {collection.referenceCount === 1 ? "reference" : "references"}
        </p>
      </div>
    </Link>
  );
}
