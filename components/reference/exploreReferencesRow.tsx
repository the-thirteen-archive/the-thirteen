"use client";

import { useState } from "react";
import Image from "next/image";
import ReferenceModal from "@/components/reference/referenceModal";
import { formatTimeAgo } from "@/lib/utils";
import type { ReferenceDetailData } from "@/types/reference";

export default function ExploreReferencesRow({
  references,
}: {
  references: ReferenceDetailData[];
}) {
  const [selected, setSelected] = useState<ReferenceDetailData | null>(null);

  return (
    <>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {references.map((reference) => (
          <button
            key={reference.id}
            type="button"
            onClick={() => setSelected(reference)}
            className="flex w-64 shrink-0 flex-col gap-2 text-left cursor-pointer p-2 bg-night-black rounded-2xl border border-gs-900"
          >
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gs-900">
              <Image
                src={reference.mainImage.url}
                alt={reference.title}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="line-clamp-2 text-sm font-medium text-off-white">
                {reference.title}
              </p>
              {reference.subtitle && (
                <p className="truncate text-xs text-gs-500">
                  {reference.subtitle}
                </p>
              )}
              <p className="mt-1 text-xs text-gs-600">
                {formatTimeAgo(new Date(reference.createdAt))}
              </p>
            </div>
          </button>
        ))}
      </div>

      <ReferenceModal reference={selected} onClose={() => setSelected(null)} />
    </>
  );
}
