"use client";

import Image from "next/image";
import Chip from "@/components/ui/chip";
import type { ReferenceCardData } from "@/types/reference";

type ReferenceListRowProps = {
  reference: ReferenceCardData;
  onClick: () => void;
};

export default function ReferenceListRow({
  reference,
  onClick,
}: ReferenceListRowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-4 py-3 text-left transition-colors hover:bg-gs-900/50 cursor-pointer"
    >
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gs-900">
        <Image
          src={reference.mainImage.url}
          alt={reference.mainImage.alt ?? reference.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1">
        <p className="line-clamp-2 text-sm font-medium text-off-white">
          {reference.title}
        </p>
        {reference.subtitle && (
          <p className="truncate text-xs text-gs-500">{reference.subtitle}</p>
        )}
      </div>

      <div className="hidden max-w-xs flex-wrap justify-end gap-1.5 sm:flex">
        {reference.tags.slice(0, 4).map((tag) => (
          <Chip key={tag.slug} label={tag.name} variant="outline" />
        ))}
      </div>
    </button>
  );
}
