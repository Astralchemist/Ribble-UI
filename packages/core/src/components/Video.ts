import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `:host { display: block; }
.video-wrapper { position: relative; border-radius: var(--radius-md, 0.375rem); overflow: hidden; background: #000; }
video { width: 100%; height: 100%; display: block; }
.video-controls { position: absolute; bottom: 0; left: 0; right: 0; padding: 1rem; background: linear-gradient(transparent, rgba(0,0,0,0.7)); display: flex; align-items: center; gap: 0.5rem; }
.control-btn { background: none; border: none; color: white; cursor: pointer; padding: 0.5rem; }`;

export class Video extends UIComponent {
  static is = 'ui-video';
  @property({ type: String, reflect: true }) src = '';
  @property({ type: Boolean, reflect: true }) controls = true;
  @property({ type: Boolean, reflect: true }) autoplay = false;
  @property({ type: Boolean, reflect: true }) loop = false;
  @property({ type: Boolean, reflect: true }) muted = false;

  protected _render() {
    this._shadow.innerHTML = `<style>${style}</style>
      <div class="video-wrapper" part="wrapper">
        <video src="${this.src}" ${this.controls ? 'controls' : ''} ${this.autoplay ? 'autoplay' : ''} 
          ${this.loop ? 'loop' : ''} ${this.muted ? 'muted' : ''} part="video"></video>
      </div>`;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === 'src') this.src = newValue || '';
    else if (name === 'controls') this.controls = newValue !== null;
    else if (name === 'autoplay') this.autoplay = newValue !== null;
    else if (name === 'loop') this.loop = newValue !== null;
    else if (name === 'muted') this.muted = newValue !== null;
  }
}

customElements.define(Video.is, Video);
