"use client";

import { Plus, Trash2 } from "lucide-react";
import CharCounter from "../ui/charCounter";

export type MetadataField = { label: string; value: string };

type MetadataInputProps = {
  fields: MetadataField[];
  onChange: (fields: MetadataField[]) => void;
};

export default function MetadataInput({
  fields,
  onChange,
}: MetadataInputProps) {
  function updateField(index: number, key: keyof MetadataField, value: string) {
    onChange(
      fields.map((field, i) =>
        i === index ? { ...field, [key]: value } : field,
      ),
    );
  }

  function addField() {
    onChange([...fields, { label: "", value: "" }]);
  }

  function removeField(index: number) {
    onChange(fields.filter((_, i) => i !== index));
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      {fields.map((field, index) => (
        <div
          key={index}
          className="flex items-start justify-between gap-2 w-full border-b border-gs-900 py-4"
        >
          <div className="flex flex-col">
            <input
              value={field.label}
              onChange={(e) =>
                updateField(index, "label", e.target.value.slice(0, 30))
              }
              maxLength={30}
              placeholder="Label (e.g. Occupation)"
              className="flex-1 rounded-lg border border-gs-800 bg-night-black px-3 py-2 text-sm text-off-white outline-none focus:border-gs-600 max-w-50"
            />
            <div className="">
              <CharCounter current={field.label.length} max={100} />
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <input
              value={field.value}
              onChange={(e) => updateField(index, "value", e.target.value)}
              maxLength={80}
              placeholder="Value (e.g. Designer)"
              className="flex-1 rounded-lg border border-gs-800 bg-night-black px-3 py-2 text-sm text-off-white outline-none focus:border-gs-600 max-w-50"
            />
            <button
              type="button"
              onClick={() => removeField(index)}
              className="shrink-0 text-gs-500 hover:text-red-400 cursor-pointer"
              aria-label="Remove field"
            >
              <Trash2 size={14} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addField}
        className="flex w-fit items-center gap-1.5 text-xs text-gs-500 hover:text-off-white cursor-pointer"
      >
        <Plus size={12} strokeWidth={2} />
        Add field
      </button>
    </div>
  );
}
