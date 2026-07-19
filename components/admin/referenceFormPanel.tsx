"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

import ImageDropzone from "@/components/ui/imageDropzone";
import SelectDropdown from "@/components/ui/selectDropdown";
import AdminTagInput from "@/components/admin/adminTagInput";
import LinksInput, { type LinkField } from "./linksInput";
import MetadataInput, {
  type MetadataField,
} from "@/components/admin/metadataInput";
import { createReference } from "@/actions/references/create";
import { updateReference } from "@/actions/references/update";
import type { FilterOption } from "@/types/filters";
import type { AdminReferenceRow } from "@/types/reference";
import CharCounter from "../ui/charCounter";

type ReferenceFormPanelProps = {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
  types: FilterOption[];
  areas: (FilterOption & { typeId: string })[];
  tags: FilterOption[];
  initialData?: AdminReferenceRow | null;
};

export default function ReferenceFormPanel({
  isOpen,
  onClose,
  onSaved,
  types,
  areas,
  tags,
  initialData,
}: ReferenceFormPanelProps) {
  const isEditing = Boolean(initialData);

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [typeId, setTypeId] = useState<string[]>([]);
  const [areaIds, setAreaIds] = useState<string[]>([]);
  const [tagNames, setTagNames] = useState<string[]>([]);
  const [metadata, setMetadata] = useState<MetadataField[]>([]);
  const [mainImage, setMainImage] = useState<File[]>([]);
  const [gallery, setGallery] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [links, setLinks] = useState<LinkField[]>([]);
  const [keptGalleryPublicIds, setKeptGalleryPublicIds] = useState<string[]>(
    [],
  );

  useEffect(() => {
    if (!isOpen) return;

    if (initialData) {
      setTitle(initialData.title);
      setSubtitle(initialData.subtitle ?? "");
      setDescription(initialData.description ?? "");
      setTypeId([initialData.type.id]);
      setAreaIds(initialData.areas.map((a) => a.id));
      setTagNames(initialData.tags.map((t) => t.name));
      setMetadata(initialData.metadata);
      setLinks(initialData.links);
      setMainImage([]);
      setGallery([]);
      setKeptGalleryPublicIds(initialData.gallery.map((g) => g.publicId));
    } else {
      setTitle("");
      setSubtitle("");
      setDescription("");
      setTypeId([]);
      setAreaIds([]);
      setTagNames([]);
      setMetadata([]);
      setMainImage([]);
      setGallery([]);
      setLinks([]);
    }
    setError("");
  }, [isOpen, initialData]);

  const availableAreas = areas.filter((area) => area.typeId === typeId[0]);

  async function handleSubmit() {
    if (
      !title ||
      typeId.length === 0 ||
      (!isEditing && mainImage.length === 0)
    ) {
      setError("Title, Type and Main Image are required.");
      return;
    }

    const incompleteMetadata = metadata.some(
      (f) => (f.label && !f.value) || (!f.label && f.value),
    );
    const incompleteLinks = links.some(
      (l) => (l.label && !l.url) || (!l.label && l.url),
    );

    if (incompleteMetadata || incompleteLinks) {
      setError(
        "Metadata and/or Links fields can't be left half-filled. Fill both or remove the row.",
      );
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const formData = new FormData();
      formData.set("title", title);
      formData.set("subtitle", subtitle);
      formData.set("description", description);
      formData.set("typeId", typeId[0]);
      formData.set(
        "links",
        JSON.stringify(links.filter((l) => l.label && l.url)),
      );
      areaIds.forEach((id) => formData.append("areaIds", id));
      tagNames.forEach((name) => formData.append("tagNames", name));
      formData.set(
        "metadata",
        JSON.stringify(metadata.filter((f) => f.label && f.value)),
      );
      if (mainImage[0]) formData.set("mainImage", mainImage[0]);
      gallery.forEach((file) => formData.append("gallery", file));

      if (isEditing && initialData) {
        formData.set(
          "keepGalleryPublicIds",
          JSON.stringify(keptGalleryPublicIds),
        );
        await updateReference(initialData.id, formData);
      } else {
        await createReference(formData);
      }

      onSaved();
      onClose();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isOpen) return null;

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 z-40 bg-overlay" />

      <aside className="fixed top-0 right-0 z-50 flex h-screen w-[480px] flex-col justify-between border-l border-gs-800 bg-true-black">
        <div className="flex flex-col gap-6 overflow-y-auto p-8">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-medium text-off-white">
                {isEditing ? "Edit Reference" : "New Reference"}
              </h2>
              <p className="text-sm text-gs-500">
                {isEditing
                  ? "Update this design reference."
                  : "Add a new design reference to the archive."}
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

          <div className="flex items-center justify-between">
            <label className="text-xs tracking-wide text-gs-500 uppercase">
              Title*
            </label>
            <CharCounter current={title.length} max={100} />
          </div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value.slice(0, 100))}
            maxLength={100}
            placeholder="e.g. Neue Haas Grotesk"
            className="rounded-lg border border-gs-800 bg-night-black px-3 py-2 text-sm text-off-white outline-none focus:border-gs-600"
          />

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-xs tracking-wide text-gs-500 uppercase">
                Subtitle
              </label>
              <CharCounter current={subtitle.length} max={40} />
            </div>

            <input
              value={subtitle}
              maxLength={40}
              onChange={(e) => setSubtitle(e.target.value.slice(0, 40))}
              placeholder="e.g. Typeface, Studio, Singer & Songwriter..."
              className="rounded-lg border border-gs-800 bg-night-black px-3 py-2 text-sm text-off-white outline-none focus:border-gs-600"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-xs tracking-wide text-gs-500 uppercase">
                Description
              </label>
              <CharCounter current={description.length} max={600} />
            </div>
            <textarea
              value={description}
              maxLength={600}
              onChange={(e) => setDescription(e.target.value.slice(0, 600))}
              placeholder="Describe this reference..."
              rows={4}
              className="resize-none rounded-lg border border-gs-800 bg-night-black px-3 py-2 text-sm text-off-white outline-none focus:border-gs-600"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs tracking-wide text-gs-500 uppercase">
              Main Image{isEditing ? " (leave empty to keep current)" : "*"}
            </label>
            {isEditing && initialData && mainImage.length === 0 && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={initialData.mainImage.url}
                alt=""
                className="mb-2 h-32 w-full rounded-xl object-cover"
              />
            )}
            <ImageDropzone files={mainImage} onChange={setMainImage} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs tracking-wide text-gs-500 uppercase">
              Additional Images (max 5)
            </label>
            {isEditing && initialData && (
              <div className="flex flex-col gap-2">
                <p className="text-xs text-gs-500">Last Added:</p>
                <div className="flex flex-wrap gap-3">
                  {initialData.gallery
                    .filter((image) =>
                      keptGalleryPublicIds.includes(image.publicId),
                    )
                    .map((image) => (
                      <div
                        key={image.publicId}
                        className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gs-900"
                      >
                        <img
                          src={image.url}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setKeptGalleryPublicIds((ids) =>
                              ids.filter((id) => id !== image.publicId),
                            )
                          }
                          className="absolute top-1 right-1 rounded-full bg-true-black/80 p-1 text-off-white cursor-pointer"
                        >
                          <X size={12} strokeWidth={2} />
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            )}
            <div className="flex flex-col gap-2">
              <p className="text-xs text-gs-500">Add New:</p>

              <ImageDropzone
                multiple
                maxFiles={5}
                files={gallery}
                onChange={setGallery}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs tracking-wide text-gs-500 uppercase">
                Type
              </label>
              <SelectDropdown
                options={types.map((t) => ({ label: t.name, value: t.id! }))}
                selected={typeId}
                onChange={(values) => {
                  setTypeId(values);
                  setAreaIds([]);
                }}
                placeholder="Select Type"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs tracking-wide text-gs-500 uppercase">
                Area
              </label>
              <SelectDropdown
                options={availableAreas.map((a) => ({
                  label: a.name,
                  value: a.id!,
                }))}
                selected={areaIds}
                onChange={setAreaIds}
                placeholder="Select Area"
                multiple
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs tracking-wide text-gs-500 uppercase">
              Tags
            </label>
            <AdminTagInput
              options={tags}
              value={tagNames}
              onChange={setTagNames}
            />
          </div>
          <div className="flex flex-col gap-2 border-t border-gs-800 pt-4">
            <label className="text-xs tracking-wide text-gs-500 uppercase">
              Links
            </label>
            <LinksInput links={links} onChange={setLinks} />
          </div>
          <div className="flex flex-col gap-2 border-t border-gs-800 pt-4">
            <label className="text-xs tracking-wide text-gs-500 uppercase">
              Metadata
            </label>
            <MetadataInput fields={metadata} onChange={setMetadata} />
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
                : "Publish Reference"}
          </button>
        </div>
      </aside>
    </>
  );
}
