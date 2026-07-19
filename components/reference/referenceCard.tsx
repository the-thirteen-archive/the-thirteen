"use client";

import Image from "next/image";
import Chip from "@/components/ui/chip";
import type { ReferenceCardData } from "@/types/reference";

type ReferenceCardProps = {
  reference: ReferenceCardData;
  onClick: () => void;
};

export default function ReferenceCard({
  reference,
  onClick,
}: ReferenceCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full flex-col gap-2 text-left cursor-pointer border border-gs-900 p-2 pb-3 rounded-2xl bg-night-black hover:bg-gs-900"
    >
      <div className="relative w-full overflow-hidden rounded-lg bg-gs-900">
        <Image
          src={reference.mainImage.url}
          alt={reference.mainImage.alt ?? reference.title}
          width={reference.mainImage.width}
          height={reference.mainImage.height}
          className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
        />
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="line-clamp-2 text-sm font-medium text-off-white">
          {reference.title}
        </h3>
        {reference.subtitle && (
          <p className="truncate text-xs text-gs-500">{reference.subtitle}</p>
        )}

        {reference.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {reference.tags.slice(0, 4).map((tag) => (
              <Chip key={tag.slug} label={tag.name} />
            ))}
          </div>
        )}
      </div>
    </button>
  );
}
