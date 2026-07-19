import { Hash, ArrowRight } from "lucide-react";

type TagWithCount = { id: string; name: string; slug: string; count: number };

export default function RecentlyAddedTagsList({
  tags,
}: {
  tags: TagWithCount[];
}) {
  return (
    <div className="flex flex-col divide-y divide-gs-800 rounded-lg border border-gs-800 ">
      {tags.map((tag) => (
        <div
          key={tag.id}
          className="flex items-center justify-between px-4 py-4 bg-night-black rounded"
        >
          <div className="flex items-center gap-3">
            <div className="flex p-2 rounded bg-gs-900 border border-gs-800">
              <Hash size={14} strokeWidth={1.5} className="text-gs-200 rotate-8" />
            </div>
            <p className="text-sm text-off-white">{tag.name}</p>
            <p className="text-xs text-gs-500">{tag.count} items</p>
          </div>
          {/* <ArrowRight size={14} strokeWidth={1.5} className="text-gs-600" /> */}
        </div>
      ))}
    </div>
  );
}
