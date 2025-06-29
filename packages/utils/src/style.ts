// Convert a style object to a CSS string
export function styleObjToCss(style: Record<string, string | number | undefined>): string {
  return Object.entries(style)
    .filter(([_, v]) => v !== undefined && v !== null)
    .map(([k, v]) => `${k.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase())}:${v}`)
    .join(';');
}
