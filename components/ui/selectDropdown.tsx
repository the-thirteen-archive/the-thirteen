"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, X } from "lucide-react";

type Option = { label: string; value: string };

type SelectDropdownProps = {
  options: Option[];
  selected: string[];
  onChange: (values: string[]) => void;
  placeholder: string;
  multiple?: boolean;
  align?: "left" | "right";
};

export default function SelectDropdown({
  options,
  selected,
  onChange,
  placeholder,
  multiple = false,
  align = "left",
}: SelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) searchRef.current?.focus();
  }, [isOpen]);

  function toggleValue(value: string) {
    if (multiple) {
      const isSelected = selected.includes(value);
      onChange(
        isSelected ? selected.filter((v) => v !== value) : [...selected, value],
      );
    } else {
      onChange([value]);
      setIsOpen(false);
      setQuery("");
    }
  }

  function handleClear(event: React.MouseEvent) {
    event.stopPropagation();
    onChange([]);
    setIsOpen(false);
  }

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(query.trim().toLowerCase()),
  );

  const label =
    selected.length === 0
      ? placeholder
      : multiple
        ? `${selected.length} selected`
        : (options.find((o) => o.value === selected[0])?.label ?? placeholder);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="flex w-full items-center justify-between gap-2 rounded-lg border border-gs-800 bg-night-black px-3 py-2 text-left text-sm text-gs-300 hover:border-gs-600 cursor-pointer"
      >
        <span className={selected.length === 0 ? "text-gs-600" : ""}>
          {label}
        </span>

        <span className="flex shrink-0 items-center gap-1.5">
          {selected.length > 0 && (
            <span
              role="button"
              onClick={handleClear}
              aria-label="Clear selection"
              className="text-gs-500 hover:text-red-500 cursor-pointer"
            >
              <X size={13} strokeWidth={1.5} />
            </span>
          )}
          <ChevronDown size={14} strokeWidth={1.5} className="text-gs-500" />
        </span>
      </button>

      {isOpen && (
        <div
          className={`absolute top-full z-10 mt-1 w-full min-w-[180px] overflow-hidden rounded-lg border border-gs-800 bg-night-black ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          <input
            ref={searchRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="w-full border-b border-gs-800 bg-transparent px-3 py-2 text-sm text-off-white outline-none placeholder:text-gs-600"
          />

          <ul className="max-h-48 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <li className="px-3 py-2 text-sm text-gs-600">
                No options found
              </li>
            ) : (
              filteredOptions.map((option) => (
                <li key={option.value}>
                  <button
                    type="button"
                    onClick={() => toggleValue(option.value)}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-gs-300 hover:bg-gs-800 cursor-pointer"
                  >
                    {multiple && (
                      <input
                        type="checkbox"
                        checked={selected.includes(option.value)}
                        readOnly
                        className="h-3.5 w-3.5 accent-off-white"
                      />
                    )}
                    {option.label}
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
