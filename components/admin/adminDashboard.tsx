"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";

import SelectDropdown from "@/components/ui/selectDropdown";
import ReferenceTable from "@/components/admin/referenceTable";
import ReferenceFormPanel from "@/components/admin/referenceFormPanel";
import { getReferences } from "@/actions/references/get";
import type { AdminReferenceRow } from "@/types/reference";
import type { FilterOption } from "@/types/filters";

type AdminDashboardProps = {
  initialReferences: AdminReferenceRow[];
  types: FilterOption[];
  areas: (FilterOption & { typeId: string })[];
  tags: FilterOption[];
};

export default function AdminDashboard({
  initialReferences,
  types,
  areas,
  tags,
}: AdminDashboardProps) {
  const [references, setReferences] = useState(initialReferences);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string[]>([]);
  const [areaFilter, setAreaFilter] = useState<string[]>([]);
  const [tagFilter, setTagFilter] = useState<string[]>([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  async function refresh() {
    const fresh = await getReferences();
    setReferences(fresh as AdminReferenceRow[]);
  }

  const filtered = useMemo(() => {
    return references.filter((reference) => {
      const matchesQuery =
        query.trim() === "" ||
        reference.title.toLowerCase().includes(query.trim().toLowerCase());
      const matchesType =
        typeFilter.length === 0 || typeFilter.includes(reference.type.id);
      const matchesArea =
        areaFilter.length === 0 ||
        reference.areas.some((a) => areaFilter.includes(a.id));
      const matchesTag =
        tagFilter.length === 0 ||
        reference.tags.some((t) => tagFilter.includes(t.id));
      return matchesQuery && matchesType && matchesArea && matchesTag;
    });
  }, [references, query, typeFilter, areaFilter, tagFilter]);

  const [editingReference, setEditingReference] =
    useState<AdminReferenceRow | null>(null);

  function openCreate() {
    setEditingReference(null);
    setIsPanelOpen(true);
  }

  function openEdit(reference: AdminReferenceRow) {
    setEditingReference(reference);
    setIsPanelOpen(true);
  }

  return (
    <div className="flex flex-col gap-6 px-8 py-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-medium text-off-white">All References</h1>
          <p className="text-sm text-gs-500">
            Browse, search and manage all design references.
          </p>
        </div>

        <button
          type="button"
          onClick={() => openCreate()}
          className="flex items-center gap-2 rounded-full bg-off-white px-4 py-2 text-sm font-medium text-true-black hover:bg-gs-100 cursor-pointer"
        >
          <Plus size={16} strokeWidth={2} />
          Add Reference
        </button>
      </div>

      <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search design references"
          className="rounded-lg border border-gs-800 bg-night-black px-3 py-2 text-sm text-off-white outline-none focus:border-gs-600"
        />
        <SelectDropdown
          options={types.map((t) => ({ label: t.name, value: t.id! }))}
          selected={typeFilter}
          onChange={setTypeFilter}
          placeholder="Select Type"
        />
        <SelectDropdown
          options={areas.map((a) => ({ label: a.name, value: a.id! }))}
          selected={areaFilter}
          onChange={setAreaFilter}
          placeholder="Select Area"
          multiple
        />
        <SelectDropdown
          options={tags.map((t) => ({ label: t.name, value: t.id! }))}
          selected={tagFilter}
          onChange={setTagFilter}
          placeholder="Select Tags"
          multiple
          align="right"
        />
      </div>

      <ReferenceTable
        onEdit={openEdit}
        references={filtered}
        onDeleted={refresh}
      />

      <ReferenceFormPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        onSaved={refresh}
        initialData={editingReference}
        types={types}
        areas={areas}
        tags={tags}
      />
    </div>
  );
}
