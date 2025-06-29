// CSS custom property management
export function setCSSVar(el: HTMLElement, name: string, value: string) {
  el.style.setProperty(`--${name}`, value);
}
export function getCSSVar(el: HTMLElement, name: string): string {
  return getComputedStyle(el).getPropertyValue(`--${name}`).trim();
}
export function removeCSSVar(el: HTMLElement, name: string) {
  el.style.removeProperty(`--${name}`);
}
