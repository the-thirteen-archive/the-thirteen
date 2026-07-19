const MAX_DIMENSION = 2000; // px no maior lado
const WEBP_QUALITY = 0.82;
const SKIP_BELOW_BYTES = 300 * 1024; // arquivos já pequenos não valem o esforço

export async function compressImage(file: File): Promise<File> {
  // SVG e GIF não passam por canvas — SVG é vetor (recomprimir não faz sentido),
  // GIF perderia a animação se recodificado como imagem estática
  if (file.type === "image/svg+xml" || file.type === "image/gif") return file;
  if (file.size < SKIP_BELOW_BYTES) return file;

  const bitmap = await createImageBitmap(file);
  const scale = Math.min(
    1,
    MAX_DIMENSION / Math.max(bitmap.width, bitmap.height),
  );
  const targetWidth = Math.round(bitmap.width * scale);
  const targetHeight = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = targetWidth;
  canvas.height = targetHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) return file;
  ctx.drawImage(bitmap, 0, 0, targetWidth, targetHeight);

  const blob: Blob | null = await new Promise((resolve) =>
    canvas.toBlob(resolve, "image/webp", WEBP_QUALITY),
  );

  // Se por algum motivo a versão comprimida ficou maior (arquivos já muito otimizados), mantém o original
  if (!blob || blob.size >= file.size) return file;

  const newName = file.name.replace(/\.\w+$/, ".webp");
  return new File([blob], newName, { type: "image/webp" });
}

export async function compressImages(files: File[]): Promise<File[]> {
  return Promise.all(files.map(compressImage));
}
