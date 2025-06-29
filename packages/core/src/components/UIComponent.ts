// Base Web Component class for UI Kit
// Provides lifecycle, props, events, ARIA, focus, slots, and more
import type { PropertyOptions } from '../types';

export type Constructor<T = {}> = new (...args: any[]) => T;

export interface UIComponentOptions {
  shadow?: ShadowRootInit;
  aria?: Record<string, string>;
  tabIndex?: number;
}

export abstract class UIComponent extends HTMLElement {
  static observedAttributes: string[] = [];
  static properties: Record<string, PropertyOptions> = {};
  static is: string;

  protected _shadow: ShadowRoot;
  protected _props: Record<string, any> = {};
  protected _slots: Record<string, Node[]> = {};
  protected _isConnected = false;

  constructor(options: UIComponentOptions = {}) {
    super();
    this._shadow = this.attachShadow({ mode: 'open', ...options.shadow });
    this._initProps();
    this._initSlots();
    this._initAria(options.aria);
    if (options.tabIndex !== undefined) this.tabIndex = options.tabIndex;
  }

  // Lifecycle
  connectedCallback() {
    this._isConnected = true;
    this._render();
    this._afterRender();
  }

  disconnectedCallback() {
    this._isConnected = false;
    this._onDisconnect();
  }

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    this._onAttributeChange(name, oldValue, newValue);
    this._reflectToProperty(name, newValue);
    this._render();
  }

  // Property reflection
  protected _reflectToProperty(attr: string, value: any) {
    const prop = (this.constructor as typeof UIComponent).properties[attr];
    if (prop) {
      this._props[attr] = value;
    }
  }

  // Property/attribute sync
  protected _initProps() {
    const props = (this.constructor as typeof UIComponent).properties;
    for (const key in props) {
      Object.defineProperty(this, key, {
        get: function () {
          return this._props[key];
        },
        set: function (val) {
          this._props[key] = val;
          this.setAttribute(key, val);
          this._render();
        },
        configurable: true,
        enumerable: true,
      });
    }
  }

  // Slot system (advanced: named slots and fallback content)
  protected _initSlots() {
    const slotElements = this._shadow.querySelectorAll('slot');
    this._slots = {};
    slotElements.forEach((slot: HTMLSlotElement) => {
      const name = slot.name || 'default';
      this._slots[name] = slot.assignedNodes({ flatten: true });
      // Fallback content
      if (this._slots[name].length === 0 && slot.childNodes.length > 0) {
        this._slots[name] = Array.from(slot.childNodes);
      }
    });
  }

  // ARIA
  protected _initAria(aria?: Record<string, string>) {
    if (aria) {
      for (const k in aria) {
        this.setAttribute('aria-' + k, aria[k]);
      }
    }
  }

  // Full ARIA pattern coverage utility
  protected _setAria(attributes: Record<string, string | boolean | number>) {
    for (const k in attributes) {
      this.setAttribute('aria-' + k, String(attributes[k]));
    }
  }

  // Focus management
  focus(options?: FocusOptions) {
    super.focus(options);
  }

  // Advanced focus management: focus trap and roving tabindex utilities
  protected _focusTrap(container: HTMLElement) {
    const focusable = container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    container.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          (last as HTMLElement).focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          (first as HTMLElement).focus();
        }
      }
    });
  }

  protected _rovingTabindex(container: HTMLElement) {
    const items = Array.from(container.querySelectorAll<HTMLElement>('[tabindex]'));
    let current = 0;
    items.forEach((el, i) => {
      el.tabIndex = i === 0 ? 0 : -1;
      el.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          items[current].tabIndex = -1;
          current = (current + 1) % items.length;
          items[current].tabIndex = 0;
          items[current].focus();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          items[current].tabIndex = -1;
          current = (current - 1 + items.length) % items.length;
          items[current].tabIndex = 0;
          items[current].focus();
        }
      });
    });
  }

  // Event system
  protected emit(event: string, detail?: any, options?: CustomEventInit) {
    this.dispatchEvent(
      new CustomEvent(event, { detail, bubbles: true, composed: true, ...options }),
    );
  }

  // Error boundary with fallback UI
  protected _tryRenderWithErrorBoundary(renderFn: () => void, fallback: string = '<slot></slot>') {
    try {
      renderFn();
    } catch (e) {
      this._shadow.innerHTML = fallback;
      if (this._isDevMode()) {
        this._shadow.innerHTML += `<pre style='color:red'>${(e as Error).message}</pre>`;
      }
    }
  }

  // Development mode runtime warnings/validations
  protected _isDevMode() {
    return !!(window as any).UI_KIT_DEV;
  }
  protected _warn(msg: string) {
    if (this._isDevMode()) {
      // eslint-disable-next-line no-console
      console.warn(`[UIComponent] ${msg}`);
    }
  }

  // Lifecycle hooks
  protected _render() {}
  protected _afterRender() {}
  protected _onDisconnect() {}
  protected _onAttributeChange(_name: string, _oldValue: any, _newValue: any) {}
}
