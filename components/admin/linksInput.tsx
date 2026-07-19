"use client";

import { Plus, Trash2 } from "lucide-react";
import CharCounter from "../ui/charCounter";

export type LinkField = { label: string; url: string };

type LinksInputProps = {
  links: LinkField[];
  onChange: (links: LinkField[]) => void;
};

export default function LinksInput({ links, onChange }: LinksInputProps) {
  function updateLink(index: number, key: keyof LinkField, value: string) {
    onChange(
      links.map((link, i) => (i === index ? { ...link, [key]: value } : link)),
    );
  }

  function addLink() {
    onChange([...links, { label: "", url: "" }]);
  }

  function removeLink(index: number) {
    onChange(links.filter((_, i) => i !== index));
  }

  return (
    <div className="flex flex-col gap-2">
      {links.map((link, index) => (
        <div
          key={index}
          className="flex items-start gap-2 border-b border-gs-900 py-4"
        >
          <div className="flex flex-col">
            <input
              value={link.label}
              onChange={(e) => updateLink(index, "label", e.target.value)}
              placeholder="Label (e.g. Official Website)"
              className="flex-1 rounded-lg border border-gs-800 bg-night-black px-3 py-2 text-sm text-off-white outline-none focus:border-gs-600 max-w-50"
            />
            <div className="">
              <CharCounter current={link.label.length} max={100} />
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <input
              value={link.url}
              type="url"
              onChange={(e) => updateLink(index, "url", e.target.value)}
              placeholder="https://..."
              className="flex-1 rounded-lg border border-gs-800 bg-night-black px-3 py-2 text-sm text-off-white outline-none focus:border-gs-600 max-w-50"
            />
            <button
              type="button"
              onClick={() => removeLink(index)}
              className="shrink-0 text-gs-500 hover:text-red-400 cursor-pointer"
              aria-label="Remove link"
            >
              <Trash2 size={14} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addLink}
        className="flex w-fit items-center gap-1.5 text-xs text-gs-500 hover:text-off-white cursor-pointer"
      >
        <Plus size={12} strokeWidth={2} />
        Add link
      </button>
    </div>
  );
}
