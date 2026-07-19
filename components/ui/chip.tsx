type ChipProps = {
  label: string;
  variant?: "solid" | "outline";
};

export default function Chip({ label, variant = "solid" }: ChipProps) {
  return (
    <span
      className={`inline-flex max-w-35 items-center truncate rounded-full px-2.5 py-1 text-xs whitespace-nowrap ${
        variant === "outline"
          ? "border border-gs-800 text-gs-400"
          : "bg-gs-800 text-gs-300"
      }`}
      title={label}
    >
      {label}
    </span>
  );
}
