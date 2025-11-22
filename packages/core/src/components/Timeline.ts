import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `:host { display: block; }
.timeline { position: relative; padding: 1rem 0; }
.timeline::before { content: ''; position: absolute; left: 1rem; top: 0; bottom: 0; width: 2px; background: var(--color-border, #e2e8f0); }
.timeline-item { position: relative; padding-left: 3rem; margin-bottom: 2rem; }
.timeline-marker { position: absolute; left: 0.5rem; top: 0; width: 1rem; height: 1rem; border-radius: 50%; background: var(--color-primary, #3b82f6); border: 2px solid var(--color-surface, #fff); }
.timeline-content { padding: 1rem; background: var(--color-bg-secondary, #f8fafc); border-radius: var(--radius-md, 0.375rem); }
.timeline-title { font-weight: 600; margin-bottom: 0.5rem; }`;

export class Timeline extends UIComponent {
  static is = 'ui-timeline';
  @property({ type: String, reflect: true }) position: 'left' | 'right' | 'center' = 'left';

  protected _render() {
    this._shadow.innerHTML = `<style>${style}</style><div class="timeline" part="timeline"><slot></slot></div>`;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === 'position') this.position = (newValue as any) || 'left';
  }
}

customElements.define(Timeline.is, Timeline);
