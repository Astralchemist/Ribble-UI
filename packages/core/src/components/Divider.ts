import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `
:host {
  display: block;
  --divider-color: var(--color-border, #e0e0e0);
  --divider-margin: var(--spacing-4, 1rem);
  --divider-text-color: var(--color-text-muted, #6b7280);
}

.divider {
  display: flex;
  align-items: center;
  margin: var(--divider-margin) 0;
}

.divider.vertical {
  flex-direction: column;
  height: 100%;
  margin: 0 var(--divider-margin);
}

.divider-line {
  flex: 1;
  height: 1px;
  background: var(--divider-color);
}

.divider.vertical .divider-line {
  width: 1px;
  height: 100%;
}

.divider-text {
  padding: 0 var(--spacing-2, 0.5rem);
  font-size: var(--font-size-sm, 0.875rem);
  color: var(--divider-text-color);
  white-space: nowrap;
}

.divider.vertical .divider-text {
  padding: var(--spacing-2, 0.5rem) 0;
}

.divider.dashed .divider-line {
  background: none;
  border-top: 1px dashed var(--divider-color);
}

.divider.vertical.dashed .divider-line {
  border-top: none;
  border-left: 1px dashed var(--divider-color);
}
`;

export class Divider extends UIComponent {
  static is = 'ui-divider';

  @property({ type: String, reflect: true })
  text = '';

  @property({ type: Boolean, reflect: true })
  vertical = false;

  @property({ type: Boolean, reflect: true })
  dashed = false;

  constructor() {
    super({
      shadow: { mode: 'open' },
      aria: { role: 'separator' }
    });
  }

  protected _render() {
    const hasText = this.text.length > 0;

    this._shadow.innerHTML = `
      <style>${style}</style>
      <div
        class="divider ${this.vertical ? 'vertical' : ''} ${this.dashed ? 'dashed' : ''}"
        part="divider"
      >
        ${hasText ? `
          <div class="divider-line" part="line"></div>
          <span class="divider-text" part="text">${this.text}</span>
        ` : ''}
        <div class="divider-line" part="line"></div>
      </div>
    `;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    switch (name) {
      case 'text':
        this.text = newValue || '';
        break;
      case 'vertical':
        this.vertical = newValue !== null;
        break;
      case 'dashed':
        this.dashed = newValue !== null;
        break;
    }
  }
}

customElements.define(Divider.is, Divider);
