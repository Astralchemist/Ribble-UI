import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `
:host {
  display: inline-block;
  width: 100%;
  max-width: 20rem;
}

.datepicker-container {
  position: relative;
  width: 100%;
}

.datepicker-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.datepicker-input {
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

.datepicker-input:hover {
  border-color: var(--color-primary, #3b82f6);
}

.datepicker-input:focus {
  outline: none;
  border-color: var(--color-primary, #3b82f6);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.datepicker-icon {
  position: absolute;
  right: 0.75rem;
  pointer-events: none;
  color: var(--color-text-secondary, #64748b);
}

.datepicker-calendar {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  z-index: 50;
  background: var(--color-surface, #fff);
  border: 1px solid var(--color-border, #e2e8f0);
  border-radius: var(--radius-md, 0.375rem);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  min-width: 18rem;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-0.5rem);
  transition: all 0.2s ease;
}

.datepicker-calendar.open {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.calendar-nav-btn {
  padding: 0.25rem;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: var(--radius-sm, 0.25rem);
  color: var(--color-text, #1e293b);
  transition: all 0.2s ease;
}

.calendar-nav-btn:hover {
  background: var(--color-bg-secondary, #f1f5f9);
}

.calendar-month-year {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text, #1e293b);
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.25rem;
}

.calendar-day-header {
  padding: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text-secondary, #64748b);
  text-align: center;
}

.calendar-day {
  padding: 0.5rem;
  font-size: 0.875rem;
  text-align: center;
  border-radius: var(--radius-sm, 0.25rem);
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  background: transparent;
  color: var(--color-text, #1e293b);
}

.calendar-day:hover:not(:disabled):not(.selected) {
  background: var(--color-bg-secondary, #f1f5f9);
}

.calendar-day.selected {
  background: var(--color-primary, #3b82f6);
  color: white;
}

.calendar-day.today {
  border: 1px solid var(--color-primary, #3b82f6);
}

.calendar-day.other-month {
  color: var(--color-text-disabled, #cbd5e1);
}

.calendar-day:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

:host([disabled]) {
  opacity: 0.6;
  pointer-events: none;
}
`;

export class DatePicker extends UIComponent {
  static is = 'ui-date-picker';

  @property({ type: String, reflect: true })
  value = '';

  @property({ type: String, reflect: true })
  placeholder = 'Select date';

  @property({ type: String, reflect: true })
  format = 'YYYY-MM-DD';

  @property({ type: String, reflect: true })
  min = '';

  @property({ type: String, reflect: true })
  max = '';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  private currentDate = new Date();
  private selectedDate: Date | null = null;
  private isOpen = false;

  constructor() {
    super();
    this.setAttribute('role', 'group');
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.value) {
      this.selectedDate = new Date(this.value);
      this.currentDate = new Date(this.value);
    }
    this._attachEventListeners();
  }

  private _attachEventListeners() {
    const input = this._shadow.querySelector('.datepicker-input') as HTMLInputElement;
    if (input) {
      input.addEventListener('click', () => this._toggleCalendar());
    }

    const prevBtn = this._shadow.querySelector('.calendar-prev') as HTMLButtonElement;
    const nextBtn = this._shadow.querySelector('.calendar-next') as HTMLButtonElement;

    if (prevBtn) prevBtn.addEventListener('click', () => this._changeMonth(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => this._changeMonth(1));

    const dayButtons = this._shadow.querySelectorAll('.calendar-day');
    dayButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const day = (e.target as HTMLElement).getAttribute('data-date');
        if (day) {
          this._selectDate(new Date(day));
        }
      });
    });

    document.addEventListener('click', (e) => {
      if (!this.contains(e.target as Node)) {
        this._closeCalendar();
      }
    });
  }

  private _toggleCalendar() {
    this.isOpen = !this.isOpen;
    const calendar = this._shadow.querySelector('.datepicker-calendar');
    calendar?.classList.toggle('open', this.isOpen);
  }

  private _closeCalendar() {
    this.isOpen = false;
    const calendar = this._shadow.querySelector('.datepicker-calendar');
    calendar?.classList.remove('open');
  }

  private _changeMonth(delta: number) {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + delta,
      1
    );
    this._render();
    this._attachEventListeners();
  }

  private _selectDate(date: Date) {
    this.selectedDate = date;
    this.value = this._formatDate(date);
    this._closeCalendar();
    this._render();
    this.emit('change', { value: this.value, date });
  }

  private _formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private _getDaysInMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate();
  }

  private _getFirstDayOfMonth(year: number, month: number): number {
    return new Date(year, month, 1).getDay();
  }

  private _renderCalendar(): string {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const daysInMonth = this._getDaysInMonth(year, month);
    const firstDay = this._getFirstDayOfMonth(year, month);
    const today = new Date();

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];

    let daysHTML = '';
    const dayHeaders = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    dayHeaders.forEach(day => {
      daysHTML += `<div class="calendar-day-header">${day}</div>`;
    });

    // Previous month days
    const prevMonthDays = this._getDaysInMonth(year, month - 1);
    for (let i = firstDay - 1; i >= 0; i--) {
      const day = prevMonthDays - i;
      const date = new Date(year, month - 1, day);
      daysHTML += `
        <button class="calendar-day other-month" data-date="${this._formatDate(date)}">
          ${day}
        </button>
      `;
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isSelected = this.selectedDate &&
        this._formatDate(date) === this._formatDate(this.selectedDate);
      const isToday = this._formatDate(date) === this._formatDate(today);

      daysHTML += `
        <button
          class="calendar-day ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}"
          data-date="${this._formatDate(date)}"
        >
          ${day}
        </button>
      `;
    }

    return `
      <div class="calendar-header">
        <button class="calendar-nav-btn calendar-prev" aria-label="Previous month">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <div class="calendar-month-year">${monthNames[month]} ${year}</div>
        <button class="calendar-nav-btn calendar-next" aria-label="Next month">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
      <div class="calendar-grid" role="grid">
        ${daysHTML}
      </div>
    `;
  }

  protected _render() {
    const displayValue = this.selectedDate ? this._formatDate(this.selectedDate) : '';

    this._shadow.innerHTML = `
      <style>${style}</style>
      <div class="datepicker-container" part="container">
        <div class="datepicker-input-wrapper">
          <input
            type="text"
            class="datepicker-input"
            part="input"
            value="${displayValue}"
            placeholder="${this.placeholder}"
            readonly
            ${this.disabled ? 'disabled' : ''}
            aria-label="Date picker"
            aria-haspopup="dialog"
          />
          <svg class="datepicker-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        </div>
        <div class="datepicker-calendar ${this.isOpen ? 'open' : ''}" part="calendar" role="dialog" aria-label="Choose date">
          ${this._renderCalendar()}
        </div>
      </div>
    `;

    this._attachEventListeners();
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    switch (name) {
      case 'value':
        this.value = newValue || '';
        if (newValue) {
          this.selectedDate = new Date(newValue);
          this.currentDate = new Date(newValue);
        }
        break;
      case 'placeholder':
        this.placeholder = newValue || 'Select date';
        break;
      case 'disabled':
        this.disabled = newValue !== null;
        break;
    }
  }
}

customElements.define(DatePicker.is, DatePicker);
