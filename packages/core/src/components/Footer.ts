import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `
:host {
  display: block;
  width: 100%;
}

.footer {
  width: 100%;
  background: var(--footer-bg, var(--color-bg-secondary, #f8fafc));
  border-top: 1px solid var(--color-border, #e2e8f0);
  padding: var(--footer-padding, 3rem 1rem);
}

.footer-container {
  max-width: var(--footer-max-width, 1200px);
  margin: 0 auto;
  width: 100%;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text, #1e293b);
  margin: 0;
}

.footer-bottom {
  padding-top: 2rem;
  border-top: 1px solid var(--color-border, #e2e8f0);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-copyright {
  font-size: 0.875rem;
  color: var(--color-text-secondary, #64748b);
}

.footer-links {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.footer-social {
  display: flex;
  gap: 1rem;
}

:host([variant="dark"]) .footer {
  background: var(--color-bg-dark, #1e293b);
  border-top-color: var(--color-border-dark, #334155);
}

:host([variant="dark"]) .footer-title {
  color: var(--color-text-light, #f1f5f9);
}

:host([variant="dark"]) .footer-copyright {
  color: var(--color-text-secondary-light, #94a3b8);
}

:host([variant="dark"]) .footer-bottom {
  border-top-color: var(--color-border-dark, #334155);
}

:host([centered]) .footer-content {
  grid-template-columns: 1fr;
  text-align: center;
  align-items: center;
}

:host([centered]) .footer-section {
  align-items: center;
}

:host([centered]) .footer-bottom {
  justify-content: center;
  flex-direction: column;
}

@media (max-width: 768px) {
  .footer {
    padding: 2rem 1rem;
  }

  .footer-content {
    grid-template-columns: 1fr;
  }

  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }

  .footer-links {
    justify-content: center;
  }
}
`;

export class Footer extends UIComponent {
  static is = 'ui-footer';

  @property({ type: String, reflect: true })
  copyright = '';

  @property({ type: String, reflect: true })
  variant: 'default' | 'dark' = 'default';

  @property({ type: String, reflect: true })
  maxWidth = '1200px';

  @property({ type: String, reflect: true })
  padding = '3rem 1rem';

  @property({ type: Boolean, reflect: true })
  centered = false;

  constructor() {
    super();
    this.setAttribute('role', 'contentinfo');
  }

  protected _render() {
    const currentYear = new Date().getFullYear();
    const copyrightText = this.copyright || `© ${currentYear} All rights reserved`;

    this._shadow.innerHTML = `
      <style>${style}</style>
      <footer
        class="footer"
        part="footer"
        style="--footer-max-width: ${this.maxWidth}; --footer-padding: ${this.padding};"
      >
        <div class="footer-container">
          <div class="footer-content" part="content">
            <slot></slot>
          </div>

          <div class="footer-bottom" part="bottom">
            <div class="footer-copyright" part="copyright">
              ${copyrightText}
            </div>
            <div class="footer-links" part="links">
              <slot name="links"></slot>
            </div>
            <div class="footer-social" part="social">
              <slot name="social"></slot>
            </div>
          </div>
        </div>
      </footer>
    `;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    switch (name) {
      case 'copyright':
        this.copyright = newValue || '';
        break;
      case 'variant':
        this.variant = (newValue as any) || 'default';
        break;
      case 'maxWidth':
        this.maxWidth = newValue || '1200px';
        break;
      case 'padding':
        this.padding = newValue || '3rem 1rem';
        break;
      case 'centered':
        this.centered = newValue !== null;
        break;
    }
  }
}

customElements.define(Footer.is, Footer);
