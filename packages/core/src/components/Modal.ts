import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `
:host {
  --modal-overlay-bg: rgba(0, 0, 0, 0.5);
  --modal-bg: var(--color-surface, #ffffff);
  --modal-radius: var(--radius-lg, 0.5rem);
  --modal-shadow: var(--shadow-xl, 0 20px 25px rgba(0,0,0,0.15));
  --modal-padding: var(--spacing-6, 1.5rem);
  --modal-text-color: var(--color-text, #1a1a1a);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--modal-overlay-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease;
}

.modal-overlay.hidden {
  display: none;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal {
  background: var(--modal-bg);
  border-radius: var(--modal-radius);
  box-shadow: var(--modal-shadow);
  max-width: 90vw;
  max-height: 90vh;
  overflow: auto;
  animation: slideUp 0.3s ease;
  color: var(--modal-text-color);
}

.modal.small { width: 400px; }
.modal.medium { width: 600px; }
.modal.large { width: 800px; }
.modal.full { width: 90vw; }

.modal-header {
  padding: var(--modal-padding);
  border-bottom: 1px solid var(--color-border, #e0e0e0);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-title {
  margin: 0;
  font-size: var(--font-size-xl, 1.25rem);
  font-weight: var(--font-weight-semibold, 600);
}

.modal-close {
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--spacing-1, 0.25rem);
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm, 0.25rem);
  transition: background 0.2s;
}

.modal-close:hover {
  background: var(--color-surface-hover, #f5f5f5);
}

.modal-body {
  padding: var(--modal-padding);
}

.modal-footer {
  padding: var(--modal-padding);
  border-top: 1px solid var(--color-border, #e0e0e0);
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-2, 0.5rem);
}
`;

export class Modal extends UIComponent {
  static is = 'ui-modal';

  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: String, reflect: true })
  title = '';

  @property({ type: String, reflect: true })
  size: 'small' | 'medium' | 'large' | 'full' = 'medium';

  @property({ type: Boolean, reflect: true })
  closeOnOverlay = true;

  constructor() {
    super({
      shadow: { mode: 'open' },
      aria: { role: 'dialog', modal: 'true' }
    });
  }

  protected _render() {
    const hasFooter = this.querySelector('[slot="footer"]');

    this._shadow.innerHTML = `
      <style>${style}</style>
      <div class="modal-overlay ${!this.open ? 'hidden' : ''}" part="overlay">
        <div class="modal ${this.size}" part="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div class="modal-header" part="header">
            <h2 class="modal-title" id="modal-title" part="title">${this.title}</h2>
            <button class="modal-close" aria-label="Close modal" part="close">
              <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </button>
          </div>
          <div class="modal-body" part="body">
            <slot></slot>
          </div>
          ${hasFooter ? `
            <div class="modal-footer" part="footer">
              <slot name="footer"></slot>
            </div>
          ` : ''}
        </div>
      </div>
    `;

    this._attachEvents();
  }

  protected _attachEvents() {
    const overlay = this._shadow.querySelector('.modal-overlay');
    const closeBtn = this._shadow.querySelector('.modal-close');

    overlay?.addEventListener('click', (e) => {
      if (this.closeOnOverlay && e.target === overlay) {
        this.close();
      }
    });

    closeBtn?.addEventListener('click', () => {
      this.close();
    });
  }

  show() {
    this.open = true;
    this._render();
    this.emit('open', {});
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.open = false;
    this._render();
    this.emit('close', {});
    document.body.style.overflow = '';
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    switch (name) {
      case 'open':
        this.open = newValue !== null;
        if (this.open) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
        break;
      case 'title':
        this.title = newValue || '';
        break;
      case 'size':
        this.size = (newValue as any) || 'medium';
        break;
      case 'close-on-overlay':
        this.closeOnOverlay = newValue !== null;
        break;
    }
  }
}

customElements.define(Modal.is, Modal);
