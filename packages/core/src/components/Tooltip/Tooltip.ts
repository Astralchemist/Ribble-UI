import { UIComponent } from '../base/UIComponent';

export type TooltipPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';

export type TooltipTrigger = 'hover' | 'click' | 'focus' | 'manual';

/**
 * Tooltip component
 * @element ribble-tooltip
 *
 * @fires {CustomEvent} show - Emitted when tooltip shows
 * @fires {CustomEvent} hide - Emitted when tooltip hides
 *
 * @prop {string} content - Tooltip content text
 * @prop {TooltipPlacement} placement - Tooltip placement
 * @prop {TooltipTrigger} trigger - How to trigger tooltip
 * @prop {number} delay - Delay before showing (ms)
 * @prop {boolean} open - Manual control of tooltip visibility
 *
 * @example
 * <ribble-tooltip content="This is a tooltip" placement="top">
 *   <button>Hover me</button>
 * </ribble-tooltip>
 */
export class Tooltip extends UIComponent {
  private tooltipElement!: HTMLElement;
  private triggerElement!: HTMLElement;
  private showTimeout: number | null = null;
  private hideTimeout: number | null = null;

  static get observedAttributes() {
    return ['content', 'placement', 'trigger', 'delay', 'open'];
  }

  get content(): string {
    return this.getAttribute('content') || '';
  }

  set content(value: string) {
    this.setAttribute('content', value);
  }

  get placement(): TooltipPlacement {
    return (this.getAttribute('placement') as TooltipPlacement) || 'top';
  }

  set placement(value: TooltipPlacement) {
    this.setAttribute('placement', value);
  }

  get trigger(): TooltipTrigger {
    return (this.getAttribute('trigger') as TooltipTrigger) || 'hover';
  }

  set trigger(value: TooltipTrigger) {
    this.setAttribute('trigger', value);
  }

  get delay(): number {
    return parseInt(this.getAttribute('delay') || '200');
  }

  set delay(value: number) {
    this.setAttribute('delay', value.toString());
  }

  get open(): boolean {
    return this.hasAttribute('open');
  }

  set open(value: boolean) {
    if (value) {
      this.setAttribute('open', '');
    } else {
      this.removeAttribute('open');
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.render();
    this.setupEventListeners();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.clearTimeouts();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;

    switch (name) {
      case 'content':
        this.updateContent();
        break;
      case 'placement':
        this.updatePlacement();
        break;
      case 'open':
        if (newValue !== null) {
          this.show();
        } else {
          this.hide();
        }
        break;
    }
  }

  private render() {
    const styles = `
      :host {
        --tooltip-bg: var(--color-surface-inverse, #1f2937);
        --tooltip-text: var(--color-text-inverse, #ffffff);
        --tooltip-shadow: var(--shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1));
        --tooltip-radius: var(--radius-sm, 4px);
        --arrow-size: 6px;
        position: relative;
        display: inline-block;
      }

      .trigger {
        display: inline-block;
      }

      .tooltip {
        position: absolute;
        background: var(--tooltip-bg);
        color: var(--tooltip-text);
        padding: 0.5rem 0.75rem;
        border-radius: var(--tooltip-radius);
        box-shadow: var(--tooltip-shadow);
        font-size: 0.875rem;
        line-height: 1.25rem;
        white-space: nowrap;
        z-index: 1000;
        pointer-events: none;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.2s, visibility 0.2s;
      }

      :host([open]) .tooltip {
        opacity: 1;
        visibility: visible;
      }

      .arrow {
        position: absolute;
        width: 0;
        height: 0;
        border: var(--arrow-size) solid transparent;
      }

      /* Top placements */
      .tooltip.top,
      .tooltip.top-start,
      .tooltip.top-end {
        bottom: calc(100% + var(--arrow-size) + 4px);
      }

      .tooltip.top .arrow,
      .tooltip.top-start .arrow,
      .tooltip.top-end .arrow {
        top: 100%;
        border-top-color: var(--tooltip-bg);
        border-bottom: none;
      }

      .tooltip.top {
        left: 50%;
        transform: translateX(-50%);
      }

      .tooltip.top .arrow {
        left: 50%;
        transform: translateX(-50%);
      }

      .tooltip.top-start {
        left: 0;
      }

      .tooltip.top-start .arrow {
        left: 1rem;
      }

      .tooltip.top-end {
        right: 0;
      }

      .tooltip.top-end .arrow {
        right: 1rem;
      }

      /* Bottom placements */
      .tooltip.bottom,
      .tooltip.bottom-start,
      .tooltip.bottom-end {
        top: calc(100% + var(--arrow-size) + 4px);
      }

      .tooltip.bottom .arrow,
      .tooltip.bottom-start .arrow,
      .tooltip.bottom-end .arrow {
        bottom: 100%;
        border-bottom-color: var(--tooltip-bg);
        border-top: none;
      }

      .tooltip.bottom {
        left: 50%;
        transform: translateX(-50%);
      }

      .tooltip.bottom .arrow {
        left: 50%;
        transform: translateX(-50%);
      }

      .tooltip.bottom-start {
        left: 0;
      }

      .tooltip.bottom-start .arrow {
        left: 1rem;
      }

      .tooltip.bottom-end {
        right: 0;
      }

      .tooltip.bottom-end .arrow {
        right: 1rem;
      }

      /* Left placements */
      .tooltip.left,
      .tooltip.left-start,
      .tooltip.left-end {
        right: calc(100% + var(--arrow-size) + 4px);
      }

      .tooltip.left .arrow,
      .tooltip.left-start .arrow,
      .tooltip.left-end .arrow {
        left: 100%;
        border-left-color: var(--tooltip-bg);
        border-right: none;
      }

      .tooltip.left {
        top: 50%;
        transform: translateY(-50%);
      }

      .tooltip.left .arrow {
        top: 50%;
        transform: translateY(-50%);
      }

      .tooltip.left-start {
        top: 0;
      }

      .tooltip.left-start .arrow {
        top: 0.75rem;
      }

      .tooltip.left-end {
        bottom: 0;
      }

      .tooltip.left-end .arrow {
        bottom: 0.75rem;
      }

      /* Right placements */
      .tooltip.right,
      .tooltip.right-start,
      .tooltip.right-end {
        left: calc(100% + var(--arrow-size) + 4px);
      }

      .tooltip.right .arrow,
      .tooltip.right-start .arrow,
      .tooltip.right-end .arrow {
        right: 100%;
        border-right-color: var(--tooltip-bg);
        border-left: none;
      }

      .tooltip.right {
        top: 50%;
        transform: translateY(-50%);
      }

      .tooltip.right .arrow {
        top: 50%;
        transform: translateY(-50%);
      }

      .tooltip.right-start {
        top: 0;
      }

      .tooltip.right-start .arrow {
        top: 0.75rem;
      }

      .tooltip.right-end {
        bottom: 0;
      }

      .tooltip.right-end .arrow {
        bottom: 0.75rem;
      }

      @media (prefers-reduced-motion: reduce) {
        .tooltip {
          transition: none;
        }
      }
    `;

    this.shadowRoot!.innerHTML = `
      <style>${styles}</style>
      <div class="trigger" part="trigger">
        <slot></slot>
      </div>
      <div class="tooltip ${this.placement}"
           part="tooltip"
           role="tooltip"
           aria-hidden="${!this.open}">
        <div class="arrow" part="arrow"></div>
        <span class="tooltip-content" part="content">${this.content}</span>
      </div>
    `;

    this.tooltipElement = this.shadowRoot!.querySelector('.tooltip')!;
    this.triggerElement = this.shadowRoot!.querySelector('.trigger')!;
  }

  private updateContent() {
    const contentEl = this.shadowRoot!.querySelector('.tooltip-content');
    if (contentEl) {
      contentEl.textContent = this.content;
    }
  }

  private updatePlacement() {
    if (this.tooltipElement) {
      this.tooltipElement.className = `tooltip ${this.placement}`;
    }
  }

  private setupEventListeners() {
    if (this.trigger === 'hover') {
      this.triggerElement.addEventListener('mouseenter', () => this.scheduleShow());
      this.triggerElement.addEventListener('mouseleave', () => this.scheduleHide());
    } else if (this.trigger === 'click') {
      this.triggerElement.addEventListener('click', () => this.toggle());
    } else if (this.trigger === 'focus') {
      this.triggerElement.addEventListener('focus', () => this.scheduleShow());
      this.triggerElement.addEventListener('blur', () => this.scheduleHide());
    }
  }

  private scheduleShow() {
    this.clearTimeouts();
    this.showTimeout = window.setTimeout(() => {
      this.show();
    }, this.delay);
  }

  private scheduleHide() {
    this.clearTimeouts();
    this.hideTimeout = window.setTimeout(() => {
      this.hide();
    }, 100);
  }

  private clearTimeouts() {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
      this.showTimeout = null;
    }
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
  }

  /**
   * Show the tooltip
   */
  public show() {
    this.open = true;
    this.emit('show');
  }

  /**
   * Hide the tooltip
   */
  public hide() {
    this.open = false;
    this.emit('hide');
  }

  /**
   * Toggle tooltip visibility
   */
  public toggle() {
    if (this.open) {
      this.hide();
    } else {
      this.show();
    }
  }
}

// Register component
if (!customElements.get('ribble-tooltip')) {
  customElements.define('ribble-tooltip', Tooltip);
}

export default Tooltip;
