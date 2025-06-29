// Multi-brand theming support utilities.

/**
 * Multi-brand theming: register and retrieve brand themes.
 */
const brandThemes: Record<string, Record<string, any>> = {};

export function registerBrandTheme(brand: string, theme: Record<string, any>): void {
  brandThemes[brand] = theme;
}

export function getBrandTheme(brand: string): Record<string, any> | undefined {
  return brandThemes[brand];
}

export function listBrands(): string[] {
  return Object.keys(brandThemes);
}
