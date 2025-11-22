import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `:host { display: inline-flex; align-items: center; gap: 0.5rem; }
.status-dot { width: 0.5rem; height: 0.5rem; border-radius: 50%; }
.status-dot.online { background: var(--color-success, #10b981); }
.status-dot.offline { background: var(--color-border, #9ca3af); }
.status-dot.busy { background: var(--color-error, #ef4444); }
.status-dot.away { background: var(--color-warning, #f59e0b); }
.status-dot.pulse { animation: pulse 2s infinite; }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
.status-label { font-size: 0.875rem; color: var(--color-text, #1e293b); }`;

export class StatusIndicator extends UIComponent {
  static is = 'ui-status-indicator';
  @property({ type: String, reflect: true }) status: 'online' | 'offline' | 'busy' | 'away' = 'offline';
  @property({ type: Boolean, reflect: true }) pulse = false;
  @property({ type: String, reflect: true }) label = '';

  protected _render() {
    this._shadow.innerHTML = `<style>${style}</style>
      <span class="status-dot ${this.status} ${this.pulse ? 'pulse' : ''}" part="dot"></span>
      ${this.label ? `<span class="status-label" part="label">${this.label}</span>` : ''}`;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === 'status') this.status = (newValue as any) || 'offline';
    else if (name === 'pulse') this.pulse = newValue !== null;
    else if (name === 'label') this.label = newValue || '';
  }
}

customElements.define(StatusIndicator.is, StatusIndicator);
