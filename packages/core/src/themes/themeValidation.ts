// Theme validation and fallback handling utilities.

/**
 * Validate that a theme object contains all required keys.
 * Returns an array of missing keys, or an empty array if valid.
 */
export function validateTheme<T extends Record<string, any>>(
  theme: T,
  requiredKeys: string[],
): string[] {
  return requiredKeys.filter((key) => !(key in theme));
}

/**
 * Returns a theme with missing keys filled from a fallback theme.
 */
export function applyThemeFallback<T extends Record<string, any>>(
  theme: Partial<T>,
  fallback: T,
): T {
  return { ...fallback, ...theme };
}

/**
 * Validate color contrast between two colors (returns contrast ratio).
 * Uses WCAG formula. Returns a number >= 1. Higher is better.
 */
export function getContrastRatio(hex1: string, hex2: string): number {
  function luminance(hex: string) {
    let c = hex.replace('#', '');
    if (c.length === 3)
      c = c
        .split('')
        .map((x) => x + x)
        .join('');
    const rgb = [0, 1, 2].map((i) => parseInt(c.substr(i * 2, 2), 16) / 255);
    const a = rgb.map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
  }
  const l1 = luminance(hex1);
  const l2 = luminance(hex2);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

/**
 * Check if contrast ratio meets WCAG AA (4.5) or AAA (7) standard.
 */
export function isContrastAccessible(
  hex1: string,
  hex2: string,
  level: 'AA' | 'AAA' = 'AA',
): boolean {
  const ratio = getContrastRatio(hex1, hex2);
  return level === 'AAA' ? ratio >= 7 : ratio >= 4.5;
}
