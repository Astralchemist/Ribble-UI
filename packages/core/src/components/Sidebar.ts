import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `
:host {
  display: block;
}

.sidebar {
  position: fixed;
  top: 0;
  height: 100vh;
  width: var(--sidebar-width, 16rem);
  background: var(--sidebar-bg, var(--color-surface, #fff));
  border-right: 1px solid var(--color-border, #e2e8f0);
  transition: transform 0.3s ease;
  z-index: 40;
  overflow-y: auto;
  box-shadow: var(--sidebar-shadow, none);
}

.sidebar.left {
  left: 0;
}

.sidebar.right {
  right: 0;
  border-right: none;
  border-left: 1px solid var(--color-border, #e2e8f0);
}

.sidebar.collapsed {
  transform: translateX(-100%);
}

.sidebar.right.collapsed {
  transform: translateX(100%);
}

.sidebar-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--color-border, #e2e8f0);
}

.sidebar-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text, #1e293b);
  margin: 0;
}

.sidebar-content {
  padding: 1rem;
}

.sidebar-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--color-border, #e2e8f0);
  margin-top: auto;
}

.toggle-button {
  position: fixed;
  top: 1rem;
  padding: 0.5rem;
  background: var(--color-surface, #fff);
  border: 1px solid var(--color-border, #e2e8f0);
  border-radius: var(--radius-md, 0.375rem);
  cursor: pointer;
  z-index: 41;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.toggle-button:hover {
  background: var(--color-bg-secondary, #f8fafc);
}

.toggle-button.left {
  left: var(--sidebar-width, 16rem);
  transform: translateX(1rem);
}

.toggle-button.right {
  right: var(--sidebar-width, 16rem);
  transform: translateX(-1rem);
}

.toggle-button.collapsed.left {
  left: 0;
  transform: translateX(1rem);
}

.toggle-button.collapsed.right {
  right: 0;
  transform: translateX(-1rem);
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 39;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.overlay.visible {
  opacity: 1;
  visibility: visible;
}

@media (max-width: 768px) {
  .sidebar {
    width: 80vw;
    max-width: 20rem;
  }

  .toggle-button {
    display: none;
  }

  :host([mobile-overlay]) .sidebar.collapsed ~ .overlay {
    display: none;
  }
}

:host([variant="dark"]) .sidebar {
  background: var(--color-bg-dark, #1e293b);
  border-color: var(--color-border-dark, #334155);
}

:host([variant="dark"]) .sidebar-title {
  color: var(--color-text-light, #f1f5f9);
}
`;

export class Sidebar extends UIComponent {
  static is = 'ui-sidebar';

  @property({ type: String, reflect: true })
  title = '';

  @property({ type: String, reflect: true })
  position: 'left' | 'right' = 'left';

  @property({ type: String, reflect: true })
  width = '16rem';

  @property({ type: Boolean, reflect: true })
  collapsed = false;

  @property({ type: Boolean, reflect: true })
  collapsible = true;

  @property({ type: String, reflect: true })
  variant: 'default' | 'dark' = 'default';

  @property({ type: Boolean, reflect: true })
  overlay = true;

  @property({ type: Boolean, reflect: true })
  mobileOverlay = true;

  constructor() {
    super();
    this.setAttribute('role', 'complementary');
  }

  connectedCallback() {
    super.connectedCallback();
    this._attachEventListeners();
  }

  private _attachEventListeners() {
    const toggleBtn = this._shadow.querySelector('.toggle-button') as HTMLButtonElement;
    const overlayEl = this._shadow.querySelector('.overlay') as HTMLElement;

    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        this.collapsed = !this.collapsed;
        this._render();
        this._attachEventListeners();
        this.emit('toggle', { collapsed: this.collapsed });
      });
    }

    if (overlayEl) {
      overlayEl.addEventListener('click', () => {
        this.collapsed = true;
        this._render();
        this._attachEventListeners();
        this.emit('toggle', { collapsed: this.collapsed });
      });
    }
  }

  protected _render() {
    this._shadow.innerHTML = `
      <style>${style}</style>
      <aside
        class="sidebar ${this.position} ${this.collapsed ? 'collapsed' : ''}"
        part="sidebar"
        style="--sidebar-width: ${this.width}; --sidebar-bg: ${this.variant === 'dark' ? 'var(--color-bg-dark, #1e293b)' : 'var(--color-surface, #fff)'};"
        aria-label="${this.title || 'Sidebar'}"
        aria-hidden="${this.collapsed}"
      >
        ${this.title ? `
          <header class="sidebar-header" part="header">
            <h2 class="sidebar-title" part="title">${this.title}</h2>
          </header>
        ` : ''}
        <div class="sidebar-content" part="content">
          <slot></slot>
        </div>
        <footer class="sidebar-footer" part="footer">
          <slot name="footer"></slot>
        </footer>
      </aside>

      ${this.collapsible ? `
        <button
          class="toggle-button ${this.position} ${this.collapsed ? 'collapsed' : ''}"
          part="toggle"
          aria-label="${this.collapsed ? 'Open sidebar' : 'Close sidebar'}"
          aria-expanded="${!this.collapsed}"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            ${this.collapsed
              ? this.position === 'left'
                ? '<polyline points="9 18 15 12 9 6"></polyline>'
                : '<polyline points="15 18 9 12 15 6"></polyline>'
              : this.position === 'left'
                ? '<polyline points="15 18 9 12 15 6"></polyline>'
                : '<polyline points="9 18 15 12 9 6"></polyline>'
            }
          </svg>
        </button>
      ` : ''}

      ${this.overlay && !this.collapsed ? `
        <div class="overlay ${!this.collapsed ? 'visible' : ''}" part="overlay"></div>
      ` : ''}
    `;

    this._attachEventListeners();
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    switch (name) {
      case 'title':
        this.title = newValue || '';
        break;
      case 'position':
        this.position = (newValue as any) || 'left';
        break;
      case 'width':
        this.width = newValue || '16rem';
        break;
      case 'collapsed':
        this.collapsed = newValue !== null;
        break;
      case 'collapsible':
        this.collapsible = newValue !== null;
        break;
      case 'variant':
        this.variant = (newValue as any) || 'default';
        break;
      case 'overlay':
        this.overlay = newValue !== null;
        break;
      case 'mobileOverlay':
        this.mobileOverlay = newValue !== null;
        break;
    }
  }

  // Public API
  public toggle() {
    this.collapsed = !this.collapsed;
    this._render();
    this._attachEventListeners();
  }

  public open() {
    this.collapsed = false;
    this._render();
    this._attachEventListeners();
  }

  public close() {
    this.collapsed = true;
    this._render();
    this._attachEventListeners();
  }
}

customElements.define(Sidebar.is, Sidebar);
