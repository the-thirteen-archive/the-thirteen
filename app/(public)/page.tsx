import SearchInput from "@/components/ui/SearchInput";
import ReferenceBrowser from "@/components/reference/referenceBrowser";
import { getTypes } from "@/actions/types/get";
import { getTags } from "@/actions/tags/get";
import { getReferences } from "@/actions/references/get";
import { mapReferenceToDetailData } from "@/lib/mappers/reference";

export default async function Home() {
  const [types, tags, rawReferences] = await Promise.all([
    getTypes(),
    getTags(),
    getReferences(),
  ]);

  const references = rawReferences.map(mapReferenceToDetailData);

  return (
    <main className="flex min-h-screen flex-col gap-4 px-8 py-8">
      <SearchInput />
      <ReferenceBrowser types={types} tags={tags} references={references} />
    </main>
  );
}
