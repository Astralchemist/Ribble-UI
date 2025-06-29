// Accessibility helpers (ARIA, focus management)
export function setAria(el: Element, name: string, value: string | boolean) {
  el.setAttribute(`aria-${name}`, String(value));
}
export function focusFirstDescendant(el: HTMLElement): boolean {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (node) =>
      (node as HTMLElement).tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP,
  });
  let node = walker.nextNode() as HTMLElement | null;
  while (node) {
    if (typeof node.focus === 'function') {
      node.focus();
      return true;
    }
    node = walker.nextNode() as HTMLElement | null;
  }
  return false;
}
