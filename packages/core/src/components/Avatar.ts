import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `
:host {
  display: inline-block;
  --avatar-size: 2.5rem;
  --avatar-bg: var(--color-primary, #007bff);
  --avatar-color: var(--color-on-primary, #fff);
  --avatar-font-size: var(--font-size-base, 1rem);
}

.avatar {
  width: var(--avatar-size);
  height: var(--avatar-size);
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: var(--avatar-bg);
  color: var(--avatar-color);
  font-size: var(--avatar-font-size);
  font-weight: var(--font-weight-medium, 500);
  position: relative;
}

.avatar.small {
  --avatar-size: 1.5rem;
  --avatar-font-size: var(--font-size-xs, 0.75rem);
}

.avatar.large {
  --avatar-size: 3.5rem;
  --avatar-font-size: var(--font-size-lg, 1.125rem);
}

.avatar.square {
  border-radius: var(--radius-md, 0.375rem);
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-initials {
  text-transform: uppercase;
  user-select: none;
}

.avatar-status {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 25%;
  height: 25%;
  border-radius: 50%;
  border: 2px solid var(--color-surface, #fff);
}

.avatar-status.online {
  background: var(--color-success, #4caf50);
}

.avatar-status.offline {
  background: var(--color-border, #9ca3af);
}

.avatar-status.busy {
  background: var(--color-error, #f44336);
}

.avatar-status.away {
  background: var(--color-warning, #ff9800);
}
`;

export class Avatar extends UIComponent {
  static is = 'ui-avatar';

  @property({ type: String, reflect: true })
  src = '';

  @property({ type: String, reflect: true })
  alt = '';

  @property({ type: String, reflect: true })
  initials = '';

  @property({ type: String, reflect: true })
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ type: Boolean, reflect: true })
  square = false;

  @property({ type: String, reflect: true })
  status: '' | 'online' | 'offline' | 'busy' | 'away' = '';

  constructor() {
    super({
      shadow: { mode: 'open' }
    });
  }

  protected _render() {
    const hasImage = this.src.length > 0;
    const hasInitials = this.initials.length > 0;
    const hasStatus = this.status.length > 0;

    this._shadow.innerHTML = `
      <style>${style}</style>
      <div class="avatar ${this.size} ${this.square ? 'square' : ''}" part="avatar">
        ${hasImage ? `
          <img
            src="${this.src}"
            alt="${this.alt || this.initials}"
            class="avatar-image"
            part="image"
          />
        ` : hasInitials ? `
          <span class="avatar-initials" part="initials">${this.initials}</span>
        ` : ''}
        ${hasStatus ? `
          <div class="avatar-status ${this.status}" part="status"></div>
        ` : ''}
      </div>
    `;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    switch (name) {
      case 'src':
        this.src = newValue || '';
        break;
      case 'alt':
        this.alt = newValue || '';
        break;
      case 'initials':
        this.initials = newValue || '';
        break;
      case 'size':
        this.size = (newValue as any) || 'medium';
        break;
      case 'square':
        this.square = newValue !== null;
        break;
      case 'status':
        this.status = (newValue as any) || '';
        break;
    }
  }
}

customElements.define(Avatar.is, Avatar);
