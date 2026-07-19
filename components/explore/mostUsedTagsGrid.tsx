type TagWithCount = { id: string; name: string; slug: string; count: number };

export default function MostUsedTagsGrid({ tags }: { tags: TagWithCount[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
      {tags.map((tag, index) => (
        <div
          key={tag.id}
          className="flex items-center gap-3 border border-gs-800 bg-night-black rounded-lg"
        >
          <span className="text-md font-medium text-gs-400 bg-true-black h-full w-fit px-4 py-3 rounded-l-lg flex items-center border-e border-gs-800">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="py-2 ">
            <p className="text-sm text-off-white">{tag.name}</p>
            <p className="text-xs text-gs-600">
              {tag.count.toLocaleString()} items
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
