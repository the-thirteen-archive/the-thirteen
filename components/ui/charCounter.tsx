export default function CharCounter({
  current,
  max,
}: {
  current: number;
  max: number;
}) {
  return (
    <span
      className={`text-xs ${current >= max ? "text-red-400" : "text-gs-600"}`}
    >
      {current}/{max}
    </span>
  );
}
