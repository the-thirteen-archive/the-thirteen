import Link from "next/link";
import Image from "next/image";
import type { CollectionCardData } from "@/types/collections";

export default function ExploreCollectionCard({
  collection,
}: {
  collection: CollectionCardData;
}) {
  return (
    <Link
      href={`/collections/${collection.slug}`}
      className="flex w-56 shrink-0 bg-night-black border border-gs-900 rounded-2xl"
    >
      <div className=" inset-x-0 top-0 bg-linear-to-l from-true-black/70 to-transparent p-3 hover:bg-linear-to-r duration-1000 transition-all">
        <p className="line-clamp-2 text-sm font-medium text-off-white">
          {collection.title}
        </p>
        <p className="text-xs text-gs-500">{collection.referenceCount} items</p>
      </div>
      <div className="relative aspect-video w-1/2 overflow-hidden rounded-r-xl bg-gs-900">
        <Image
          src={collection.coverImage.url}
          alt={collection.title}
          fill
          className="object-cover"
        />
      </div>
    </Link>
  );
}
