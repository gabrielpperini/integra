export const cc = "px-1.5 py-2 sm:px-2 sm:py-2.5 text-center";
export const cl = "px-1.5 py-2 sm:px-2 sm:py-2.5 text-left";
export const medal = ["🥇", "🥈", "🥉"];

export function podiumBg(i: number, isZero = false): string {
  if (isZero) return "bg-white";
  return ["bg-row-gold", "bg-row-silver", "bg-row-bronze"][i] ?? "bg-white";
}
