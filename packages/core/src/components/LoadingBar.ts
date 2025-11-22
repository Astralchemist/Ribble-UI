import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `:host { display: block; position: fixed; top: 0; left: 0; right: 0; height: 3px; z-index: 100; }
.loading-bar { height: 100%; background: var(--color-primary, #3b82f6); transition: width 0.3s ease; box-shadow: 0 0 10px var(--color-primary, #3b82f6); }`;

export class LoadingBar extends UIComponent {
  static is = 'ui-loading-bar';
  @property({ type: Number, reflect: true }) progress = 0;

  protected _render() {
    this._shadow.innerHTML = `<style>${style}</style>
      <div class="loading-bar" part="bar" style="width: ${this.progress}%;" role="progressbar" aria-valuenow="${this.progress}" aria-valuemin="0" aria-valuemax="100"></div>`;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === 'progress') this.progress = parseFloat(newValue) || 0;
  }
}

customElements.define(LoadingBar.is, LoadingBar);
