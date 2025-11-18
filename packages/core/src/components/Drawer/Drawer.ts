import { UIComponent } from '../base/UIComponent';

export type DrawerPosition = 'left' | 'right' | 'top' | 'bottom';
export type DrawerSize = 'small' | 'medium' | 'large' | 'full';

/**
 * Drawer/Sidebar component
 * @element ribble-drawer
 *
 * @fires {CustomEvent} open - Emitted when drawer opens
 * @fires {CustomEvent} close - Emitted when drawer closes
 * @fires {CustomEvent} backdrop-click - Emitted when backdrop is clicked
 *
 * @prop {boolean} open - Whether the drawer is open
 * @prop {DrawerPosition} position - Position of the drawer (left, right, top, bottom)
 * @prop {DrawerSize} size - Size of the drawer
 * @prop {boolean} overlay - Show backdrop overlay
 * @prop {boolean} closeOnBackdrop - Close drawer when clicking backdrop
 * @prop {boolean} closeOnEscape - Close drawer when pressing Escape key
 * @prop {boolean} persistent - Keep drawer open, disable close mechanisms
 *
 * @example
 * <ribble-drawer open position="right" size="medium">
 *   <h2 slot="header">Drawer Title</h2>
 *   <p>Drawer content goes here</p>
 *   <div slot="footer">
 *     <ribble-button>Action</ribble-button>
 *   </div>
 * </ribble-drawer>
 */
export class Drawer extends UIComponent {
  static get observedAttributes() {
    return [
      'open',
      'position',
      'size',
      'overlay',
      'close-on-backdrop',
      'close-on-escape',
      'persistent',
    ];
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

  get position(): DrawerPosition {
    return (this.getAttribute('position') as DrawerPosition) || 'left';
  }

  set position(value: DrawerPosition) {
    this.setAttribute('position', value);
  }

  get size(): DrawerSize {
    return (this.getAttribute('size') as DrawerSize) || 'medium';
  }

  set size(value: DrawerSize) {
    this.setAttribute('size', value);
  }

  get overlay(): boolean {
    return this.hasAttribute('overlay');
  }

  set overlay(value: boolean) {
    if (value) {
      this.setAttribute('overlay', '');
    } else {
      this.removeAttribute('overlay');
    }
  }

  get closeOnBackdrop(): boolean {
    return this.hasAttribute('close-on-backdrop');
  }

  set closeOnBackdrop(value: boolean) {
    if (value) {
      this.setAttribute('close-on-backdrop', '');
    } else {
      this.removeAttribute('close-on-backdrop');
    }
  }

  get closeOnEscape(): boolean {
    return this.hasAttribute('close-on-escape');
  }

  set closeOnEscape(value: boolean) {
    if (value) {
      this.setAttribute('close-on-escape', '');
    } else {
      this.removeAttribute('close-on-escape');
    }
  }

  get persistent(): boolean {
    return this.hasAttribute('persistent');
  }

  set persistent(value: boolean) {
    if (value) {
      this.setAttribute('persistent', '');
    } else {
      this.removeAttribute('persistent');
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.render();
    this.setupEventListeners();

    if (this.open) {
      this.handleOpen();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListeners();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;

    switch (name) {
      case 'open':
        if (newValue !== null) {
          this.handleOpen();
        } else {
          this.handleClose();
        }
        break;
      case 'position':
      case 'size':
        this.updateDrawerClasses();
        break;
    }
  }

  private render() {
    const styles = `
      :host {
        --drawer-bg: var(--color-surface, #fff);
        --drawer-border: var(--color-border, #e5e7eb);
        --drawer-shadow: var(--shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1));
        --backdrop-bg: rgba(0, 0, 0, 0.5);
        --transition-duration: var(--duration-normal, 300ms);
        --transition-easing: var(--easing-standard, cubic-bezier(0.4, 0, 0.2, 1));
      }

      .backdrop {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: var(--backdrop-bg);
        opacity: 0;
        visibility: hidden;
        transition: opacity var(--transition-duration) var(--transition-easing),
                    visibility var(--transition-duration) var(--transition-easing);
        z-index: 999;
      }

      :host([open][overlay]) .backdrop {
        opacity: 1;
        visibility: visible;
      }

      .drawer {
        position: fixed;
        background: var(--drawer-bg);
        box-shadow: var(--drawer-shadow);
        display: flex;
        flex-direction: column;
        transition: transform var(--transition-duration) var(--transition-easing);
        z-index: 1000;
      }

      /* Position variants */
      .drawer.left,
      .drawer.right {
        top: 0;
        bottom: 0;
      }

      .drawer.left {
        left: 0;
        transform: translateX(-100%);
      }

      .drawer.right {
        right: 0;
        transform: translateX(100%);
      }

      .drawer.top,
      .drawer.bottom {
        left: 0;
        right: 0;
      }

      .drawer.top {
        top: 0;
        transform: translateY(-100%);
      }

      .drawer.bottom {
        bottom: 0;
        transform: translateY(100%);
      }

      /* Open state */
      :host([open]) .drawer {
        transform: translate(0, 0);
      }

      /* Size variants - horizontal */
      .drawer.left.small,
      .drawer.right.small {
        width: 256px;
      }

      .drawer.left.medium,
      .drawer.right.medium {
        width: 384px;
      }

      .drawer.left.large,
      .drawer.right.large {
        width: 512px;
      }

      .drawer.left.full,
      .drawer.right.full {
        width: 100%;
      }

      /* Size variants - vertical */
      .drawer.top.small,
      .drawer.bottom.small {
        height: 256px;
      }

      .drawer.top.medium,
      .drawer.bottom.medium {
        height: 384px;
      }

      .drawer.top.large,
      .drawer.bottom.large {
        height: 512px;
      }

      .drawer.top.full,
      .drawer.bottom.full {
        height: 100%;
      }

      .drawer-header {
        padding: 1.5rem;
        border-bottom: 1px solid var(--drawer-border);
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-shrink: 0;
      }

      .drawer-body {
        padding: 1.5rem;
        flex: 1;
        overflow-y: auto;
      }

      .drawer-footer {
        padding: 1.5rem;
        border-top: 1px solid var(--drawer-border);
        flex-shrink: 0;
      }

      .close-button {
        background: transparent;
        border: none;
        padding: 0.5rem;
        cursor: pointer;
        border-radius: var(--radius-sm, 4px);
        color: var(--color-text-secondary, #6b7280);
        transition: background-color 0.2s, color 0.2s;
      }

      .close-button:hover {
        background: var(--color-surface-hover, #f3f4f6);
        color: var(--color-text, #111827);
      }

      .close-button:focus {
        outline: 2px solid var(--color-primary, #3b82f6);
        outline-offset: 2px;
      }

      :host([persistent]) .close-button {
        display: none;
      }

      /* Accessibility */
      .drawer:focus {
        outline: none;
      }

      /* Animation states */
      @media (prefers-reduced-motion: reduce) {
        .drawer,
        .backdrop {
          transition: none;
        }
      }
    `;

    this.shadowRoot!.innerHTML = `
      <style>${styles}</style>
      <div class="backdrop" part="backdrop" aria-hidden="true"></div>
      <div class="drawer ${this.position} ${this.size}"
           part="drawer"
           role="dialog"
           aria-modal="true"
           tabindex="-1">
        <div class="drawer-header" part="header">
          <slot name="header"></slot>
          <button class="close-button"
                  part="close-button"
                  aria-label="Close drawer"
                  type="button">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </button>
        </div>
        <div class="drawer-body" part="body">
          <slot></slot>
        </div>
        <div class="drawer-footer" part="footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }

  private updateDrawerClasses() {
    const drawer = this.shadowRoot!.querySelector('.drawer');
    if (drawer) {
      drawer.className = `drawer ${this.position} ${this.size}`;
    }
  }

  private setupEventListeners() {
    const backdrop = this.shadowRoot!.querySelector('.backdrop');
    const closeButton = this.shadowRoot!.querySelector('.close-button');

    backdrop?.addEventListener('click', () => {
      if (this.closeOnBackdrop && !this.persistent) {
        this.emit('backdrop-click');
        this.close();
      }
    });

    closeButton?.addEventListener('click', () => {
      if (!this.persistent) {
        this.close();
      }
    });

    // Escape key handler
    this.handleEscapeKey = this.handleEscapeKey.bind(this);
  }

  private removeEventListeners() {
    document.removeEventListener('keydown', this.handleEscapeKey);
  }

  private handleEscapeKey(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.closeOnEscape && !this.persistent && this.open) {
      this.close();
    }
  }

  private handleOpen() {
    // Lock body scroll when overlay is shown
    if (this.overlay) {
      document.body.style.overflow = 'hidden';
    }

    // Setup escape key listener
    if (this.closeOnEscape) {
      document.addEventListener('keydown', this.handleEscapeKey);
    }

    // Focus drawer
    const drawer = this.shadowRoot!.querySelector('.drawer') as HTMLElement;
    drawer?.focus();

    this.emit('open');
  }

  private handleClose() {
    // Restore body scroll
    document.body.style.overflow = '';

    // Remove escape key listener
    document.removeEventListener('keydown', this.handleEscapeKey);

    this.emit('close');
  }

  /**
   * Open the drawer
   */
  public openDrawer() {
    this.open = true;
  }

  /**
   * Close the drawer
   */
  public close() {
    this.open = false;
  }

  /**
   * Toggle drawer open/close
   */
  public toggle() {
    this.open = !this.open;
  }
}

// Register component
if (!customElements.get('ribble-drawer')) {
  customElements.define('ribble-drawer', Drawer);
}

export default Drawer;
