"use client";

import { useRef, useState } from "react";
import { X } from "lucide-react";
import type { FilterOption } from "@/types/filters";
import CharCounter from "../ui/charCounter";

type AdminTagInputProps = {
  options: FilterOption[];
  value: string[];
  onChange: (names: string[]) => void;
};

export default function AdminTagInput({
  options,
  value,
  onChange,
}: AdminTagInputProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestions = options.filter(
    (o) =>
      !value.includes(o.name) &&
      query.trim().length > 0 &&
      o.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  function addTag(name: string) {
    const trimmed = name.trim();
    if (!trimmed) return;

    const alreadySelected = value.some(
      (v) => v.toLowerCase() === trimmed.toLowerCase(),
    );
    if (alreadySelected) {
      setQuery("");
      return;
    }

    // Se já existe uma Tag com esse nome (case-insensitive), usa o casing dela — evita "Glass" e "glass" como texto diferente antes de salvar
    const existingOption = options.find(
      (o) => o.name.toLowerCase() === trimmed.toLowerCase(),
    );
    onChange([...value, existingOption ? existingOption.name : trimmed]);
    setQuery("");
    inputRef.current?.focus();
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      addTag(query);
    }
    if (event.key === "Backspace" && query === "" && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  }

  return (
    <div className="relative">
      <div className="flex max-h-28 flex-wrap content-start items-center gap-2 overflow-y-auto rounded-lg border border-gs-800 bg-night-black px-3 py-2 focus-within:border-gs-600">
        {value.map((name) => (
          <span
            key={name}
            className="flex items-center gap-1.5 rounded-full bg-gs-800 px-2.5 py-1 text-xs text-off-white"
          >
            {name}
            <button
              type="button"
              onClick={() => onChange(value.filter((v) => v !== name))}
              className="text-gs-500 hover:text-off-white cursor-pointer"
            >
              <X size={12} strokeWidth={2} />
            </button>
          </span>
        ))}

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value.slice(0, 30))}
          maxLength={30}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 100)}
          onKeyDown={handleKeyDown}
          placeholder={value.length === 0 ? "Add Tags.." : ""}
          className="min-w-20 flex-1 bg-transparent text-sm text-off-white outline-none placeholder:text-gs-600"
        />
      </div>

      <div className="mt-1 flex items-center justify-between">
        <p className="text-xs text-gs-600">Press Enter to add</p>
        <CharCounter current={query.length} max={30} />
      </div>

      {isOpen && suggestions.length > 0 && (
        <ul className="absolute top-full left-0 z-10 mt-1 max-h-56 w-full overflow-y-auto rounded-lg border border-gs-800 bg-night-black">
          {suggestions.map((option) => (
            <li key={option.slug}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => addTag(option.name)}
                className="w-full px-3 py-2 text-left text-sm text-gs-400 hover:bg-gs-800 cursor-pointer"
              >
                {option.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
