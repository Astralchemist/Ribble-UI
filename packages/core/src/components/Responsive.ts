import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `:host { display: block; }
:host([hide-on-mobile]) { @media (max-width: 768px) { display: none; } }
:host([hide-on-tablet]) { @media (min-width: 769px) and (max-width: 1024px) { display: none; } }
:host([hide-on-desktop]) { @media (min-width: 1025px) { display: none; } }
:host([show-on-mobile]) { display: none; @media (max-width: 768px) { display: block; } }
:host([show-on-tablet]) { display: none; @media (min-width: 769px) and (max-width: 1024px) { display: block; } }
:host([show-on-desktop]) { display: none; @media (min-width: 1025px) { display: block; } }`;

export class Responsive extends UIComponent {
  static is = 'ui-responsive';
  @property({ type: Boolean, reflect: true }) hideOnMobile = false;
  @property({ type: Boolean, reflect: true }) hideOnTablet = false;
  @property({ type: Boolean, reflect: true }) hideOnDesktop = false;
  @property({ type: Boolean, reflect: true }) showOnMobile = false;
  @property({ type: Boolean, reflect: true }) showOnTablet = false;
  @property({ type: Boolean, reflect: true }) showOnDesktop = false;

  protected _render() {
    this._shadow.innerHTML = `<style>${style}</style><slot></slot>`;
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === 'hideOnMobile') this.hideOnMobile = newValue !== null;
    else if (name === 'hideOnTablet') this.hideOnTablet = newValue !== null;
    else if (name === 'hideOnDesktop') this.hideOnDesktop = newValue !== null;
    else if (name === 'showOnMobile') this.showOnMobile = newValue !== null;
    else if (name === 'showOnTablet') this.showOnTablet = newValue !== null;
    else if (name === 'showOnDesktop') this.showOnDesktop = newValue !== null;
  }
}

customElements.define(Responsive.is, Responsive);
