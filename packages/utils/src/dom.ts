// DOM manipulation utilities
export function qs<T extends Element = Element>(root: ParentNode, sel: string): T | null {
  return root.querySelector(sel);
}
export function qsa<T extends Element = Element>(root: ParentNode, sel: string): T[] {
  return Array.from(root.querySelectorAll(sel));
}
export function createEl<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  props?: Partial<HTMLElementTagNameMap[K]>,
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  if (props) Object.assign(el, props);
  return el;
}
