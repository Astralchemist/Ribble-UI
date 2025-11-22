import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `:host { display: block; }
.audio-player { padding: 1rem; background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: var(--radius-md, 0.375rem); }
audio { width: 100%; }
.audio-info { margin-bottom: 0.5rem; }
.audio-title { font-weight: 600; margin-bottom: 0.25rem; }
.audio-artist { font-size: 0.875rem; color: var(--color-text-secondary, #64748b); }`;

export class Audio extends UIComponent {
  static is = 'ui-audio';
  @property({ type: String, reflect: true }) src = '';
  @property({ type: String, reflect: true }) title = '';
  @property({ type: String, reflect: true }) artist = '';
  @property({ type: Boolean, reflect: true }) controls = true;

  protected _render() {
    this._shadow.innerHTML = `<style>${style}</style>
      <div class="audio-player" part="player">
        ${this.title || this.artist ? `
          <div class="audio-info" part="info">
            ${this.title ? `<div class="audio-title" part="title">${this.title}</div>` : ''}
            ${this.artist ? `<div class="audio-artist" part="artist">${this.artist}</div>` : ''}
          </div>
        ` : ''}
        <audio src="${this.src}" ${this.controls ? 'controls' : ''} part="audio"></audio>
      </div>`;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === 'src') this.src = newValue || '';
    else if (name === 'title') this.title = newValue || '';
    else if (name === 'artist') this.artist = newValue || '';
    else if (name === 'controls') this.controls = newValue !== null;
  }
}

customElements.define(Audio.is, Audio);
