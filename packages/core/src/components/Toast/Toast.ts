import { UIComponent } from '../base/UIComponent';

export type ToastType = 'info' | 'success' | 'warning' | 'error';
export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export interface ToastOptions {
  message: string;
  type?: ToastType;
  duration?: number;
  closable?: boolean;
  action?: {
    label: string;
    handler: () => void;
  };
}

/**
 * Toast notification component
 * @element ribble-toast
 *
 * @fires {CustomEvent} close - Emitted when toast is closed
 * @fires {CustomEvent} action - Emitted when action button is clicked
 */
export class Toast extends UIComponent {
  private timeout: number | null = null;

  static get observedAttributes() {
    return ['type', 'message', 'duration', 'closable'];
  }

  get type(): ToastType {
    return (this.getAttribute('type') as ToastType) || 'info';
  }

  set type(value: ToastType) {
    this.setAttribute('type', value);
  }

  get message(): string {
    return this.getAttribute('message') || '';
  }

  set message(value: string) {
    this.setAttribute('message', value);
  }

  get duration(): number {
    return parseInt(this.getAttribute('duration') || '5000');
  }

  set duration(value: number) {
    this.setAttribute('duration', value.toString());
  }

  get closable(): boolean {
    return this.hasAttribute('closable');
  }

  set closable(value: boolean) {
    if (value) {
      this.setAttribute('closable', '');
    } else {
      this.removeAttribute('closable');
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.render();
    this.setupEventListeners();
    this.startTimer();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.clearTimer();
  }

  private render() {
    const styles = `
      :host {
        --toast-bg: var(--color-surface, #ffffff);
        --toast-text: var(--color-text, #111827);
        --toast-border: var(--color-border, #e5e7eb);
        --toast-shadow: var(--shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1));
        display: block;
        margin-bottom: 0.5rem;
      }

      .toast {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 1rem;
        background: var(--toast-bg);
        border: 1px solid var(--toast-border);
        border-left-width: 4px;
        border-radius: var(--radius-md, 6px);
        box-shadow: var(--toast-shadow);
        min-width: 300px;
        max-width: 500px;
        animation: slideIn 0.3s ease-out;
      }

      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }

      :host([type="info"]) .toast {
        border-left-color: var(--color-info, #3b82f6);
      }

      :host([type="success"]) .toast {
        border-left-color: var(--color-success, #10b981);
      }

      :host([type="warning"]) .toast {
        border-left-color: var(--color-warning, #f59e0b);
      }

      :host([type="error"]) .toast {
        border-left-color: var(--color-error, #ef4444);
      }

      .icon {
        flex-shrink: 0;
        width: 20px;
        height: 20px;
      }

      :host([type="info"]) .icon {
        color: var(--color-info, #3b82f6);
      }

      :host([type="success"]) .icon {
        color: var(--color-success, #10b981);
      }

      :host([type="warning"]) .icon {
        color: var(--color-warning, #f59e0b);
      }

      :host([type="error"]) .icon {
        color: var(--color-error, #ef4444);
      }

      .content {
        flex: 1;
        color: var(--toast-text);
        font-size: 0.875rem;
      }

      .action-button {
        background: transparent;
        border: none;
        padding: 0.25rem 0.5rem;
        color: var(--color-primary, #3b82f6);
        font-weight: 500;
        cursor: pointer;
        border-radius: var(--radius-sm, 4px);
        transition: background-color 0.2s;
      }

      .action-button:hover {
        background: var(--color-primary-light, #dbeafe);
      }

      .close-button {
        background: transparent;
        border: none;
        padding: 0.25rem;
        cursor: pointer;
        color: var(--color-text-secondary, #6b7280);
        border-radius: var(--radius-sm, 4px);
        transition: background-color 0.2s, color 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .close-button:hover {
        background: var(--color-surface-hover, #f3f4f6);
        color: var(--toast-text);
      }

      :host(:not([closable])) .close-button {
        display: none;
      }

      @media (prefers-reduced-motion: reduce) {
        .toast {
          animation: none;
        }
      }
    `;

    const icon = this.getIcon();

    this.shadowRoot!.innerHTML = `
      <style>${styles}</style>
      <div class="toast" part="toast" role="alert" aria-live="polite">
        <div class="icon" part="icon">
          ${icon}
        </div>
        <div class="content" part="content">
          ${this.message}
          <slot></slot>
        </div>
        <slot name="action"></slot>
        <button class="close-button"
                part="close-button"
                aria-label="Close notification"
                type="button">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M4.646 4.646a.5.5 0 01.708 0L8 7.293l2.646-2.647a.5.5 0 01.708.708L8.707 8l2.647 2.646a.5.5 0 01-.708.708L8 8.707l-2.646 2.647a.5.5 0 01-.708-.708L7.293 8 4.646 5.354a.5.5 0 010-.708z"/>
          </svg>
        </button>
      </div>
    `;
  }

  private getIcon(): string {
    const icons = {
      info: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>`,
      success: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>`,
      warning: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
      </svg>`,
      error: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>`,
    };

    return icons[this.type];
  }

  private setupEventListeners() {
    const closeButton = this.shadowRoot!.querySelector('.close-button');
    closeButton?.addEventListener('click', () => {
      this.close();
    });
  }

  private startTimer() {
    if (this.duration > 0) {
      this.timeout = window.setTimeout(() => {
        this.close();
      }, this.duration);
    }
  }

  private clearTimer() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  /**
   * Close the toast
   */
  public close() {
    this.emit('close');
    this.remove();
  }

  /**
   * Pause auto-close timer
   */
  public pause() {
    this.clearTimer();
  }

  /**
   * Resume auto-close timer
   */
  public resume() {
    this.startTimer();
  }
}

/**
 * Toast container for managing multiple toasts
 * @element ribble-toast-container
 */
export class ToastContainer extends UIComponent {
  private toasts: Set<Toast> = new Set();

  static get observedAttributes() {
    return ['position', 'max-toasts'];
  }

  get position(): ToastPosition {
    return (this.getAttribute('position') as ToastPosition) || 'top-right';
  }

  set position(value: ToastPosition) {
    this.setAttribute('position', value);
  }

  get maxToasts(): number {
    return parseInt(this.getAttribute('max-toasts') || '5');
  }

  set maxToasts(value: number) {
    this.setAttribute('max-toasts', value.toString());
  }

  connectedCallback() {
    super.connectedCallback();
    this.render();
  }

  private render() {
    const styles = `
      :host {
        position: fixed;
        z-index: 9999;
        pointer-events: none;
      }

      :host([position="top-left"]) {
        top: 1rem;
        left: 1rem;
      }

      :host([position="top-center"]) {
        top: 1rem;
        left: 50%;
        transform: translateX(-50%);
      }

      :host([position="top-right"]) {
        top: 1rem;
        right: 1rem;
      }

      :host([position="bottom-left"]) {
        bottom: 1rem;
        left: 1rem;
      }

      :host([position="bottom-center"]) {
        bottom: 1rem;
        left: 50%;
        transform: translateX(-50%);
      }

      :host([position="bottom-right"]) {
        bottom: 1rem;
        right: 1rem;
      }

      .container {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        pointer-events: auto;
      }
    `;

    this.shadowRoot!.innerHTML = `
      <style>${styles}</style>
      <div class="container" part="container">
        <slot></slot>
      </div>
    `;
  }

  /**
   * Show a toast notification
   */
  public show(options: ToastOptions): Toast {
    const toast = document.createElement('ribble-toast') as Toast;
    toast.message = options.message;
    toast.type = options.type || 'info';
    toast.duration = options.duration !== undefined ? options.duration : 5000;
    toast.closable = options.closable !== false;

    if (options.action) {
      const actionButton = document.createElement('button');
      actionButton.slot = 'action';
      actionButton.className = 'action-button';
      actionButton.textContent = options.action.label;
      actionButton.onclick = () => {
        options.action!.handler();
        toast.close();
      };
      toast.appendChild(actionButton);
    }

    // Remove oldest toast if at max
    if (this.toasts.size >= this.maxToasts) {
      const oldest = Array.from(this.toasts)[0];
      oldest.close();
      this.toasts.delete(oldest);
    }

    this.appendChild(toast);
    this.toasts.add(toast);

    toast.addEventListener('close', () => {
      this.toasts.delete(toast);
    });

    return toast;
  }

  /**
   * Clear all toasts
   */
  public clearAll() {
    this.toasts.forEach((toast) => toast.close());
    this.toasts.clear();
  }
}

// Singleton instance for global toast notifications
let globalContainer: ToastContainer | null = null;

/**
 * Get or create global toast container
 */
export function getToastContainer(position?: ToastPosition): ToastContainer {
  if (!globalContainer) {
    globalContainer = document.createElement('ribble-toast-container') as ToastContainer;
    if (position) {
      globalContainer.position = position;
    }
    document.body.appendChild(globalContainer);
  }
  return globalContainer;
}

/**
 * Show a toast notification (convenience function)
 */
export function showToast(options: ToastOptions): Toast {
  const container = getToastContainer();
  return container.show(options);
}

// Register components
if (!customElements.get('ribble-toast')) {
  customElements.define('ribble-toast', Toast);
}

if (!customElements.get('ribble-toast-container')) {
  customElements.define('ribble-toast-container', ToastContainer);
}

export default Toast;
