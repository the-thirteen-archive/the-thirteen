"use client"

import { useState } from "react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import CollectionsTable from "@/components/admin/collectionsTable";
import CollectionFormPanel from "@/components/admin/collectionFormPanel";
import type { AdminReferenceRow } from "@/types/reference";
import type { AdminCollectionRow } from "@/types/collections";

type CollectionsManagerProps = {
  collections: AdminCollectionRow[];
  allReferences: AdminReferenceRow[];
};
export default function CollectionsManager({
  collections,
  allReferences,
}: CollectionsManagerProps) {
  const router = useRouter();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [editing, setEditing] = useState<AdminCollectionRow | null>(null);

  function refresh() {
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-medium text-off-white">Collections</h1>
          <p className="text-sm text-gs-500">Curate sets of references.</p>
        </div>

        <button
          type="button"
          onClick={() => {
            setEditing(null);
            setIsPanelOpen(true);
          }}
          className="flex items-center gap-2 rounded-full bg-off-white px-4 py-2 text-sm font-medium text-true-black hover:bg-gs-100 cursor-pointer"
        >
          <Plus size={16} strokeWidth={2} />
          Add Collection
        </button>
      </div>

      <CollectionsTable
        collections={collections}
        onDeleted={refresh}
        onEdit={(collection) => {
          setEditing(collection);
          setIsPanelOpen(true);
        }}
      />

      <CollectionFormPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        onSaved={refresh}
        allReferences={allReferences}
        initialData={editing}
      />
    </div>
  );
}
