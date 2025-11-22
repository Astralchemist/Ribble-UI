import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `
:host {
  display: block;
}

.spacer {
  width: var(--spacer-width, auto);
  height: var(--spacer-height, auto);
}

:host([direction="horizontal"]) .spacer {
  width: var(--spacer-size, 1rem);
  height: auto;
  display: inline-block;
}

:host([direction="vertical"]) .spacer {
  width: auto;
  height: var(--spacer-size, 1rem);
  display: block;
}

:host([flex]) .spacer {
  flex: 1;
}
`;

export class Spacer extends UIComponent {
  static is = 'ui-spacer';

  @property({ type: String, reflect: true })
  size = '1rem';

  @property({ type: String, reflect: true })
  direction: 'horizontal' | 'vertical' | 'both' = 'vertical';

  @property({ type: Boolean, reflect: true })
  flex = false;

  constructor() {
    super();
    this.setAttribute('aria-hidden', 'true');
  }

  protected _render() {
    let width = 'auto';
    let height = 'auto';

    if (this.direction === 'horizontal') {
      width = this.size;
    } else if (this.direction === 'vertical') {
      height = this.size;
    } else {
      width = this.size;
      height = this.size;
    }

    this._shadow.innerHTML = `
      <style>${style}</style>
      <div
        class="spacer"
        part="spacer"
        style="--spacer-size: ${this.size}; --spacer-width: ${width}; --spacer-height: ${height};"
      ></div>
    `;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    switch (name) {
      case 'size':
        this.size = newValue || '1rem';
        break;
      case 'direction':
        this.direction = (newValue as any) || 'vertical';
        break;
      case 'flex':
        this.flex = newValue !== null;
        break;
    }
  }
}

customElements.define(Spacer.is, Spacer);
