import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `
:host {
  display: block;
  box-sizing: border-box;
}

.box {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: var(--box-padding, 0);
  margin: var(--box-margin, 0);
  background: var(--box-bg, transparent);
  border: var(--box-border, none);
  border-radius: var(--box-radius, 0);
  box-shadow: var(--box-shadow, none);
}

:host([centered]) .box {
  display: flex;
  align-items: center;
  justify-content: center;
}

:host([overflow="hidden"]) .box {
  overflow: hidden;
}

:host([overflow="auto"]) .box {
  overflow: auto;
}

:host([overflow="scroll"]) .box {
  overflow: scroll;
}
`;

export class Box extends UIComponent {
  static is = 'ui-box';

  @property({ type: String, reflect: true })
  padding = '0';

  @property({ type: String, reflect: true })
  margin = '0';

  @property({ type: String, reflect: true })
  bg = 'transparent';

  @property({ type: String, reflect: true })
  border = 'none';

  @property({ type: String, reflect: true })
  radius = '0';

  @property({ type: String, reflect: true })
  shadow = 'none';

  @property({ type: String, reflect: true })
  width = 'auto';

  @property({ type: String, reflect: true })
  height = 'auto';

  @property({ type: Boolean, reflect: true })
  centered = false;

  @property({ type: String, reflect: true })
  overflow: 'visible' | 'hidden' | 'auto' | 'scroll' = 'visible';

  constructor() {
    super();
  }

  protected _render() {
    this._shadow.innerHTML = `
      <style>${style}</style>
      <div
        class="box"
        part="box"
        style="
          --box-padding: ${this.padding};
          --box-margin: ${this.margin};
          --box-bg: ${this.bg};
          --box-border: ${this.border};
          --box-radius: ${this.radius};
          --box-shadow: ${this.shadow};
          width: ${this.width};
          height: ${this.height};
        "
      >
        <slot></slot>
      </div>
    `;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    switch (name) {
      case 'padding':
        this.padding = newValue || '0';
        break;
      case 'margin':
        this.margin = newValue || '0';
        break;
      case 'bg':
        this.bg = newValue || 'transparent';
        break;
      case 'border':
        this.border = newValue || 'none';
        break;
      case 'radius':
        this.radius = newValue || '0';
        break;
      case 'shadow':
        this.shadow = newValue || 'none';
        break;
      case 'width':
        this.width = newValue || 'auto';
        break;
      case 'height':
        this.height = newValue || 'auto';
        break;
      case 'centered':
        this.centered = newValue !== null;
        break;
      case 'overflow':
        this.overflow = (newValue as any) || 'visible';
        break;
    }
  }
}

customElements.define(Box.is, Box);
