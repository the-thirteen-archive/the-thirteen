"use client";

import { useRef, useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { compressImages } from "@/lib/image-compression";

type ImageDropzoneProps = {
  multiple?: boolean;
  maxFiles?: number;
  files: File[];
  onChange: (files: File[]) => void;
};

export default function ImageDropzone({
  multiple = false,
  maxFiles = 1,
  files,
  onChange,
}: ImageDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);

  async function addFiles(newFiles: FileList | null) {
    if (!newFiles || newFiles.length === 0) return;

    setIsCompressing(true);
    try {
      const compressed = await compressImages(Array.from(newFiles));
      onChange([...files, ...compressed].slice(0, maxFiles));
    } finally {
      setIsCompressing(false);
    }
  }

  if (multiple) {
    return (
      <div className="flex flex-wrap gap-3">
        {files.map((file, index) => (
          <div
            key={index}
            className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gs-900"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={URL.createObjectURL(file)}
              alt=""
              className="h-full w-full object-cover"
            />
            <button
              type="button"
              onClick={() => onChange(files.filter((_, i) => i !== index))}
              className="absolute top-1 right-1 rounded-full bg-true-black/80 p-1 text-off-white cursor-pointer"
            >
              <X size={12} strokeWidth={2} />
            </button>
          </div>
        ))}

        {files.length < maxFiles && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={isCompressing}
            className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg border border-dashed border-gs-800 text-gs-500 hover:border-gs-600 disabled:opacity-50 cursor-pointer"
          >
            {isCompressing ? (
              <Loader2 size={14} strokeWidth={1.5} className="animate-spin" />
            ) : (
              "+"
            )}
          </button>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>
    );
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        addFiles(e.dataTransfer.files);
      }}
      onClick={() => {
        if (files.length === 0 && !isCompressing) inputRef.current?.click();
      }}
      className={`relative flex h-40 flex-col items-center justify-center gap-2 rounded-xl border border-dashed text-center transition-colors ${
        files.length === 0 && !isCompressing ? "cursor-pointer" : ""
      } ${isDragging ? "border-gs-600 bg-gs-900" : "border-gs-800"}`}
    >
      {isCompressing ? (
        <>
          <Loader2
            size={18}
            strokeWidth={1.5}
            className="animate-spin text-gs-500"
          />
          <p className="text-sm text-gs-500">Compressing...</p>
        </>
      ) : files[0] ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={URL.createObjectURL(files[0])}
            alt=""
            className="h-full w-full rounded-xl object-cover"
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChange([]);
            }}
            className="absolute top-2 right-2 rounded-full bg-true-black/80 p-1.5 text-off-white cursor-pointer"
          >
            <X size={14} strokeWidth={2} />
          </button>
        </>
      ) : (
        <>
          <Upload size={18} strokeWidth={1.5} className="text-gs-500" />
          <p className="text-sm text-gs-500">
            Drag & drop and image
            <br />
            or click to upload
          </p>
        </>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => addFiles(e.target.files)}
      />
    </div>
  );
}
