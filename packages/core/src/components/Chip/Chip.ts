import { UIComponent } from '../base/UIComponent';

export type ChipVariant = 'filled' | 'outlined' | 'soft';
export type ChipSize = 'small' | 'medium' | 'large';
export type ChipColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'default';

/**
 * Chip/Tag component for labels and tags
 * @element ribble-chip
 *
 * @fires {CustomEvent} remove - Emitted when chip is removed
 * @fires {CustomEvent} click - Emitted when chip is clicked
 *
 * @prop {string} label - Chip label text
 * @prop {ChipVariant} variant - Visual variant
 * @prop {ChipSize} size - Size variant
 * @prop {ChipColor} color - Color scheme
 * @prop {boolean} removable - Show remove button
 * @prop {boolean} clickable - Make chip clickable
 * @prop {boolean} disabled - Disable chip
 *
 * @example
 * <ribble-chip label="Tag" color="primary" removable></ribble-chip>
 */
export class Chip extends UIComponent {
  static get observedAttributes() {
    return [
      'label',
      'variant',
      'size',
      'color',
      'removable',
      'clickable',
      'disabled',
    ];
  }

  get label(): string {
    return this.getAttribute('label') || '';
  }

  set label(value: string) {
    this.setAttribute('label', value);
  }

  get variant(): ChipVariant {
    return (this.getAttribute('variant') as ChipVariant) || 'filled';
  }

  set variant(value: ChipVariant) {
    this.setAttribute('variant', value);
  }

  get size(): ChipSize {
    return (this.getAttribute('size') as ChipSize) || 'medium';
  }

  set size(value: ChipSize) {
    this.setAttribute('size', value);
  }

  get color(): ChipColor {
    return (this.getAttribute('color') as ChipColor) || 'default';
  }

  set color(value: ChipColor) {
    this.setAttribute('color', value);
  }

  get removable(): boolean {
    return this.hasAttribute('removable');
  }

  set removable(value: boolean) {
    if (value) {
      this.setAttribute('removable', '');
    } else {
      this.removeAttribute('removable');
    }
  }

  get clickable(): boolean {
    return this.hasAttribute('clickable');
  }

  set clickable(value: boolean) {
    if (value) {
      this.setAttribute('clickable', '');
    } else {
      this.removeAttribute('clickable');
    }
  }

  get disabled(): boolean {
    return this.hasAttribute('disabled');
  }

  set disabled(value: boolean) {
    if (value) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.render();
    this.setupEventListeners();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;

    if (name === 'label') {
      this.updateLabel();
    }
  }

  private render() {
    const styles = `
      :host {
        --chip-font-size: 0.875rem;
        --chip-padding: 0.25rem 0.75rem;
        --chip-radius: var(--radius-full, 9999px);
        --chip-transition: all 0.2s;
        display: inline-block;
      }

      .chip {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: var(--chip-padding);
        border-radius: var(--chip-radius);
        font-size: var(--chip-font-size);
        font-weight: 500;
        line-height: 1;
        transition: var(--chip-transition);
        border: 1px solid transparent;
        cursor: default;
        user-select: none;
      }

      /* Size variants */
      :host([size="small"]) .chip {
        --chip-font-size: 0.75rem;
        --chip-padding: 0.125rem 0.5rem;
      }

      :host([size="large"]) .chip {
        --chip-font-size: 1rem;
        --chip-padding: 0.5rem 1rem;
      }

      /* Filled variant */
      :host([variant="filled"][color="primary"]) .chip {
        background: var(--color-primary, #3b82f6);
        color: var(--color-primary-contrast, #ffffff);
      }

      :host([variant="filled"][color="secondary"]) .chip {
        background: var(--color-secondary, #6b7280);
        color: var(--color-secondary-contrast, #ffffff);
      }

      :host([variant="filled"][color="success"]) .chip {
        background: var(--color-success, #10b981);
        color: var(--color-success-contrast, #ffffff);
      }

      :host([variant="filled"][color="warning"]) .chip {
        background: var(--color-warning, #f59e0b);
        color: var(--color-warning-contrast, #ffffff);
      }

      :host([variant="filled"][color="error"]) .chip {
        background: var(--color-error, #ef4444);
        color: var(--color-error-contrast, #ffffff);
      }

      :host([variant="filled"][color="info"]) .chip {
        background: var(--color-info, #3b82f6);
        color: var(--color-info-contrast, #ffffff);
      }

      :host([variant="filled"][color="default"]) .chip {
        background: var(--color-surface-secondary, #f3f4f6);
        color: var(--color-text, #111827);
      }

      /* Outlined variant */
      :host([variant="outlined"][color="primary"]) .chip {
        border-color: var(--color-primary, #3b82f6);
        color: var(--color-primary, #3b82f6);
      }

      :host([variant="outlined"][color="secondary"]) .chip {
        border-color: var(--color-secondary, #6b7280);
        color: var(--color-secondary, #6b7280);
      }

      :host([variant="outlined"][color="success"]) .chip {
        border-color: var(--color-success, #10b981);
        color: var(--color-success, #10b981);
      }

      :host([variant="outlined"][color="warning"]) .chip {
        border-color: var(--color-warning, #f59e0b);
        color: var(--color-warning, #f59e0b);
      }

      :host([variant="outlined"][color="error"]) .chip {
        border-color: var(--color-error, #ef4444);
        color: var(--color-error, #ef4444);
      }

      :host([variant="outlined"][color="info"]) .chip {
        border-color: var(--color-info, #3b82f6);
        color: var(--color-info, #3b82f6);
      }

      :host([variant="outlined"][color="default"]) .chip {
        border-color: var(--color-border, #e5e7eb);
        color: var(--color-text, #111827);
      }

      /* Soft variant */
      :host([variant="soft"][color="primary"]) .chip {
        background: var(--color-primary-light, #dbeafe);
        color: var(--color-primary-dark, #1e40af);
      }

      :host([variant="soft"][color="secondary"]) .chip {
        background: var(--color-secondary-light, #f3f4f6);
        color: var(--color-secondary-dark, #374151);
      }

      :host([variant="soft"][color="success"]) .chip {
        background: var(--color-success-light, #d1fae5);
        color: var(--color-success-dark, #065f46);
      }

      :host([variant="soft"][color="warning"]) .chip {
        background: var(--color-warning-light, #fef3c7);
        color: var(--color-warning-dark, #92400e);
      }

      :host([variant="soft"][color="error"]) .chip {
        background: var(--color-error-light, #fee2e2);
        color: var(--color-error-dark, #991b1b);
      }

      :host([variant="soft"][color="info"]) .chip {
        background: var(--color-info-light, #dbeafe);
        color: var(--color-info-dark, #1e40af);
      }

      :host([variant="soft"][color="default"]) .chip {
        background: var(--color-surface-secondary, #f3f4f6);
        color: var(--color-text, #111827);
      }

      /* Clickable state */
      :host([clickable]:not([disabled])) .chip {
        cursor: pointer;
      }

      :host([clickable]:not([disabled])) .chip:hover {
        opacity: 0.85;
        transform: translateY(-1px);
      }

      :host([clickable]:not([disabled])) .chip:active {
        transform: translateY(0);
      }

      /* Disabled state */
      :host([disabled]) .chip {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .avatar {
        width: 1.25em;
        height: 1.25em;
        border-radius: 50%;
        overflow: hidden;
      }

      .icon {
        display: flex;
        align-items: center;
        width: 1em;
        height: 1em;
      }

      .label {
        flex: 1;
      }

      .remove-button {
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        border: none;
        padding: 0;
        cursor: pointer;
        color: inherit;
        opacity: 0.7;
        transition: opacity 0.2s;
        width: 1.25em;
        height: 1.25em;
      }

      .remove-button:hover {
        opacity: 1;
      }

      :host(:not([removable])) .remove-button {
        display: none;
      }

      :host([disabled]) .remove-button {
        cursor: not-allowed;
        pointer-events: none;
      }

      @media (prefers-reduced-motion: reduce) {
        .chip {
          transition: none;
        }
      }
    `;

    this.shadowRoot!.innerHTML = `
      <style>${styles}</style>
      <div class="chip" part="chip" role="button" tabindex="${this.clickable && !this.disabled ? '0' : '-1'}">
        <span class="avatar" part="avatar">
          <slot name="avatar"></slot>
        </span>
        <span class="icon" part="icon">
          <slot name="icon"></slot>
        </span>
        <span class="label" part="label">
          ${this.label}
          <slot></slot>
        </span>
        <button class="remove-button"
                part="remove-button"
                aria-label="Remove"
                type="button">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
            <path d="M4.646 4.646a.5.5 0 01.708 0L7 6.293l1.646-1.647a.5.5 0 01.708.708L7.707 7l1.647 1.646a.5.5 0 01-.708.708L7 7.707 5.354 9.354a.5.5 0 01-.708-.708L6.293 7 4.646 5.354a.5.5 0 010-.708z"/>
          </svg>
        </button>
      </div>
    `;
  }

  private updateLabel() {
    const labelEl = this.shadowRoot!.querySelector('.label');
    if (labelEl && !this.querySelector('[slot]')) {
      labelEl.textContent = this.label;
    }
  }

  private setupEventListeners() {
    const chip = this.shadowRoot!.querySelector('.chip');
    const removeButton = this.shadowRoot!.querySelector('.remove-button');

    chip?.addEventListener('click', () => {
      if (this.clickable && !this.disabled) {
        this.emit('click');
      }
    });

    chip?.addEventListener('keydown', (e: Event) => {
      const event = e as KeyboardEvent;
      if ((event.key === 'Enter' || event.key === ' ') && this.clickable && !this.disabled) {
        event.preventDefault();
        this.emit('click');
      }
    });

    removeButton?.addEventListener('click', (e) => {
      if (!this.disabled) {
        e.stopPropagation();
        this.handleRemove();
      }
    });
  }

  private handleRemove() {
    this.emit('remove');
    this.remove();
  }
}

// Register component
if (!customElements.get('ribble-chip')) {
  customElements.define('ribble-chip', Chip);
}

export default Chip;
