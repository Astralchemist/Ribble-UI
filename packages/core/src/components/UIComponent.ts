// Base Web Component class for UI Kit
// Provides lifecycle, props, events, ARIA, focus, slots, and more
import type { PropertyOptions } from '../types';

export type Constructor<T = object> = new (...args: any[]) => T;

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
  // Pending aria/tabIndex applied on connect. The HTML spec (and jsdom)
  // forbid a custom-element constructor from mutating `this`'s attributes
  // or children — doing so throws `NotSupportedError: Unexpected
  // attributes`. We stash these options at construction time and apply
  // them during `connectedCallback`.
  private _pendingAria?: Record<string, string>;
  private _pendingTabIndex?: number;

  constructor(options: UIComponentOptions = {}) {
    super();
    this._shadow = this.attachShadow({ mode: 'open', ...options.shadow });
    this._initProps();
    this._initSlots();
    this._pendingAria = options.aria;
    this._pendingTabIndex = options.tabIndex;
  }

  // Lifecycle
  connectedCallback() {
    this._isConnected = true;
    // Apply deferred aria attributes now that we're attached.
    if (this._pendingAria) {
      this._initAria(this._pendingAria);
      this._pendingAria = undefined;
    }
    if (this._pendingTabIndex !== undefined) {
      this.tabIndex = this._pendingTabIndex;
      this._pendingTabIndex = undefined;
    }
    // Flush any property defaults that were set during class-field
    // initialization (before connect) to their attribute representation.
    this._flushPropsToAttributes();
    this._render();
    this._afterRender();
  }

  disconnectedCallback() {
    this._isConnected = false;
    this._onDisconnect();
  }

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    // Reflect attribute → property first with type-coerced value, then let
    // the subclass hook in for custom side-effects. Doing it the other way
    // around would have `_reflectToProperty` clobber anything the subclass
    // wrote in `_onAttributeChange`.
    this._reflectToProperty(name, newValue);
    this._onAttributeChange(name, oldValue, newValue);
    if (this._isConnected) this._render();
  }

  // Property reflection: write `value` (an attribute string or null) into
  // the `_props` bag coerced to the declared property type. Updates via
  // `_props[...]` directly to avoid re-entering `setAttribute` through
  // the property setter.
  protected _reflectToProperty(attr: string, value: any) {
    const prop = (this.constructor as typeof UIComponent).properties[attr];
    if (!prop) return;
    if (prop.type === Boolean) {
      this._props[attr] = value !== null;
    } else if (prop.type === Number) {
      this._props[attr] = value === null ? 0 : Number(value);
    } else {
      this._props[attr] = value ?? '';
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
          // Only touch the DOM once the element is connected — the HTML
          // spec forbids setAttribute during construction and class-field
          // initialization (which runs between super() and the subclass
          // constructor body) will otherwise throw in strict DOM
          // implementations like jsdom.
          if (this._isConnected) {
            this._reflectPropToAttribute(key, val);
            this._render();
          }
        },
        configurable: true,
        enumerable: true,
      });
    }
  }

  // Sync any `_props` values populated before connect (e.g. class-field
  // defaults, or explicit assignments from a renderer) to the element's
  // attribute list, using attribute-appropriate coercion.
  private _flushPropsToAttributes() {
    for (const key in this._props) {
      this._reflectPropToAttribute(key, this._props[key]);
    }
  }

  private _reflectPropToAttribute(key: string, val: unknown) {
    if (val === false || val === null || val === undefined || val === '') {
      if (this.hasAttribute(key)) this.removeAttribute(key);
      return;
    }
    if (val === true) {
      if (!this.hasAttribute(key)) this.setAttribute(key, '');
      return;
    }
    const str = String(val);
    if (this.getAttribute(key) !== str) this.setAttribute(key, str);
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
