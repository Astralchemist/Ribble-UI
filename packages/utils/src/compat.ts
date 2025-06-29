// Cross-browser compatibility shims
export function closestPolyfill(el: Element, selector: string): Element | null {
  if (el.closest) return el.closest(selector);
  let node: Element | null = el;
  while (node) {
    if ((node as Element).matches(selector)) return node;
    node = node.parentElement;
  }
  return null;
}
