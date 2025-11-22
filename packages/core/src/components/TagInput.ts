import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `
:host {
  display: block;
  width: 100%;
}

.tag-input-container {
  width: 100%;
}

.tags-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.5rem;
  border: 1px solid var(--color-border, #e2e8f0);
  border-radius: var(--radius-md, 0.375rem);
  background: var(--color-surface, #fff);
  min-height: 2.5rem;
  transition: all 0.2s ease;
}

.tags-wrapper:focus-within {
  border-color: var(--color-primary, #3b82f6);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.tag-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.5rem;
  background: var(--color-primary, #3b82f6);
  color: white;
  border-radius: var(--radius-sm, 0.25rem);
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.tag-chip:hover {
  background: var(--color-primary-dark, #2563eb);
}

.tag-text {
  user-select: none;
}

.tag-remove {
  padding: 0;
  border: none;
  background: transparent;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.tag-remove:hover {
  background: rgba(255, 255, 255, 0.2);
}

.tag-remove:focus {
  outline: 2px solid white;
  outline-offset: 1px;
}

.tag-input {
  flex: 1;
  min-width: 8rem;
  padding: 0.25rem 0.5rem;
  border: none;
  outline: none;
  font-size: 0.875rem;
  background: transparent;
  color: var(--color-text, #1e293b);
}

.tag-input::placeholder {
  color: var(--color-text-secondary, #94a3b8);
}

.helper-text {
  display: block;
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: var(--color-text-secondary, #64748b);
}

.error-message {
  display: block;
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: var(--color-error, #ef4444);
}

.tags-wrapper.error {
  border-color: var(--color-error, #ef4444);
}

.tags-wrapper.error:focus-within {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

:host([disabled]) {
  opacity: 0.6;
  pointer-events: none;
}

:host([variant="outline"]) .tag-chip {
  background: transparent;
  color: var(--color-primary, #3b82f6);
  border: 1px solid var(--color-primary, #3b82f6);
}

:host([variant="outline"]) .tag-remove {
  color: var(--color-primary, #3b82f6);
}
`;

export class TagInput extends UIComponent {
  static is = 'ui-tag-input';

  @property({ type: String, reflect: true })
  tags = '';

  @property({ type: String, reflect: true })
  placeholder = 'Add tag...';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Number, reflect: true })
  maxTags = 0;

  @property({ type: Boolean, reflect: true })
  allowDuplicates = false;

  @property({ type: String, reflect: true })
  separator = ',';

  @property({ type: Boolean, reflect: true })
  error = false;

  @property({ type: String, reflect: true })
  errorMessage = '';

  @property({ type: String, reflect: true })
  helperText = '';

  @property({ type: String, reflect: true })
  variant: 'filled' | 'outline' = 'filled';

  private tagList: string[] = [];

  constructor() {
    super();
    this.setAttribute('role', 'group');
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.tags) {
      this.tagList = this.tags.split(this.separator).map(t => t.trim()).filter(Boolean);
    }
    this._attachEventListeners();
  }

  private _attachEventListeners() {
    const input = this._shadow.querySelector('.tag-input') as HTMLInputElement;

    if (input) {
      input.addEventListener('keydown', this._handleKeydown.bind(this));
      input.addEventListener('paste', this._handlePaste.bind(this));
    }

    const removeButtons = this._shadow.querySelectorAll('.tag-remove');
    removeButtons.forEach((btn, index) => {
      btn.addEventListener('click', () => this._removeTag(index));
    });
  }

  private _handleKeydown(e: KeyboardEvent) {
    const input = e.target as HTMLInputElement;
    const value = input.value.trim();

    if (e.key === 'Enter' || e.key === this.separator) {
      e.preventDefault();
      if (value) {
        this._addTag(value);
        input.value = '';
      }
    } else if (e.key === 'Backspace' && !value && this.tagList.length > 0) {
      // Remove last tag if input is empty
      this._removeTag(this.tagList.length - 1);
    }
  }

  private _handlePaste(e: ClipboardEvent) {
    e.preventDefault();
    const pastedData = e.clipboardData?.getData('text') || '';
    const tags = pastedData
      .split(this.separator)
      .map(t => t.trim())
      .filter(Boolean);

    tags.forEach(tag => this._addTag(tag));

    const input = this._shadow.querySelector('.tag-input') as HTMLInputElement;
    if (input) input.value = '';
  }

  private _addTag(tag: string) {
    // Check max tags
    if (this.maxTags > 0 && this.tagList.length >= this.maxTags) {
      this.emit('error', {
        message: `Maximum ${this.maxTags} tags allowed`,
        tag
      });
      return;
    }

    // Check duplicates
    if (!this.allowDuplicates && this.tagList.includes(tag)) {
      this.emit('error', {
        message: 'Duplicate tag not allowed',
        tag
      });
      return;
    }

    this.tagList.push(tag);
    this._updateTags();
    this._render();
    this._attachEventListeners();
    this.emit('add', { tag, tags: this.tagList });
  }

  private _removeTag(index: number) {
    const removedTag = this.tagList[index];
    this.tagList.splice(index, 1);
    this._updateTags();
    this._render();
    this._attachEventListeners();
    this.emit('remove', { tag: removedTag, tags: this.tagList });
  }

  private _updateTags() {
    this.tags = this.tagList.join(this.separator);
    this.emit('change', { tags: this.tagList });
  }

  protected _render() {
    this._shadow.innerHTML = `
      <style>${style}</style>
      <div class="tag-input-container" part="container">
        <div class="tags-wrapper ${this.error ? 'error' : ''}" part="wrapper">
          ${this.tagList.map((tag, index) => `
            <div class="tag-chip" part="tag">
              <span class="tag-text">${tag}</span>
              <button
                class="tag-remove"
                part="remove"
                aria-label="Remove ${tag}"
                tabindex="0"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          `).join('')}
          <input
            type="text"
            class="tag-input"
            part="input"
            placeholder="${this.tagList.length === 0 ? this.placeholder : ''}"
            ${this.disabled ? 'disabled' : ''}
            ${this.maxTags > 0 && this.tagList.length >= this.maxTags ? 'disabled' : ''}
            aria-label="Add tag"
          />
        </div>
        ${this.error && this.errorMessage ? `
          <span class="error-message" part="error" role="alert">${this.errorMessage}</span>
        ` : this.helperText ? `
          <span class="helper-text" part="helper">${this.helperText}</span>
        ` : ''}
      </div>
    `;

    this._attachEventListeners();
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    switch (name) {
      case 'tags':
        this.tags = newValue || '';
        this.tagList = this.tags.split(this.separator).map(t => t.trim()).filter(Boolean);
        break;
      case 'placeholder':
        this.placeholder = newValue || 'Add tag...';
        break;
      case 'disabled':
        this.disabled = newValue !== null;
        break;
      case 'maxTags':
        this.maxTags = parseInt(newValue) || 0;
        break;
      case 'allowDuplicates':
        this.allowDuplicates = newValue !== null;
        break;
      case 'separator':
        this.separator = newValue || ',';
        break;
      case 'error':
        this.error = newValue !== null;
        break;
      case 'errorMessage':
        this.errorMessage = newValue || '';
        break;
      case 'helperText':
        this.helperText = newValue || '';
        break;
      case 'variant':
        this.variant = (newValue as any) || 'filled';
        break;
    }
  }

  // Public API
  public getTags(): string[] {
    return [...this.tagList];
  }

  public addTag(tag: string) {
    this._addTag(tag);
  }

  public removeTag(tag: string) {
    const index = this.tagList.indexOf(tag);
    if (index >= 0) {
      this._removeTag(index);
    }
  }

  public clear() {
    this.tagList = [];
    this._updateTags();
    this._render();
  }
}

customElements.define(TagInput.is, TagInput);
