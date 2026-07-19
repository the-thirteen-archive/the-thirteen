"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

import ImageDropzone from "@/components/ui/imageDropzone";
import CollectionReferencePicker from "@/components/admin/collectionReferencePicker";
import { createCollection } from "@/actions/collections/create";
import { updateCollection } from "@/actions/collections/update";
import type { AdminReferenceRow } from "@/types/reference";
import type { AdminCollectionRow } from "@/types/collections";
import CharCounter from "../ui/charCounter";

type CollectionFormPanelProps = {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
  allReferences: AdminReferenceRow[];
  initialData?: AdminCollectionRow | null;
};

export default function CollectionFormPanel({
  isOpen,
  onClose,
  onSaved,
  allReferences,
  initialData,
}: CollectionFormPanelProps) {
  const isEditing = Boolean(initialData);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [referenceIds, setReferenceIds] = useState<string[]>([]);
  const [coverImage, setCoverImage] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description ?? "");
      setReferenceIds(initialData.referenceIds);
    } else {
      setTitle("");
      setDescription("");
      setReferenceIds([]);
    }
    setCoverImage([]);
    setError("");
  }, [isOpen, initialData]);

  async function handleSubmit() {
    if (!title || (!isEditing && coverImage.length === 0)) {
      setError("Title and Cover Image are required.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const formData = new FormData();
      formData.set("title", title);
      formData.set("description", description);
      referenceIds.forEach((id) => formData.append("referenceIds", id));
      if (coverImage[0]) formData.set("coverImage", coverImage[0]);

      if (isEditing && initialData) {
        await updateCollection(initialData.id, formData);
      } else {
        await createCollection(formData);
      }

      onSaved();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isOpen) return null;

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 z-40 bg-overlay" />

      <aside className="fixed top-0 right-0 z-50 flex h-screen w-120 flex-col justify-between border-l border-gs-800 bg-true-black">
        <div className="flex flex-col gap-6 overflow-y-auto p-8">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-medium text-off-white">
                {isEditing ? "Edit Collection" : "New Collection"}
              </h2>
              <p className="text-sm text-gs-500">
                {isEditing
                  ? "Update this collection."
                  : "Create a new curated collection."}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-gs-500 hover:text-off-white cursor-pointer"
            >
              <X size={18} strokeWidth={1.5} />
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-xs tracking-wide text-gs-500 uppercase">
                Title*
              </label>
              <CharCounter current={title.length} max={40} />
            </div>
            <input
              value={title}
              maxLength={40}
              onChange={(e) => setTitle(e.target.value.slice(0, 40))}
              placeholder="e.g. Favorite Websites"
              className="rounded-lg border border-gs-800 bg-night-black px-3 py-2 text-sm text-off-white outline-none focus:border-gs-600"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-xs tracking-wide text-gs-500 uppercase">
                Description
              </label>
              <CharCounter current={description.length} max={200} />
            </div>
            <textarea
              value={description}
              maxLength={200}
              onChange={(e) => setDescription(e.target.value.slice(0, 200))}
              placeholder="Describe this collection..."
              rows={3}
              className="resize-none rounded-lg border border-gs-800 bg-night-black px-3 py-2 text-sm text-off-white outline-none focus:border-gs-600"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs tracking-wide text-gs-500 uppercase">
              Cover Image{isEditing ? " (leave empty to keep current)" : "*"}
            </label>
            {isEditing && initialData && coverImage.length === 0 && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={initialData.coverImage.url}
                alt=""
                className="mb-2 h-32 w-full rounded-xl object-cover"
              />
            )}
            <ImageDropzone files={coverImage} onChange={setCoverImage} />
          </div>

          <div className="flex flex-col gap-2 border-t border-gs-800 pt-4">
            <label className="text-xs tracking-wide text-gs-500 uppercase">
              References
            </label>
            <CollectionReferencePicker
              allReferences={allReferences}
              selectedIds={referenceIds}
              onChange={setReferenceIds}
            />
          </div>

          {error && <p className="text-xs text-red-400">{error}</p>}
        </div>

        <div className="flex items-center gap-3 border-t border-gs-800 p-6">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-full border border-gs-800 py-3 text-sm text-gs-300 hover:border-gs-600 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 rounded-full bg-off-white py-3 text-sm font-medium text-true-black hover:bg-gs-100 disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting
              ? "Saving..."
              : isEditing
                ? "Save Changes"
                : "Create Collection"}
          </button>
        </div>
      </aside>
    </>
  );
}
