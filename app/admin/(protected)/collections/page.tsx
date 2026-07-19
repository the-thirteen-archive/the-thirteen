import CollectionsManager from "@/components/admin/collectionsManager";
import { getCollectionsForAdmin } from "@/actions/collections/get-admin";
import { getReferences } from "@/actions/references/get";
import type { AdminReferenceRow } from "@/types/reference";

export default async function AdminCollectionsPage() {
  const [collections, references] = await Promise.all([
    getCollectionsForAdmin(),
    getReferences(),
  ]);

  return (
    <div className="px-8 py-8">
      <CollectionsManager
        collections={collections}
        allReferences={references as AdminReferenceRow[]}
      />
    </div>
  );
}
