import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

import { getArchiveStats } from "@/actions/stats/get";

const PORTFOLIO_URL = "https://artur-medeiros-26.vercel.app";
const LINKEDIN_URL = "https://www.linkedin.com/in/arthurzop/";

export default async function About() {
  const stats = await getArchiveStats();

  return (
    <main className="flex min-h-screen flex-col gap-8 px-8 py-8">
      <div className="flex flex-col gap-1 border-b border-b-gs-900 pb-8">
        <p className="text-sm text-gs-500 uppercase">since 2026</p>
        <h1 className="text-[64px] leading-16 font-bold">
          About <br /> The Thirteen
        </h1>
        <p className="w-2/3 leading-5 text-gs-400">
          The Thirteen is a curated visual archive built to collect, organize
          and revisit references across design disciplines. Every item is
          intentionally selected, creating a growing library designed for
          research, inspiration and everyday creative work.
        </p>
      </div>

      <div className="flex flex-col gap-4 border-b border-b-gs-900 pb-8">
        <div className="flex gap-4">
          <div className="flex flex-1 flex-col gap-2">
            <h2 className="text-sm tracking-wide text-off-white uppercase">
              My Purpose
            </h2>
            <p className="leading-5 text-gs-400">
              To build a personal archive that evolves over time through careful
              curation rather than endless saving. Every reference exists for a
              reason and contributes to my consistent visual library.
            </p>
          </div>
          <div className="flex flex-1 flex-col gap-2 border-s border-s-gs-900 ps-12">
            <h2 className="text-sm tracking-wide text-off-white uppercase">
              Philosophy behind The Thirteen
            </h2>
            <p className="leading-5 text-gs-400">
              The Thirteen is built around the idea that meaningful references
              come from intentional curation. This archive focuses on selecting,
              organizing and connecting visual material in a way that makes it
              easier to revisit and draw inspiration from.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 border-b border-b-gs-900 pb-8">
        <h2 className="text-sm tracking-wide text-off-white uppercase">
          Stats of the Archive
        </h2>
        <div className="flex rounded-lg border border-gs-900 bg-night-black px-6 py-8">
          <div className="flex-1">
            <h1 className="text-5xl font-medium">
              {stats.references.toLocaleString()}
            </h1>
            <p className="text-sm tracking-wide text-gs-500 uppercase">
              references
            </p>
            <p className="pt-4 text-sm text-gs-200">
              Curated references collected <br /> over time.
            </p>
          </div>
          <div className="flex-1 border-s border-gs-900 ps-8">
            <h1 className="text-5xl font-medium">
              {stats.types.toLocaleString()}
            </h1>
            <p className="text-sm tracking-wide text-gs-500 uppercase">types</p>
            <p className="pt-4 text-sm text-gs-200">
              Object categories used to <br /> organize the archive.
            </p>
          </div>
          <div className="flex-1 border-s border-gs-900 ps-8">
            <h1 className="text-5xl font-medium">
              {stats.areas.toLocaleString()}
            </h1>
            <p className="text-sm tracking-wide text-gs-500 uppercase">areas</p>
            <p className="pt-4 text-sm text-gs-200">
              Design disciplines that provide context for each reference.
            </p>
          </div>
          <div className="flex-1 border-s border-gs-900 ps-8">
            <h1 className="text-5xl font-medium">
              {stats.tags.toLocaleString()}
            </h1>
            <p className="text-sm tracking-wide text-gs-500 uppercase">tags</p>
            <p className="pt-4 text-sm text-gs-200">
              Thematic markers used to connect related references across
              categories.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 border-b border-b-gs-900 pb-8">
        <h2 className="text-sm tracking-wide text-off-white uppercase">
          What you&apos;ll find here
        </h2>
        <div className="flex">
          <div className="flex flex-1 flex-col">
            <p className="font-medium text-gs-200">Curated References</p>
            <p className="leading-5 text-gs-400">
              Discover visual references selected across branding, UI,
              typography, motion, editorial, photography and digital products.
            </p>
          </div>
          <div className="flex flex-1 flex-col border-s border-s-gs-900 ps-6">
            <p className="font-medium text-gs-200">Curated Collections</p>
            <p className="leading-5 text-gs-400">
              Browse handpicked groups of references organized around specific
              themes, aesthetics and creative directions.
            </p>
          </div>
          <div className="flex flex-1 flex-col border-s border-s-gs-900 ps-6">
            <p className="font-medium text-gs-200">External Resources</p>
            <p className="leading-5 text-gs-400">
              Whenever available, visit the original source to explore projects,
              studios, designers and tools in greater depth.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-sm tracking-wide text-off-white uppercase">
          Built by
        </h2>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <p className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gs-900 font-medium text-off-white">
              AM
            </p>
            <div className="flex-1">
              <h3 className="font-medium text-gs-200">
                Hi, I&apos;m Artur Medeiros
              </h3>
              <p className="leading-5 text-gs-400">
                UI Designer passionate about building thoughtful digital
                experiences, visual systems and curated design resources. The
                Thirteen is an extension of my creative process and the archive
                I rely on every day.
              </p>
            </div>
            <p className="flex-1 leading-5 text-gs-400">
              The Thirteen began as a personal solution to organize years of
              collected inspiration into a system that feels intentional,
              searchable and enjoyable to explore. Today it serves as both my
              daily design archive and an evolving collection open for anyone
              looking for thoughtful visual references.
            </p>
          </div>

          <div className="flex gap-4">
            <Link
              href={PORTFOLIO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex cursor-pointer gap-2 rounded-full border border-gs-900 bg-night-black p-2 px-6 hover:bg-gs-900"
            >
              Professional Portfolio
              <SquareArrowOutUpRight width={18} strokeWidth={1.5} />
            </Link>
            <Link
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex cursor-pointer gap-2 rounded-full border border-gs-900 bg-night-black p-2 px-6 hover:bg-gs-900"
            >
              LinkedIn
              <SquareArrowOutUpRight width={18} strokeWidth={1.5} />
            </Link>
            {/* <Link href="..." target="_blank" rel="noopener noreferrer" className="...">
              Twitter <SquareArrowOutUpRight width={18} strokeWidth={1.5} />
            </Link> */}
          </div>
        </div>
      </div>
    </main>
  );
}
