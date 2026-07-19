"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import {
  exportReferencesToXLSX,
  exportReferencesToJSON,
} from "@/actions/references/export";

function downloadBlob(content: BlobPart, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function base64ToUint8Array(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++)
    bytes[i] = binaryString.charCodeAt(i);
  return bytes;
}

export default function ExportButtons() {
  const [isExporting, setIsExporting] = useState<"xlsx" | "json" | null>(null);

  async function handleExportXLSX() {
    setIsExporting("xlsx");
    try {
      const base64 = await exportReferencesToXLSX();
      const bytes = base64ToUint8Array(base64);
      downloadBlob(
        bytes.buffer as ArrayBuffer,
        "references.xlsx",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      );
    } finally {
      setIsExporting(null);
    }
  }

  async function handleExportJSON() {
    setIsExporting("json");
    try {
      const json = await exportReferencesToJSON();
      downloadBlob(json, "references.json", "application/json");
    } finally {
      setIsExporting(null);
    }
  }

  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="flex p-4 rounded-xl border border-gs-900 justify-between items-center">
        <div className="">
          <p className="text-off-white">Export all references as .XLSX</p>
          <p className="text-sm text-gs-500">
            Download a XLSX file with all references.
          </p>
        </div>
        <button
          type="button"
          onClick={handleExportXLSX}
          disabled={isExporting !== null}
          className="flex items-center justify-between gap-2 rounded-full border min-w-50 h-fit border-gs-800 px-4 py-2 text-sm text-gs-300 hover:bg-off-white hover:text-night-black disabled:opacity-50 cursor-pointer"
        >
          {isExporting === "xlsx" ? "Exporting..." : "Export as XLSX"}
          <Download size={14} strokeWidth={1.5} />
        </button>
      </div>
      <div className="flex p-4 rounded-xl border border-gs-900 justify-between items-center">
        <div className="">
          <p className="text-off-white">Export all references as .JSON</p>
          <p className="text-sm text-gs-500">
            Download a JSON file with all references.
          </p>
        </div>
        <button
          type="button"
          onClick={handleExportJSON}
          disabled={isExporting !== null}
          className="flex items-center justify-between gap-2 rounded-full border min-w-50 h-fit border-gs-800 px-4 py-2 text-sm text-gs-300 hover:bg-off-white hover:text-night-black disabled:opacity-50 cursor-pointer"
        >
          {isExporting === "json" ? "Exporting..." : "Export as JSON"}
          <Download size={14} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
