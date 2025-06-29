// State management helpers (simple observable pattern)
export type Listener<T> = (val: T) => void;
export class State<T> {
  private value: T;
  private listeners = new Set<Listener<T>>();
  constructor(initial: T) {
    this.value = initial;
  }
  get() {
    return this.value;
  }
  set(val: T) {
    if (val !== this.value) {
      this.value = val;
      this.listeners.forEach((fn) => fn(val));
    }
  }
  subscribe(fn: Listener<T>) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }
}
