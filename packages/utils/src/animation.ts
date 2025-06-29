// Animation utilities and transitions
export function animate(
  el: Element,
  keyframes: Keyframe[],
  options?: KeyframeAnimationOptions,
): Animation {
  return (el as HTMLElement).animate(keyframes, options);
}
export function transitionEnd(el: Element): Promise<Event> {
  return new Promise((resolve) => {
    el.addEventListener('transitionend', resolve, { once: true });
  });
}
