export function getThemeColor(variable: string) {
  // SSR-safe: getComputedStyle/document não existem no servidor.
  if (typeof window === "undefined" || typeof document === "undefined") {
    return "";
  }
  return getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .trim();
}
