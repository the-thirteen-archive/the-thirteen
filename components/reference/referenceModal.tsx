"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";

import Chip from "@/components/ui/chip";
import type { ReferenceDetailData } from "@/types/reference";

type ReferenceModalProps = {
  reference: ReferenceDetailData | null;
  onClose: () => void;
};

export default function ReferenceModal({
  reference,
  onClose,
}: ReferenceModalProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Reseta pro início toda vez que abre uma Reference diferente
  useEffect(() => {
    setActiveIndex(0);
  }, [reference?.id]);

  useEffect(() => {
    if (!reference) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") goNext();
      if (event.key === "ArrowLeft") goPrev();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reference, activeIndex]);

  if (!reference) return null;

  const gallery = [reference.mainImage, ...reference.gallery];
  const activeImage = gallery[activeIndex];

  function goNext() {
    setActiveIndex((index) => (index + 1) % gallery.length);
  }

  function goPrev() {
    setActiveIndex((index) => (index - 1 + gallery.length) % gallery.length);
  }

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-overlay p-6"
      onClick={() => {
        onClose();
      }}
    >
      <div
        className="flex h-full max-h-200 w-full max-w-7xl flex-col gap-2 rounded-2xl bg-night-black p-3"
        onClick={(event) => event.stopPropagation()}
      >
        {/* row de cima */}
        <div className="flex items-center justify-between text-xs text-gs-500 border p-3 rounded-2xl border-gs-800">
          <div className="flex items-center gap-4 px-2">
            <span>
              {activeIndex + 1} / {gallery.length}
            </span>
            <div className="flex gap-3 items-center rounded-full border-gs-800 border p-1 px-2">
              <button
                type="button"
                onClick={goPrev}
                disabled={gallery.length < 2}
                aria-label="Previous image"
                className="cursor-pointer text-gs-500 hover:text-off-white disabled:opacity-30"
              >
                <ChevronLeft size={16} strokeWidth={1.5} />
              </button>
              <div className="h-4 w-px bg-gs-800"></div>
              <button
                type="button"
                onClick={goNext}
                disabled={gallery.length < 2}
                aria-label="Next image"
                className="cursor-pointer text-gs-500 hover:text-off-white disabled:opacity-30"
              >
                <ChevronRight size={16} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="cursor-pointer flex items-center gap-1 text-gs-500 hover:text-off-white"
          >
            ESC <X size={16} strokeWidth={1.5} />
          </button>
        </div>
        {/* row de baixo */}
        <div className="flex flex-1 items-stretch justify-between gap-2 overflow-hidden">
          {/* imagens */}
          <div className="flex flex-1 flex-col gap-2">
            <div className="relative flex-1 overflow-hidden rounded-2xl">
              <Image
                src={activeImage.url}
                alt={activeImage.alt ?? reference.title}
                fill
                className="object-cover"
              />
            </div>

            {gallery.length > 1 && (
              <div className="flex gap-2 overflow-x-auto bg-gs-900 border border-gs-800 p-2 rounded-2xl">
                {gallery.map((image, index) => (
                  <button
                    key={image.url + index}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`cursor-pointer hover:scale-[1.05] relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border transition-colors ${
                      index === activeIndex
                        ? "scale-[1.05] border-off-white"
                        : "border-transparent"
                    }`}
                  >
                    <Image
                      src={image.url}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/*informações */}
          <div className="flex max-w-80 min-w-80 shrink-0 flex-col gap-6 overflow-y-auto rounded-2xl border border-gs-800 p-6 bg-gs-900">
            <div className="flex flex-col">
              <span className="text-xs tracking-wide text-gs-500 uppercase">
                {reference.type.name}
              </span>
              <h2 className="mt-1 line-clamp-2 text-lg font-medium text-off-white">
                {reference.title}
              </h2>
            </div>

            <div className="flex flex-col gap-3 border-t border-gs-800 pt-4">
              <InfoRow label="Type">
                <Chip label={reference.type.name} />
              </InfoRow>

              {reference.areas.length > 0 && (
                <InfoRow label="Areas">
                  <div className="flex flex-wrap gap-1.5">
                    {reference.areas.map((area) => (
                      <Chip key={area.slug} label={area.name} />
                    ))}
                  </div>
                </InfoRow>
              )}

              <InfoRow label="Added">
                <span className="text-xs text-gs-600">
                  {new Date(reference.createdAt).toLocaleDateString()}
                </span>
              </InfoRow>
            </div>

            {reference.tags.length > 0 && (
              <div className="flex flex-col gap-2 border-t border-gs-800 pt-4">
                <span className="text-xs tracking-wide text-gs-500 uppercase">
                  Tags
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {reference.tags.map((tag) => (
                    <Chip key={tag.slug} label={tag.name} variant="outline" />
                  ))}
                </div>
              </div>
            )}

            {reference.description && (
              <div className="flex flex-col gap-2 border-t border-gs-800 pt-4">
                <span className="text-xs tracking-wide text-gs-500 uppercase">
                  Description
                </span>
                <p className="max-h-30 overflow-y-auto text-sm leading-5 text-gs-400">
                  {reference.description}
                </p>
              </div>
            )}

            {reference.links.length > 0 && (
              <div className="flex flex-col gap-2 border-t border-gs-800 pt-4">
                <span className="text-xs tracking-wide text-gs-500 uppercase">
                  Links
                </span>
                {reference.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-2 rounded-lg border border-gs-800 px-3 py-2 text-sm text-gs-300 hover:border-gs-600 hover:text-off-white"
                  >
                    <span className="truncate">{link.label}</span>
                    <ExternalLink
                      size={14}
                      strokeWidth={1.5}
                      className="shrink-0"
                    />
                  </a>
                ))}
              </div>
            )}

            {reference.metadata && reference.metadata.length > 0 && (
              <div className="flex flex-col gap-2 border-t border-gs-800 pt-4">
                <span className="text-xs tracking-wide text-gs-500 uppercase">
                  Metadata
                </span>
                {reference.metadata.map((field) => (
                  <div
                    key={field.label}
                    className="flex items-center justify-between gap-2 text-xs"
                  >
                    <span className="shrink-0 text-gs-500">{field.label}</span>
                    <span className="truncate text-gs-300">{field.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="shrink-0 text-xs uppercase text-gs-500">{label}</span>
      <div className="flex justify-end">{children}</div>
    </div>
  );
}
