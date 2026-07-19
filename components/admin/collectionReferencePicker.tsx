"use client";

import { useState } from "react";
import { GripVertical, Search, X } from "lucide-react";
import Image from "next/image";
import type { AdminReferenceRow } from "@/types/reference";

type CollectionReferencePickerProps = {
  allReferences: AdminReferenceRow[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
};

export default function CollectionReferencePicker({
  allReferences,
  selectedIds,
  onChange,
}: CollectionReferencePickerProps) {
  const [query, setQuery] = useState("");
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const selectedReferences = selectedIds
    .map((id) => allReferences.find((ref) => ref.id === id))
    .filter((ref): ref is AdminReferenceRow => Boolean(ref));

  const suggestions = allReferences.filter(
    (ref) =>
      !selectedIds.includes(ref.id) &&
      query.trim().length > 0 &&
      ref.title.toLowerCase().includes(query.trim().toLowerCase()),
  );

  function addReference(id: string) {
    onChange([...selectedIds, id]);
    setQuery("");
  }

  function removeReference(id: string) {
    onChange(selectedIds.filter((refId) => refId !== id));
  }

  function handleDrop(targetId: string) {
    if (!draggedId || draggedId === targetId) return;

    const withoutDragged = selectedIds.filter((id) => id !== draggedId);
    const targetIndex = withoutDragged.indexOf(targetId);
    withoutDragged.splice(targetIndex, 0, draggedId);

    onChange(withoutDragged);
    setDraggedId(null);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <Search
          size={14}
          strokeWidth={1.5}
          className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gs-500"
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search references to add..."
          className="w-full rounded-lg border border-gs-800 bg-night-black py-2 pr-3 pl-9 text-sm text-off-white outline-none focus:border-gs-600"
        />

        {suggestions.length > 0 && (
          <ul className="absolute top-full left-0 z-10 mt-1 max-h-48 w-full overflow-y-auto rounded-lg border border-gs-800 bg-night-black">
            {suggestions.map((ref) => (
              <li key={ref.id}>
                <button
                  type="button"
                  onClick={() => addReference(ref.id)}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-gs-300 hover:bg-gs-800 cursor-pointer"
                >
                  {ref.title}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex flex-col gap-2">
        {selectedReferences.length === 0 ? (
          <p className="py-4 text-center text-xs text-gs-600">
            No references added yet.
          </p>
        ) : (
          selectedReferences.map((ref) => (
            <div
              key={ref.id}
              draggable
              onDragStart={() => setDraggedId(ref.id)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(ref.id)}
              className="flex items-center gap-2 rounded-lg border border-gs-800 bg-night-black px-2 py-2"
            >
              <GripVertical
                size={14}
                strokeWidth={1.5}
                className="shrink-0 cursor-grab text-gs-600"
              />

              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-gs-900">
                <Image
                  src={ref.mainImage.url}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>

              <span className="flex-1 truncate text-sm text-gs-200">
                {ref.title}
              </span>

              <button
                type="button"
                onClick={() => removeReference(ref.id)}
                className="shrink-0 text-gs-500 hover:text-red-400 cursor-pointer"
              >
                <X size={14} strokeWidth={1.5} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
