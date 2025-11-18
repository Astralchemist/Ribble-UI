import { UIComponent } from '../base/UIComponent';
import { icons, type IconName } from './icons';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * Icon component for rendering SVG icons
 * @element ribble-icon
 *
 * @prop {IconName} name - Icon name
 * @prop {IconSize} size - Icon size
 * @prop {string} color - Icon color (CSS color value)
 * @prop {string} label - Accessible label for screen readers
 *
 * @example
 * <ribble-icon name="check" size="md"></ribble-icon>
 */
export class Icon extends UIComponent {
  static get observedAttributes() {
    return ['name', 'size', 'color', 'label'];
  }

  get name(): IconName {
    return (this.getAttribute('name') as IconName) || 'info';
  }

  set name(value: IconName) {
    this.setAttribute('name', value);
  }

  get size(): IconSize {
    return (this.getAttribute('size') as IconSize) || 'md';
  }

  set size(value: IconSize) {
    this.setAttribute('size', value);
  }

  get color(): string {
    return this.getAttribute('color') || 'currentColor';
  }

  set color(value: string) {
    this.setAttribute('color', value);
  }

  get label(): string {
    return this.getAttribute('label') || '';
  }

  set label(value: string) {
    this.setAttribute('label', value);
  }

  connectedCallback() {
    super.connectedCallback();
    this.render();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    this.render();
  }

  private render() {
    const sizeMap: Record<IconSize, string> = {
      xs: '12',
      sm: '16',
      md: '20',
      lg: '24',
      xl: '32',
      '2xl': '48',
    };

    const iconSize = sizeMap[this.size];
    const iconPath = icons[this.name] || icons.info;

    const styles = `
      :host {
        display: inline-block;
        line-height: 0;
      }

      svg {
        width: var(--icon-size, ${iconSize}px);
        height: var(--icon-size, ${iconSize}px);
        fill: none;
        stroke: ${this.color};
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
      }

      :host([size="xs"]) svg {
        --icon-size: 12px;
      }

      :host([size="sm"]) svg {
        --icon-size: 16px;
      }

      :host([size="md"]) svg {
        --icon-size: 20px;
      }

      :host([size="lg"]) svg {
        --icon-size: 24px;
      }

      :host([size="xl"]) svg {
        --icon-size: 32px;
      }

      :host([size="2xl"]) svg {
        --icon-size: 48px;
      }
    `;

    this.shadowRoot!.innerHTML = `
      <style>${styles}</style>
      <svg
        viewBox="0 0 24 24"
        part="svg"
        role="${this.label ? 'img' : 'presentation'}"
        aria-label="${this.label}"
        aria-hidden="${!this.label}">
        ${iconPath}
      </svg>
    `;
  }
}

// Register component
if (!customElements.get('ribble-icon')) {
  customElements.define('ribble-icon', Icon);
}

export default Icon;
