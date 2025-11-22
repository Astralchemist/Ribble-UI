import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `
:host {
  display: inline-block;
  --star-size: 1.5rem;
  --star-color: #fbbf24;
  --star-color-empty: #e5e7eb;
}

.rating-container {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.rating-stars {
  display: inline-flex;
  gap: 0.25rem;
}

.star {
  width: var(--star-size);
  height: var(--star-size);
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--star-color-empty);
}

.star.filled {
  color: var(--star-color);
}

.star.half {
  position: relative;
  color: var(--star-color-empty);
}

.star.half::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  overflow: hidden;
  color: var(--star-color);
}

.star:hover {
  transform: scale(1.1);
}

.star:focus {
  outline: 2px solid var(--color-primary, #3b82f6);
  outline-offset: 2px;
  border-radius: 2px;
}

.rating-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text, #1e293b);
  margin-right: 0.5rem;
}

.rating-value {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text-secondary, #64748b);
  margin-left: 0.5rem;
}

:host([readonly]) .star {
  cursor: default;
  pointer-events: none;
}

:host([disabled]) {
  opacity: 0.6;
  pointer-events: none;
}

:host([size="small"]) {
  --star-size: 1rem;
}

:host([size="large"]) {
  --star-size: 2rem;
}
`;

export class Rating extends UIComponent {
  static is = 'ui-rating';

  @property({ type: Number, reflect: true })
  value = 0;

  @property({ type: Number, reflect: true })
  max = 5;

  @property({ type: Boolean, reflect: true })
  readonly = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  allowHalf = false;

  @property({ type: Boolean, reflect: true })
  showValue = false;

  @property({ type: String, reflect: true })
  label = '';

  @property({ type: String, reflect: true })
  size: 'small' | 'medium' | 'large' = 'medium';

  private hoverValue = 0;

  constructor() {
    super();
    this.setAttribute('role', 'group');
    this.setAttribute('aria-label', 'Rating');
  }

  connectedCallback() {
    super.connectedCallback();
    this._attachEventListeners();
  }

  private _attachEventListeners() {
    if (this.readonly || this.disabled) return;

    const stars = this._shadow.querySelectorAll('.star');
    stars.forEach((star, index) => {
      const starValue = index + 1;

      star.addEventListener('click', () => {
        this.value = starValue;
        this.emit('change', { value: this.value });
        this._render();
        this._attachEventListeners();
      });

      star.addEventListener('mouseenter', () => {
        this.hoverValue = starValue;
        this._updateStars();
      });

      star.addEventListener('mouseleave', () => {
        this.hoverValue = 0;
        this._updateStars();
      });

      // Keyboard navigation
      star.addEventListener('keydown', (e: Event) => {
        const event = e as KeyboardEvent;
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          this.value = starValue;
          this.emit('change', { value: this.value });
          this._render();
          this._attachEventListeners();
        } else if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
          event.preventDefault();
          const nextStar = stars[index + 1] as HTMLElement;
          nextStar?.focus();
        } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
          event.preventDefault();
          const prevStar = stars[index - 1] as HTMLElement;
          prevStar?.focus();
        }
      });
    });
  }

  private _updateStars() {
    const stars = this._shadow.querySelectorAll('.star');
    const displayValue = this.hoverValue || this.value;

    stars.forEach((star, index) => {
      const starValue = index + 1;
      star.classList.toggle('filled', starValue <= displayValue);
    });
  }

  private _renderStar(index: number): string {
    const starValue = index + 1;
    const isFilled = starValue <= this.value;
    const isHalf = this.allowHalf && starValue - 0.5 === this.value;

    return `
      <svg
        class="star ${isFilled ? 'filled' : ''} ${isHalf ? 'half' : ''}"
        part="star"
        tabindex="${this.readonly || this.disabled ? '-1' : '0'}"
        role="radio"
        aria-checked="${isFilled}"
        aria-label="${starValue} star${starValue > 1 ? 's' : ''}"
        viewBox="0 0 24 24"
        fill="${isFilled ? 'currentColor' : 'none'}"
        stroke="currentColor"
        stroke-width="2"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </svg>
    `;
  }

  protected _render() {
    const stars = Array.from({ length: this.max }, (_, i) => this._renderStar(i));

    this._shadow.innerHTML = `
      <style>${style}</style>
      <div class="rating-container" part="container">
        ${this.label ? `<span class="rating-label" part="label">${this.label}</span>` : ''}
        <div class="rating-stars" part="stars" role="radiogroup" aria-label="Rating">
          ${stars.join('')}
        </div>
        ${this.showValue ? `<span class="rating-value" part="value">${this.value} / ${this.max}</span>` : ''}
      </div>
    `;

    this._attachEventListeners();
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    switch (name) {
      case 'value':
        this.value = parseFloat(newValue) || 0;
        break;
      case 'max':
        this.max = parseInt(newValue) || 5;
        break;
      case 'readonly':
        this.readonly = newValue !== null;
        break;
      case 'disabled':
        this.disabled = newValue !== null;
        break;
      case 'allowHalf':
        this.allowHalf = newValue !== null;
        break;
      case 'showValue':
        this.showValue = newValue !== null;
        break;
      case 'label':
        this.label = newValue || '';
        break;
      case 'size':
        this.size = (newValue as any) || 'medium';
        break;
    }
  }
}

customElements.define(Rating.is, Rating);
