"use client";

import { useState } from "react";
import ReferenceGrid from "@/components/reference/referenceGrid";
import ReferenceModal from "@/components/reference/referenceModal";
import type { ReferenceDetailData } from "@/types/reference";

export default function CollectionReferenceBrowser({
  references,
}: {
  references: ReferenceDetailData[];
}) {
  const [selected, setSelected] = useState<ReferenceDetailData | null>(null);

  return (
    <>
      <ReferenceGrid
        references={references}
        viewMode="grid"
        onOpen={(reference) => {
          const full = references.find((item) => item.id === reference.id);
          if (full) setSelected(full);
        }}
      />
      <ReferenceModal reference={selected} onClose={() => setSelected(null)} />
    </>
  );
}
