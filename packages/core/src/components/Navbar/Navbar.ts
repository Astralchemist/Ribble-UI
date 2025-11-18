import { UIComponent } from '../base/UIComponent';

export type NavbarVariant = 'default' | 'sticky' | 'fixed';

/**
 * Navigation bar component
 * @element ribble-navbar
 *
 * @fires {CustomEvent} menu-toggle - Emitted when mobile menu is toggled
 *
 * @prop {NavbarVariant} variant - Navigation bar style variant
 * @prop {boolean} transparent - Transparent background
 * @prop {boolean} shadow - Add shadow to navbar
 *
 * @example
 * <ribble-navbar variant="sticky">
 *   <span slot="brand">My App</span>
 *   <nav slot="nav">
 *     <a href="/">Home</a>
 *     <a href="/about">About</a>
 *   </nav>
 *   <div slot="actions">
 *     <ribble-button>Sign In</ribble-button>
 *   </div>
 * </ribble-navbar>
 */
export class Navbar extends UIComponent {
  private mobileMenuOpen = false;

  static get observedAttributes() {
    return ['variant', 'transparent', 'shadow'];
  }

  get variant(): NavbarVariant {
    return (this.getAttribute('variant') as NavbarVariant) || 'default';
  }

  set variant(value: NavbarVariant) {
    this.setAttribute('variant', value);
  }

  get transparent(): boolean {
    return this.hasAttribute('transparent');
  }

  set transparent(value: boolean) {
    if (value) {
      this.setAttribute('transparent', '');
    } else {
      this.removeAttribute('transparent');
    }
  }

  get shadow(): boolean {
    return this.hasAttribute('shadow');
  }

  set shadow(value: boolean) {
    if (value) {
      this.setAttribute('shadow', '');
    } else {
      this.removeAttribute('shadow');
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
        --navbar-height: 64px;
        --navbar-bg: var(--color-surface, #ffffff);
        --navbar-text: var(--color-text, #111827);
        --navbar-border: var(--color-border, #e5e7eb);
        --navbar-shadow: var(--shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1));
        display: block;
      }

      :host([variant="sticky"]) {
        position: sticky;
        top: 0;
        z-index: 100;
      }

      :host([variant="fixed"]) {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 100;
      }

      .navbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: var(--navbar-height);
        padding: 0 1.5rem;
        background: var(--navbar-bg);
        border-bottom: 1px solid var(--navbar-border);
        transition: background-color 0.3s, box-shadow 0.3s;
      }

      :host([transparent]) .navbar {
        background: transparent;
        border-bottom-color: transparent;
      }

      :host([shadow]) .navbar {
        box-shadow: var(--navbar-shadow);
      }

      .brand {
        display: flex;
        align-items: center;
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--navbar-text);
        text-decoration: none;
      }

      .nav-container {
        display: flex;
        align-items: center;
        gap: 2rem;
        flex: 1;
        margin: 0 2rem;
      }

      .nav-links {
        display: flex;
        align-items: center;
        gap: 1.5rem;
      }

      .actions {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .mobile-toggle {
        display: none;
        background: transparent;
        border: none;
        padding: 0.5rem;
        cursor: pointer;
        color: var(--navbar-text);
        border-radius: var(--radius-sm, 4px);
      }

      .mobile-toggle:hover {
        background: var(--color-surface-hover, #f3f4f6);
      }

      .mobile-toggle:focus {
        outline: 2px solid var(--color-primary, #3b82f6);
        outline-offset: 2px;
      }

      .mobile-menu {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--navbar-bg);
        border-bottom: 1px solid var(--navbar-border);
        box-shadow: var(--navbar-shadow);
        padding: 1rem;
        flex-direction: column;
        gap: 0.5rem;
      }

      .mobile-menu.open {
        display: flex;
      }

      /* Responsive */
      @media (max-width: 768px) {
        .nav-container {
          display: none;
        }

        .mobile-toggle {
          display: flex;
        }

        .actions {
          margin-left: auto;
          margin-right: 0.5rem;
        }
      }

      /* Accessibility */
      :host([variant="fixed"]) ~ * {
        margin-top: var(--navbar-height);
      }
    `;

    this.shadowRoot!.innerHTML = `
      <style>${styles}</style>
      <nav class="navbar" part="navbar" role="navigation" aria-label="Main navigation">
        <div class="brand" part="brand">
          <slot name="brand"></slot>
        </div>

        <div class="nav-container" part="nav-container">
          <div class="nav-links" part="nav-links">
            <slot name="nav"></slot>
          </div>
        </div>

        <div class="actions" part="actions">
          <slot name="actions"></slot>
        </div>

        <button class="mobile-toggle"
                part="mobile-toggle"
                aria-label="Toggle mobile menu"
                aria-expanded="${this.mobileMenuOpen}"
                type="button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </nav>

      <div class="mobile-menu" part="mobile-menu" role="menu">
        <slot name="mobile-nav"></slot>
      </div>
    `;
  }

  private setupEventListeners() {
    const toggleButton = this.shadowRoot!.querySelector('.mobile-toggle');
    toggleButton?.addEventListener('click', () => {
      this.toggleMobileMenu();
    });
  }

  private toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    const mobileMenu = this.shadowRoot!.querySelector('.mobile-menu');
    const toggleButton = this.shadowRoot!.querySelector('.mobile-toggle');

    if (this.mobileMenuOpen) {
      mobileMenu?.classList.add('open');
      toggleButton?.setAttribute('aria-expanded', 'true');
    } else {
      mobileMenu?.classList.remove('open');
      toggleButton?.setAttribute('aria-expanded', 'false');
    }

    this.emit('menu-toggle', { open: this.mobileMenuOpen });
  }

  /**
   * Close mobile menu
   */
  public closeMobileMenu() {
    if (this.mobileMenuOpen) {
      this.toggleMobileMenu();
    }
  }
}

// Register component
if (!customElements.get('ribble-navbar')) {
  customElements.define('ribble-navbar', Navbar);
}

export default Navbar;
