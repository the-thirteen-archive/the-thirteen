"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import SelectDropdown from "@/components/ui/selectDropdown";
import type { FilterOption } from "@/types/filters";
import CharCounter from "../ui/charCounter";

type AreaFormProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { name: string; typeId: string }) => Promise<void>;
  types: FilterOption[];
  initialName?: string;
  initialTypeId?: string;
  title: string;
};

export default function AreaForm({
  isOpen,
  onClose,
  onSave,
  types,
  initialName,
  initialTypeId,
  title,
}: AreaFormProps) {
  const [name, setName] = useState("");
  const [typeId, setTypeId] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName(initialName ?? "");
      setTypeId(initialTypeId ? [initialTypeId] : []);
      setError("");
    }
  }, [isOpen, initialName, initialTypeId]);

  async function handleSubmit() {
    if (!name.trim() || typeId.length === 0) {
      setError("Name and Type are required.");
      return;
    }
    setIsSaving(true);
    setError("");
    try {
      await onSave({ name: name.trim(), typeId: typeId[0] });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSaving(false);
    }
  }

  if (!isOpen) return null;

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 z-40 bg-overlay" />
      <div className="fixed top-1/2 left-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-gs-800 bg-true-black p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-medium text-off-white">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gs-500 hover:text-off-white cursor-pointer"
          >
            <X size={16} strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex flex-col gap-3">
        <SelectDropdown
          options={types.map((t) => ({ label: t.name, value: t.id }))}
          selected={typeId}
          onChange={setTypeId}
          placeholder="Select Type"
        />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            autoFocus
            className="w-full rounded-lg border border-gs-800 bg-night-black px-3 py-2 text-sm text-off-white outline-none focus:border-gs-600"
          />
          <div className="flex justify-end">
            <CharCounter current={name.length} max={100} />
          </div>
        </div>

        {error && <p className="mt-2 text-xs text-red-400">{error}</p>}

        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-full border border-gs-800 py-2.5 text-sm text-gs-300 hover:border-gs-600 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSaving}
            className="flex-1 rounded-full bg-off-white py-2.5 text-sm font-medium text-true-black hover:bg-gs-100 disabled:opacity-50 cursor-pointer"
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </>
  );
}
