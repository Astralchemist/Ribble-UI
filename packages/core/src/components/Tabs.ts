import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `
:host {
  display: block;
  --tabs-border-color: var(--color-border, #e0e0e0);
  --tabs-active-color: var(--color-primary, #007bff);
  --tabs-text-color: var(--color-text, #1a1a1a);
  --tabs-text-muted: var(--color-text-muted, #6b7280);
}

.tabs {
  width: 100%;
}

.tabs-header {
  display: flex;
  border-bottom: 2px solid var(--tabs-border-color);
  gap: var(--spacing-1, 0.25rem);
}

.tab-button {
  background: none;
  border: none;
  padding: var(--spacing-3, 0.75rem) var(--spacing-4, 1rem);
  cursor: pointer;
  font-size: var(--font-size-base, 1rem);
  color: var(--tabs-text-muted);
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
  transition: all 0.2s ease;
  position: relative;
  font-weight: var(--font-weight-medium, 500);
}

.tab-button:hover {
  color: var(--tabs-text-color);
}

.tab-button.active {
  color: var(--tabs-active-color);
  border-bottom-color: var(--tabs-active-color);
}

.tab-button:focus {
  outline: 2px solid var(--tabs-active-color);
  outline-offset: -2px;
}

.tabs-content {
  padding: var(--spacing-4, 1rem);
}

.tab-panel {
  display: none;
}

.tab-panel.active {
  display: block;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`;

export class Tabs extends UIComponent {
  static is = 'ui-tabs';

  @property({ type: Number, reflect: true })
  activeTab = 0;

  @property({ type: Array })
  tabs: { label: string; content?: string }[] = [];

  constructor() {
    super({
      shadow: { mode: 'open' },
      aria: { role: 'tablist' }
    });
  }

  protected _render() {
    this._shadow.innerHTML = `
      <style>${style}</style>
      <div class="tabs" part="tabs">
        <div class="tabs-header" role="tablist" part="header">
          ${this.tabs.map((tab, index) => `
            <button
              class="tab-button ${index === this.activeTab ? 'active' : ''}"
              role="tab"
              aria-selected="${index === this.activeTab}"
              aria-controls="panel-${index}"
              id="tab-${index}"
              data-index="${index}"
              part="tab"
            >
              ${tab.label}
            </button>
          `).join('')}
        </div>
        <div class="tabs-content" part="content">
          ${this.tabs.map((tab, index) => `
            <div
              class="tab-panel ${index === this.activeTab ? 'active' : ''}"
              role="tabpanel"
              aria-labelledby="tab-${index}"
              id="panel-${index}"
              part="panel"
            >
              ${tab.content || `<slot name="tab-${index}"></slot>`}
            </div>
          `).join('')}
        </div>
      </div>
    `;

    this._attachEvents();
  }

  protected _attachEvents() {
    const buttons = this._shadow.querySelectorAll('.tab-button');
    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt((e.target as HTMLElement).dataset.index || '0');
        this.activeTab = index;
        this._render();
        this.emit('change', { index });
      });
    });
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === 'active-tab') {
      this.activeTab = parseInt(newValue) || 0;
    }
  }
}

customElements.define(Tabs.is, Tabs);
