import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `
:host {
  display: inline-block;
  width: 100%;
  max-width: 24rem;
}

.search-container {
  position: relative;
  width: 100%;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  pointer-events: none;
  color: var(--color-text-secondary, #64748b);
}

.search-input {
  width: 100%;
  padding: 0.625rem 2.5rem 0.625rem 2.5rem;
  font-size: 0.875rem;
  border: 1px solid var(--color-border, #e2e8f0);
  border-radius: var(--radius-md, 0.375rem);
  background: var(--color-surface, #fff);
  color: var(--color-text, #1e293b);
  transition: all 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--color-primary, #3b82f6);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.search-input::placeholder {
  color: var(--color-text-secondary, #94a3b8);
}

.clear-btn {
  position: absolute;
  right: 0.75rem;
  padding: 0.25rem;
  border: none;
  background: transparent;
  cursor: pointer;
  color: var(--color-text-secondary, #64748b);
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
  border-radius: var(--radius-sm, 0.25rem);
}

.clear-btn.visible {
  opacity: 1;
  visibility: visible;
}

.clear-btn:hover {
  color: var(--color-text, #1e293b);
  background: var(--color-bg-secondary, #f1f5f9);
}

.search-results {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  right: 0;
  z-index: 50;
  background: var(--color-surface, #fff);
  border: 1px solid var(--color-border, #e2e8f0);
  border-radius: var(--radius-md, 0.375rem);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  max-height: 20rem;
  overflow-y: auto;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-0.5rem);
  transition: all 0.2s ease;
}

.search-results.open {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.search-results::-webkit-scrollbar {
  width: 8px;
}

.search-results::-webkit-scrollbar-thumb {
  background: var(--color-border, #e2e8f0);
  border-radius: 4px;
}

.no-results {
  padding: 1rem;
  text-align: center;
  color: var(--color-text-secondary, #64748b);
  font-size: 0.875rem;
}

:host([disabled]) {
  opacity: 0.6;
  pointer-events: none;
}

:host([size="small"]) .search-input {
  padding: 0.5rem 2rem 0.5rem 2rem;
  font-size: 0.8125rem;
}

:host([size="large"]) .search-input {
  padding: 0.75rem 3rem 0.75rem 3rem;
  font-size: 1rem;
}
`;

export class SearchInput extends UIComponent {
  static is = 'ui-search-input';

  @property({ type: String, reflect: true })
  value = '';

  @property({ type: String, reflect: true })
  placeholder = 'Search...';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String, reflect: true })
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ type: Boolean, reflect: true })
  showClear = true;

  @property({ type: Number, reflect: true })
  debounce = 300;

  private debounceTimeout: number | null = null;

  constructor() {
    super();
    this.setAttribute('role', 'search');
  }

  connectedCallback() {
    super.connectedCallback();
    this._attachEventListeners();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
  }

  private _attachEventListeners() {
    const input = this._shadow.querySelector('.search-input') as HTMLInputElement;
    const clearBtn = this._shadow.querySelector('.clear-btn') as HTMLButtonElement;

    if (input) {
      input.addEventListener('input', this._handleInput.bind(this));
      input.addEventListener('keydown', this._handleKeydown.bind(this));
      input.addEventListener('focus', () => {
        this.emit('focus');
      });
      input.addEventListener('blur', () => {
        this.emit('blur');
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', this._handleClear.bind(this));
    }
  }

  private _handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    this._updateClearButton();

    // Clear existing timeout
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }

    // Emit immediate input event
    this.emit('input', { value: this.value });

    // Emit debounced search event
    this.debounceTimeout = window.setTimeout(() => {
      this.emit('search', { value: this.value });
    }, this.debounce);
  }

  private _handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (this.debounceTimeout) {
        clearTimeout(this.debounceTimeout);
      }
      this.emit('search', { value: this.value });
      this.emit('submit', { value: this.value });
    } else if (e.key === 'Escape') {
      this._handleClear();
    }
  }

  private _handleClear() {
    this.value = '';
    const input = this._shadow.querySelector('.search-input') as HTMLInputElement;
    if (input) {
      input.value = '';
      input.focus();
    }
    this._updateClearButton();
    this.emit('clear');
    this.emit('input', { value: '' });
    this.emit('search', { value: '' });
  }

  private _updateClearButton() {
    const clearBtn = this._shadow.querySelector('.clear-btn');
    if (clearBtn) {
      clearBtn.classList.toggle('visible', this.value.length > 0 && this.showClear);
    }
  }

  protected _render() {
    this._shadow.innerHTML = `
      <style>${style}</style>
      <div class="search-container" part="container">
        <div class="search-input-wrapper">
          <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input
            type="search"
            class="search-input"
            part="input"
            value="${this.value}"
            placeholder="${this.placeholder}"
            ${this.disabled ? 'disabled' : ''}
            aria-label="Search"
            autocomplete="off"
          />
          <button
            class="clear-btn ${this.value && this.showClear ? 'visible' : ''}"
            part="clear"
            aria-label="Clear search"
            tabindex="-1"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="search-results" part="results" role="listbox">
          <slot name="results"></slot>
        </div>
      </div>
    `;

    this._attachEventListeners();
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    switch (name) {
      case 'value':
        this.value = newValue || '';
        break;
      case 'placeholder':
        this.placeholder = newValue || 'Search...';
        break;
      case 'disabled':
        this.disabled = newValue !== null;
        break;
      case 'size':
        this.size = (newValue as any) || 'medium';
        break;
      case 'showClear':
        this.showClear = newValue !== null;
        break;
      case 'debounce':
        this.debounce = parseInt(newValue) || 300;
        break;
    }
  }

  // Public API
  public focus() {
    const input = this._shadow.querySelector('.search-input') as HTMLInputElement;
    input?.focus();
  }

  public clear() {
    this._handleClear();
  }
}

customElements.define(SearchInput.is, SearchInput);
