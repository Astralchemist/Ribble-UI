import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `
:host {
  display: inline-block;
  width: 100%;
  max-width: 16rem;
}

.timepicker-container {
  position: relative;
  width: 100%;
}

.timepicker-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.timepicker-input {
  width: 100%;
  padding: 0.5rem 2.5rem 0.5rem 1rem;
  font-size: 0.875rem;
  border: 1px solid var(--color-border, #e2e8f0);
  border-radius: var(--radius-md, 0.375rem);
  background: var(--color-surface, #fff);
  color: var(--color-text, #1e293b);
  cursor: pointer;
  transition: all 0.2s ease;
}

.timepicker-input:hover {
  border-color: var(--color-primary, #3b82f6);
}

.timepicker-input:focus {
  outline: none;
  border-color: var(--color-primary, #3b82f6);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.timepicker-icon {
  position: absolute;
  right: 0.75rem;
  pointer-events: none;
  color: var(--color-text-secondary, #64748b);
}

.timepicker-dropdown {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  z-index: 50;
  background: var(--color-surface, #fff);
  border: 1px solid var(--color-border, #e2e8f0);
  border-radius: var(--radius-md, 0.375rem);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  min-width: 14rem;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-0.5rem);
  transition: all 0.2s ease;
}

.timepicker-dropdown.open {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.time-selectors {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
}

.time-column {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.time-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text-secondary, #64748b);
  margin-bottom: 0.5rem;
}

.time-scroll {
  max-height: 12rem;
  overflow-y: auto;
  border: 1px solid var(--color-border, #e2e8f0);
  border-radius: var(--radius-sm, 0.25rem);
  padding: 0.25rem;
}

.time-scroll::-webkit-scrollbar {
  width: 6px;
}

.time-scroll::-webkit-scrollbar-thumb {
  background: var(--color-border, #e2e8f0);
  border-radius: 3px;
}

.time-option {
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  text-align: center;
  border-radius: var(--radius-sm, 0.25rem);
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  background: transparent;
  color: var(--color-text, #1e293b);
  width: 100%;
  min-width: 3rem;
}

.time-option:hover {
  background: var(--color-bg-secondary, #f1f5f9);
}

.time-option.selected {
  background: var(--color-primary, #3b82f6);
  color: white;
}

.separator {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-text, #1e293b);
  align-self: center;
  margin-top: 1.5rem;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  justify-content: flex-end;
}

.btn {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  border-radius: var(--radius-md, 0.375rem);
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  background: var(--color-primary, #3b82f6);
  color: white;
}

.btn-primary:hover {
  background: var(--color-primary-dark, #2563eb);
}

.btn-secondary {
  background: var(--color-bg-secondary, #f1f5f9);
  color: var(--color-text, #1e293b);
}

.btn-secondary:hover {
  background: var(--color-border, #e2e8f0);
}

:host([disabled]) {
  opacity: 0.6;
  pointer-events: none;
}
`;

export class TimePicker extends UIComponent {
  static is = 'ui-time-picker';

  @property({ type: String, reflect: true })
  value = '';

  @property({ type: String, reflect: true })
  placeholder = 'Select time';

  @property({ type: Boolean, reflect: true })
  use24Hour = false;

  @property({ type: Number, reflect: true })
  minuteStep = 1;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  private isOpen = false;
  private selectedHour = 12;
  private selectedMinute = 0;
  private selectedPeriod: 'AM' | 'PM' = 'AM';

  constructor() {
    super();
    this.setAttribute('role', 'group');
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.value) {
      this._parseValue();
    }
    this._attachEventListeners();
  }

  private _parseValue() {
    const [time, period] = this.value.split(' ');
    const [hour, minute] = time.split(':').map(Number);

    if (this.use24Hour) {
      this.selectedHour = hour;
    } else {
      this.selectedHour = hour > 12 ? hour - 12 : hour;
      this.selectedPeriod = hour >= 12 ? 'PM' : 'AM';
    }
    this.selectedMinute = minute;
  }

  private _attachEventListeners() {
    const input = this._shadow.querySelector('.timepicker-input') as HTMLInputElement;
    if (input) {
      input.addEventListener('click', () => this._toggleDropdown());
    }

    const options = this._shadow.querySelectorAll('.time-option');
    options.forEach((option) => {
      option.addEventListener('click', (e) => {
        const type = (e.target as HTMLElement).getAttribute('data-type');
        const value = (e.target as HTMLElement).getAttribute('data-value');
        if (type && value) {
          this._selectTime(type, value);
        }
      });
    });

    const confirmBtn = this._shadow.querySelector('.btn-confirm');
    const cancelBtn = this._shadow.querySelector('.btn-cancel');

    if (confirmBtn) {
      confirmBtn.addEventListener('click', () => {
        this._confirmTime();
      });
    }

    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        this._closeDropdown();
      });
    }

    document.addEventListener('click', (e) => {
      if (!this.contains(e.target as Node)) {
        this._closeDropdown();
      }
    });
  }

  private _toggleDropdown() {
    this.isOpen = !this.isOpen;
    const dropdown = this._shadow.querySelector('.timepicker-dropdown');
    dropdown?.classList.toggle('open', this.isOpen);
  }

  private _closeDropdown() {
    this.isOpen = false;
    const dropdown = this._shadow.querySelector('.timepicker-dropdown');
    dropdown?.classList.remove('open');
  }

  private _selectTime(type: string, value: string) {
    if (type === 'hour') {
      this.selectedHour = parseInt(value);
    } else if (type === 'minute') {
      this.selectedMinute = parseInt(value);
    } else if (type === 'period') {
      this.selectedPeriod = value as 'AM' | 'PM';
    }
    this._render();
    this._attachEventListeners();
  }

  private _confirmTime() {
    let hour = this.selectedHour;
    if (!this.use24Hour) {
      if (this.selectedPeriod === 'PM' && hour < 12) hour += 12;
      if (this.selectedPeriod === 'AM' && hour === 12) hour = 0;
    }

    const hourStr = String(hour).padStart(2, '0');
    const minuteStr = String(this.selectedMinute).padStart(2, '0');
    this.value = this.use24Hour
      ? `${hourStr}:${minuteStr}`
      : `${String(this.selectedHour).padStart(2, '0')}:${minuteStr} ${this.selectedPeriod}`;

    this._closeDropdown();
    this._render();
    this.emit('change', { value: this.value });
  }

  private _renderTimeOptions(): string {
    const hours = this.use24Hour
      ? Array.from({ length: 24 }, (_, i) => i)
      : Array.from({ length: 12 }, (_, i) => i + 1);

    const minutes = Array.from(
      { length: Math.ceil(60 / this.minuteStep) },
      (_, i) => i * this.minuteStep
    );

    return `
      <div class="time-column">
        <div class="time-label">Hour</div>
        <div class="time-scroll">
          ${hours.map(h => `
            <button
              class="time-option ${h === this.selectedHour ? 'selected' : ''}"
              data-type="hour"
              data-value="${h}"
            >
              ${String(h).padStart(2, '0')}
            </button>
          `).join('')}
        </div>
      </div>
      <div class="separator">:</div>
      <div class="time-column">
        <div class="time-label">Minute</div>
        <div class="time-scroll">
          ${minutes.map(m => `
            <button
              class="time-option ${m === this.selectedMinute ? 'selected' : ''}"
              data-type="minute"
              data-value="${m}"
            >
              ${String(m).padStart(2, '0')}
            </button>
          `).join('')}
        </div>
      </div>
      ${!this.use24Hour ? `
        <div class="time-column">
          <div class="time-label">Period</div>
          <div class="time-scroll">
            <button
              class="time-option ${this.selectedPeriod === 'AM' ? 'selected' : ''}"
              data-type="period"
              data-value="AM"
            >
              AM
            </button>
            <button
              class="time-option ${this.selectedPeriod === 'PM' ? 'selected' : ''}"
              data-type="period"
              data-value="PM"
            >
              PM
            </button>
          </div>
        </div>
      ` : ''}
    `;
  }

  protected _render() {
    this._shadow.innerHTML = `
      <style>${style}</style>
      <div class="timepicker-container" part="container">
        <div class="timepicker-input-wrapper">
          <input
            type="text"
            class="timepicker-input"
            part="input"
            value="${this.value}"
            placeholder="${this.placeholder}"
            readonly
            ${this.disabled ? 'disabled' : ''}
            aria-label="Time picker"
            aria-haspopup="dialog"
          />
          <svg class="timepicker-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        </div>
        <div class="timepicker-dropdown ${this.isOpen ? 'open' : ''}" part="dropdown" role="dialog" aria-label="Select time">
          <div class="time-selectors">
            ${this._renderTimeOptions()}
          </div>
          <div class="action-buttons">
            <button class="btn btn-secondary btn-cancel">Cancel</button>
            <button class="btn btn-primary btn-confirm">OK</button>
          </div>
        </div>
      </div>
    `;

    this._attachEventListeners();
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    switch (name) {
      case 'value':
        this.value = newValue || '';
        if (newValue) this._parseValue();
        break;
      case 'placeholder':
        this.placeholder = newValue || 'Select time';
        break;
      case 'use24Hour':
        this.use24Hour = newValue !== null;
        break;
      case 'minuteStep':
        this.minuteStep = parseInt(newValue) || 1;
        break;
      case 'disabled':
        this.disabled = newValue !== null;
        break;
    }
  }
}

customElements.define(TimePicker.is, TimePicker);
