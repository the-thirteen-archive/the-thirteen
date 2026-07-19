import { notFound } from "next/navigation";
import { getCollectionBySlug } from "@/actions/collections/get";
import { mapReferenceToDetailData } from "@/lib/mappers/reference";
import CollectionReferenceBrowser from "@/components/collection/collectionReferenceBrowser";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function CollectionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);

  if (!collection) notFound();

  const references = collection.references.map(mapReferenceToDetailData);

  return (
    <div className="flex flex-col gap-6 px-8 py-8 ">
      <div className="flex pb-4">
        <Link
          href="/collections"
          className="flex gap-2 items-center px-4 bg-night-black hover:bg-gs-900 rounded-l-2xl w-fit border-e border-gs-800"
        >
          <ArrowLeft size={24} strokeWidth={1.25} />
        </Link>
        <div className="flex flex-col gap-1 py-3 ps-6 pe-8 bg-night-black rounded-r-2xl">
          
          <h1 className="text-2xl font-medium text-off-white">
            {collection.title}
          </h1>
          {collection.description && (
            <p className="text-sm text-gs-400">{collection.description}</p>
          )}
        </div>
      </div>

      {references.length === 0 ? (
        <p className="py-16 text-center text-sm text-gs-500">
          This collection has no references yet.
        </p>
      ) : (
        <CollectionReferenceBrowser references={references} />
      )}
    </div>
  );
}
