import { UIComponent } from '../base/UIComponent';

export type MenuPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';

/**
 * Menu/Dropdown component
 * @element ribble-menu
 *
 * @fires {CustomEvent} open - Emitted when menu opens
 * @fires {CustomEvent} close - Emitted when menu closes
 * @fires {CustomEvent} select - Emitted when menu item is selected
 *
 * @prop {boolean} open - Whether the menu is open
 * @prop {MenuPlacement} placement - Menu placement relative to trigger
 * @prop {boolean} closeOnSelect - Close menu when an item is selected
 * @prop {boolean} closeOnClickOutside - Close menu when clicking outside
 *
 * @example
 * <ribble-menu placement="bottom-start">
 *   <ribble-button slot="trigger">Open Menu</ribble-button>
 *   <ribble-menu-item value="edit">Edit</ribble-menu-item>
 *   <ribble-menu-item value="delete">Delete</ribble-menu-item>
 * </ribble-menu>
 */
export class Menu extends UIComponent {
  private isOpen = false;
  private menuElement!: HTMLElement;
  private triggerElement!: HTMLElement;

  static get observedAttributes() {
    return ['open', 'placement', 'close-on-select', 'close-on-click-outside'];
  }

  get open(): boolean {
    return this.hasAttribute('open');
  }

  set open(value: boolean) {
    if (value) {
      this.setAttribute('open', '');
    } else {
      this.removeAttribute('open');
    }
  }

  get placement(): MenuPlacement {
    return (this.getAttribute('placement') as MenuPlacement) || 'bottom-start';
  }

  set placement(value: MenuPlacement) {
    this.setAttribute('placement', value);
  }

  get closeOnSelect(): boolean {
    return this.hasAttribute('close-on-select');
  }

  set closeOnSelect(value: boolean) {
    if (value) {
      this.setAttribute('close-on-select', '');
    } else {
      this.removeAttribute('close-on-select');
    }
  }

  get closeOnClickOutside(): boolean {
    return this.hasAttribute('close-on-click-outside');
  }

  set closeOnClickOutside(value: boolean) {
    if (value) {
      this.setAttribute('close-on-click-outside', '');
    } else {
      this.removeAttribute('close-on-click-outside');
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.render();
    this.setupEventListeners();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeOutsideClickListener();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;

    if (name === 'open') {
      if (newValue !== null) {
        this.handleOpen();
      } else {
        this.handleClose();
      }
    }
  }

  private render() {
    const styles = `
      :host {
        --menu-bg: var(--color-surface, #ffffff);
        --menu-border: var(--color-border, #e5e7eb);
        --menu-shadow: var(--shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1));
        --menu-radius: var(--radius-md, 6px);
        position: relative;
        display: inline-block;
      }

      .trigger {
        display: inline-block;
      }

      .menu {
        position: absolute;
        background: var(--menu-bg);
        border: 1px solid var(--menu-border);
        border-radius: var(--menu-radius);
        box-shadow: var(--menu-shadow);
        min-width: 200px;
        max-height: 400px;
        overflow-y: auto;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transform: scale(0.95);
        transition: opacity 0.15s, transform 0.15s, visibility 0.15s;
      }

      :host([open]) .menu {
        opacity: 1;
        visibility: visible;
        transform: scale(1);
      }

      /* Placements */
      .menu.bottom,
      .menu.bottom-start,
      .menu.bottom-end {
        top: calc(100% + 8px);
      }

      .menu.top,
      .menu.top-start,
      .menu.top-end {
        bottom: calc(100% + 8px);
      }

      .menu.bottom,
      .menu.top {
        left: 50%;
        transform: translateX(-50%) scale(0.95);
      }

      :host([open]) .menu.bottom,
      :host([open]) .menu.top {
        transform: translateX(-50%) scale(1);
      }

      .menu.bottom-start,
      .menu.top-start {
        left: 0;
      }

      .menu.bottom-end,
      .menu.top-end {
        right: 0;
      }

      .menu.left,
      .menu.left-start,
      .menu.left-end {
        right: calc(100% + 8px);
      }

      .menu.right,
      .menu.right-start,
      .menu.right-end {
        left: calc(100% + 8px);
      }

      .menu.left,
      .menu.right {
        top: 50%;
        transform: translateY(-50%) scale(0.95);
      }

      :host([open]) .menu.left,
      :host([open]) .menu.right {
        transform: translateY(-50%) scale(1);
      }

      .menu.left-start,
      .menu.right-start {
        top: 0;
      }

      .menu.left-end,
      .menu.right-end {
        bottom: 0;
      }

      /* Scrollbar styles */
      .menu::-webkit-scrollbar {
        width: 8px;
      }

      .menu::-webkit-scrollbar-track {
        background: transparent;
      }

      .menu::-webkit-scrollbar-thumb {
        background: var(--color-border, #e5e7eb);
        border-radius: 4px;
      }

      .menu::-webkit-scrollbar-thumb:hover {
        background: var(--color-border-dark, #d1d5db);
      }

      /* Animation */
      @media (prefers-reduced-motion: reduce) {
        .menu {
          transition: none;
        }
      }
    `;

    this.shadowRoot!.innerHTML = `
      <style>${styles}</style>
      <div class="trigger" part="trigger">
        <slot name="trigger"></slot>
      </div>
      <div class="menu ${this.placement}"
           part="menu"
           role="menu"
           aria-orientation="vertical">
        <slot></slot>
      </div>
    `;

    this.menuElement = this.shadowRoot!.querySelector('.menu')!;
    this.triggerElement = this.shadowRoot!.querySelector('.trigger')!;
  }

  private setupEventListeners() {
    // Trigger click
    this.triggerElement.addEventListener('click', () => {
      this.toggle();
    });

    // Listen for menu item selections
    this.addEventListener('menu-item-click', ((e: CustomEvent) => {
      this.handleItemSelect(e.detail);
    }) as EventListener);
  }

  private handleItemSelect(detail: any) {
    this.emit('select', detail);
    if (this.closeOnSelect) {
      this.close();
    }
  }

  private handleOpen() {
    this.isOpen = true;
    this.menuElement.setAttribute('aria-hidden', 'false');

    if (this.closeOnClickOutside) {
      this.addOutsideClickListener();
    }

    this.emit('open');
  }

  private handleClose() {
    this.isOpen = false;
    this.menuElement.setAttribute('aria-hidden', 'true');
    this.removeOutsideClickListener();
    this.emit('close');
  }

  private addOutsideClickListener() {
    setTimeout(() => {
      document.addEventListener('click', this.handleOutsideClick);
    }, 0);
  }

  private removeOutsideClickListener() {
    document.removeEventListener('click', this.handleOutsideClick);
  }

  private handleOutsideClick = (e: Event) => {
    if (!this.contains(e.target as Node)) {
      this.close();
    }
  };

  /**
   * Open the menu
   */
  public openMenu() {
    this.open = true;
  }

  /**
   * Close the menu
   */
  public close() {
    this.open = false;
  }

  /**
   * Toggle menu open/close
   */
  public toggle() {
    this.open = !this.open;
  }
}

/**
 * Menu Item component
 * @element ribble-menu-item
 */
export class MenuItem extends UIComponent {
  static get observedAttributes() {
    return ['value', 'disabled', 'selected'];
  }

  get value(): string {
    return this.getAttribute('value') || '';
  }

  set value(val: string) {
    this.setAttribute('value', val);
  }

  get disabled(): boolean {
    return this.hasAttribute('disabled');
  }

  set disabled(value: boolean) {
    if (value) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  get selected(): boolean {
    return this.hasAttribute('selected');
  }

  set selected(value: boolean) {
    if (value) {
      this.setAttribute('selected', '');
    } else {
      this.removeAttribute('selected');
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.render();
    this.setupEventListeners();
  }

  private render() {
    const styles = `
      :host {
        --item-padding: 0.75rem 1rem;
        --item-hover-bg: var(--color-surface-hover, #f3f4f6);
        --item-text: var(--color-text, #111827);
        display: block;
      }

      .menu-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: var(--item-padding);
        color: var(--item-text);
        cursor: pointer;
        transition: background-color 0.15s;
        border: none;
        background: transparent;
        width: 100%;
        text-align: left;
        font-size: 0.875rem;
      }

      .menu-item:hover:not([disabled]) {
        background: var(--item-hover-bg);
      }

      :host([selected]) .menu-item {
        background: var(--color-primary-light, #dbeafe);
        color: var(--color-primary, #3b82f6);
      }

      :host([disabled]) .menu-item {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .menu-item:focus {
        outline: 2px solid var(--color-primary, #3b82f6);
        outline-offset: -2px;
      }
    `;

    this.shadowRoot!.innerHTML = `
      <style>${styles}</style>
      <button class="menu-item"
              part="menu-item"
              role="menuitem"
              tabindex="${this.disabled ? '-1' : '0'}"
              aria-disabled="${this.disabled}">
        <slot></slot>
      </button>
    `;
  }

  private setupEventListeners() {
    const item = this.shadowRoot!.querySelector('.menu-item');
    item?.addEventListener('click', () => {
      if (!this.disabled) {
        this.emit('menu-item-click', { value: this.value }, true);
      }
    });
  }
}

// Register components
if (!customElements.get('ribble-menu')) {
  customElements.define('ribble-menu', Menu);
}

if (!customElements.get('ribble-menu-item')) {
  customElements.define('ribble-menu-item', MenuItem);
}

export default Menu;
