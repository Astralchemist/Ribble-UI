import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `
:host {
  display: block;
  width: 100%;
}

.section {
  width: 100%;
  padding: var(--section-padding, 4rem 1rem);
  background: var(--section-bg, transparent);
}

.section-container {
  max-width: var(--section-max-width, 1200px);
  margin: 0 auto;
  width: 100%;
}

.section-header {
  margin-bottom: 2rem;
  text-align: var(--section-align, left);
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-text, #1e293b);
  margin: 0 0 0.5rem 0;
}

.section-subtitle {
  font-size: 1.125rem;
  color: var(--color-text-secondary, #64748b);
  margin: 0;
}

.section-content {
  width: 100%;
}

:host([variant="dark"]) .section {
  background: var(--color-bg-dark, #1e293b);
  color: var(--color-text-light, #f1f5f9);
}

:host([variant="dark"]) .section-title {
  color: var(--color-text-light, #ffffff);
}

:host([variant="dark"]) .section-subtitle {
  color: var(--color-text-secondary-light, #cbd5e1);
}

:host([variant="accent"]) .section {
  background: var(--color-primary, #3b82f6);
  color: white;
}

:host([variant="accent"]) .section-title,
:host([variant="accent"]) .section-subtitle {
  color: white;
}

:host([fullwidth]) .section-container {
  max-width: none;
}

@media (max-width: 768px) {
  .section {
    padding: var(--section-padding-mobile, 2rem 1rem);
  }

  .section-title {
    font-size: 1.5rem;
  }

  .section-subtitle {
    font-size: 1rem;
  }
}
`;

export class Section extends UIComponent {
  static is = 'ui-section';

  @property({ type: String, reflect: true })
  title = '';

  @property({ type: String, reflect: true })
  subtitle = '';

  @property({ type: String, reflect: true })
  variant: 'default' | 'dark' | 'accent' = 'default';

  @property({ type: String, reflect: true })
  padding = '4rem 1rem';

  @property({ type: String, reflect: true })
  maxWidth = '1200px';

  @property({ type: String, reflect: true })
  align: 'left' | 'center' | 'right' = 'left';

  @property({ type: Boolean, reflect: true })
  fullwidth = false;

  constructor() {
    super();
    this.setAttribute('role', 'region');
  }

  protected _render() {
    this._shadow.innerHTML = `
      <style>${style}</style>
      <section
        class="section"
        part="section"
        style="--section-padding: ${this.padding};"
      >
        <div class="section-container" style="--section-max-width: ${this.maxWidth};">
          ${this.title || this.subtitle ? `
            <header class="section-header" part="header" style="--section-align: ${this.align};">
              ${this.title ? `<h2 class="section-title" part="title">${this.title}</h2>` : ''}
              ${this.subtitle ? `<p class="section-subtitle" part="subtitle">${this.subtitle}</p>` : ''}
            </header>
          ` : ''}
          <div class="section-content" part="content">
            <slot></slot>
          </div>
        </div>
      </section>
    `;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    switch (name) {
      case 'title':
        this.title = newValue || '';
        if (this.title) this.setAttribute('aria-label', this.title);
        break;
      case 'subtitle':
        this.subtitle = newValue || '';
        break;
      case 'variant':
        this.variant = (newValue as any) || 'default';
        break;
      case 'padding':
        this.padding = newValue || '4rem 1rem';
        break;
      case 'maxWidth':
        this.maxWidth = newValue || '1200px';
        break;
      case 'align':
        this.align = (newValue as any) || 'left';
        break;
      case 'fullwidth':
        this.fullwidth = newValue !== null;
        break;
    }
  }
}

customElements.define(Section.is, Section);
