// Event forwarding and delegation helpers
export function forwardEvent(src: HTMLElement, dest: HTMLElement, eventNames: string[]) {
  eventNames.forEach((event) => {
    src.addEventListener(event, (e) => {
      // Create a new event of the same type, copying properties
      const evt = new Event(e.type, {
        bubbles: e.bubbles,
        cancelable: e.cancelable,
        composed: (e as any).composed ?? false,
      });
      dest.dispatchEvent(evt);
    });
  });
}
export function delegateEvent(
  root: HTMLElement,
  selector: string,
  event: string,
  handler: (e: Event) => void,
) {
  root.addEventListener(event, (e) => {
    if ((e.target as Element)?.matches(selector)) handler(e);
  });
}
