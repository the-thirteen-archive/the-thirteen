import CollectionCard from "@/components/collection/collectionCard";
import { getCollections } from "@/actions/collections/get";

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <div className="flex flex-col gap-6 px-8 py-8">
      <div>
        <h1 className="text-xl font-medium text-off-white">All Collections</h1>
        <p className="text-sm text-gs-500">
          Curated sets of design references.
        </p>
      </div>

      {collections.length === 0 ? (
        <p className="py-16 text-center text-sm text-gs-500">
          No collections yet...
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {collections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      )}
    </div>
  );
}
