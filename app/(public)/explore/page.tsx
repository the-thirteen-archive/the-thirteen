import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getRecentReferences } from "@/actions/references/get-recents";
import { getCollections } from "@/actions/collections/get";
import {
  getMostUsedTags,
  getRecentlyAddedTags,
} from "@/actions/tags/get-with-counts";
import { mapReferenceToDetailData } from "@/lib/mappers/reference";

import ExploreReferencesRow from "@/components/reference/exploreReferencesRow";
import ExploreCollectionCard from "@/components/collection/exploreCollectionCard";
import MostUsedTagsGrid from "@/components/explore/mostUsedTagsGrid";
import RecentlyAddedTagsList from "@/components/explore/recentlyAddedTagsList";

export default async function ExplorePage() {
  const [rawReferences, collections, mostUsedTags, recentTags] =
    await Promise.all([
      getRecentReferences(7),
      getCollections(6),
      getMostUsedTags(7),
      getRecentlyAddedTags(4),
    ]);

  const references = rawReferences.map(mapReferenceToDetailData);

  return (
    <div className="flex flex-col gap-6 px-8 py-8">
      <div className="flex flex-col border-b border-gs-800 pb-4 gap-1">
        <h1 className="text-xl font-medium text-off-white">Explore</h1>
        <p className="text-sm text-gs-500 w-1/4 ">
          Discover and explore a curated collection of design references across
          different categories and themes.
        </p>
      </div>

      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-medium text-gs-400 uppercase">
            Recently Added
          </h2>
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-off-white"
          >
            <span className="text-sm text-gs-500">View All</span>
            <ArrowRight size={12} strokeWidth={1.5} />
          </Link>
        </div>
        {references.length === 0 ? (
          <p className="text-sm text-gs-500">No references yet.</p>
        ) : (
          <ExploreReferencesRow references={references} />
        )}
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-medium text-gs-400 uppercase">
            Curated Collections
          </h2>
          <Link
            href="/collections"
            className="flex items-center gap-1 text-xs text-gs-500 hover:text-off-white"
          >
            <span className="text-sm text-gs-500">View All</span>
            <ArrowRight size={12} strokeWidth={1.5} />
          </Link>
        </div>
        {collections.length === 0 ? (
          <p className="text-sm text-gs-500">No collections yet.</p>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-2">
            {collections.map((collection) => (
              <ExploreCollectionCard
                key={collection.id}
                collection={collection}
              />
            ))}
          </div>
        )}
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xs font-medium text-gs-400 uppercase">
          Most Used Tags
        </h2>
        {mostUsedTags.length === 0 ? (
          <p className="text-sm text-gs-500">No tags yet.</p>
        ) : (
          <MostUsedTagsGrid tags={mostUsedTags} />
        )}
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xs font-medium text-gs-400 uppercase">
          Recently Added Tags
        </h2>
        {recentTags.length === 0 ? (
          <p className="text-sm text-gs-500">No tags yet.</p>
        ) : (
          <RecentlyAddedTagsList tags={recentTags} />
        )}
      </section>
    </div>
  );
}
