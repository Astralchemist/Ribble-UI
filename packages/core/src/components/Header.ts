import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `
:host {
  display: block;
  width: 100%;
}

.header {
  width: 100%;
  background: var(--header-bg, var(--color-surface, #fff));
  border-bottom: 1px solid var(--color-border, #e2e8f0);
  position: var(--header-position, relative);
  top: 0;
  left: 0;
  right: 0;
  z-index: 30;
  transition: all 0.3s ease;
}

.header-container {
  max-width: var(--header-max-width, 1200px);
  margin: 0 auto;
  padding: var(--header-padding, 1rem);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.header-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text, #1e293b);
  text-decoration: none;
}

.header-logo {
  height: 2rem;
  width: auto;
}

.header-nav {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  justify-content: center;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

:host([sticky]) .header {
  position: sticky;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

:host([fixed]) .header {
  position: fixed;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

:host([variant="transparent"]) .header {
  background: transparent;
  border-bottom: none;
}

:host([variant="dark"]) .header {
  background: var(--color-bg-dark, #1e293b);
  border-bottom-color: var(--color-border-dark, #334155);
}

:host([variant="dark"]) .header-brand {
  color: var(--color-text-light, #f1f5f9);
}

:host([variant="blur"]) .header {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

:host([shadow]) .header {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .header-container {
    padding: 0.75rem 1rem;
  }

  .header-nav {
    display: none;
  }

  :host([mobile-nav]) .header-nav {
    display: flex;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--color-surface, #fff);
    border-bottom: 1px solid var(--color-border, #e2e8f0);
    flex-direction: column;
    padding: 1rem;
  }
}
`;

export class Header extends UIComponent {
  static is = 'ui-header';

  @property({ type: String, reflect: true })
  brand = '';

  @property({ type: String, reflect: true })
  logo = '';

  @property({ type: Boolean, reflect: true })
  sticky = false;

  @property({ type: Boolean, reflect: true })
  fixed = false;

  @property({ type: String, reflect: true })
  variant: 'default' | 'transparent' | 'dark' | 'blur' = 'default';

  @property({ type: Boolean, reflect: true })
  shadow = false;

  @property({ type: String, reflect: true })
  maxWidth = '1200px';

  @property({ type: String, reflect: true })
  padding = '1rem';

  @property({ type: Boolean, reflect: true })
  mobileNav = false;

  constructor() {
    super();
    this.setAttribute('role', 'banner');
  }

  protected _render() {
    this._shadow.innerHTML = `
      <style>${style}</style>
      <header class="header" part="header">
        <div class="header-container" style="--header-max-width: ${this.maxWidth}; --header-padding: ${this.padding};">
          ${this.brand || this.logo ? `
            <div class="header-brand" part="brand">
              ${this.logo ? `<img src="${this.logo}" alt="${this.brand}" class="header-logo" part="logo" />` : ''}
              ${this.brand && !this.logo ? `<span>${this.brand}</span>` : ''}
            </div>
          ` : ''}

          <nav class="header-nav" part="nav" role="navigation">
            <slot name="nav"></slot>
          </nav>

          <div class="header-actions" part="actions">
            <slot name="actions"></slot>
          </div>
        </div>
      </header>
    `;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    switch (name) {
      case 'brand':
        this.brand = newValue || '';
        break;
      case 'logo':
        this.logo = newValue || '';
        break;
      case 'sticky':
        this.sticky = newValue !== null;
        break;
      case 'fixed':
        this.fixed = newValue !== null;
        break;
      case 'variant':
        this.variant = (newValue as any) || 'default';
        break;
      case 'shadow':
        this.shadow = newValue !== null;
        break;
      case 'maxWidth':
        this.maxWidth = newValue || '1200px';
        break;
      case 'padding':
        this.padding = newValue || '1rem';
        break;
      case 'mobileNav':
        this.mobileNav = newValue !== null;
        break;
    }
  }
}

customElements.define(Header.is, Header);
