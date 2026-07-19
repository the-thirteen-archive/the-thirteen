"use client";

import { useState } from "react";
import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";

import ConfirmDialog from "@/components/ui/confirmDialog";
import { deleteCollection } from "@/actions/collections/delete";
import type { AdminCollectionRow } from "@/types/collections";

type CollectionsTableProps = {
  collections: AdminCollectionRow[];
  onDeleted: () => void;
  onEdit: (collection: AdminCollectionRow) => void;
};
export default function CollectionsTable({
  collections,
  onDeleted,
  onEdit,
}: CollectionsTableProps) {
  const [pendingDelete, setPendingDelete] = useState<AdminCollectionRow | null>(
    null,
  );
  const [isDeleting, setIsDeleting] = useState(false);

  async function confirmDelete() {
    if (!pendingDelete) return;
    setIsDeleting(true);
    await deleteCollection(pendingDelete.id);
    setIsDeleting(false);
    setPendingDelete(null);
    onDeleted();
  }

  if (collections.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-gs-500">
        No collections found.
      </p>
    );
  }

  return (
    <div className="flex flex-col">
      {collections.map((collection) => (
        <div
          key={collection.id}
          className="flex items-center justify-between border-b border-gs-800 px-2 py-4 hover:bg-night-black"
        >
          <div className="flex items-center gap-3">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gs-900">
              <Image
                src={collection.coverImage.url}
                alt={collection.title}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-off-white">
                {collection.title}
              </p>
              <p className="text-xs text-gs-500">
                {collection.referenceCount}{" "}
                {collection.referenceCount === 1 ? "reference" : "references"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onEdit(collection)}
              className="text-gs-500 hover:text-off-white cursor-pointer"
              aria-label="Edit"
            >
              <Pencil size={14} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => setPendingDelete(collection)}
              className="text-gs-500 hover:text-red-400 cursor-pointer"
              aria-label="Delete"
            >
              <Trash2 size={14} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      ))}

      <ConfirmDialog
        isOpen={Boolean(pendingDelete)}
        title="Are you sure?"
        description={
          pendingDelete
            ? `This will permanently delete "${pendingDelete.title}". References inside it won't be deleted.`
            : undefined
        }
        confirmLabel={isDeleting ? "Deleting..." : "Delete"}
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}
