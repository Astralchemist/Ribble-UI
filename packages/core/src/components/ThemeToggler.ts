import { UIComponent, property } from './UIComponent';

export class ThemeToggler extends UIComponent {
  static is = 'theme-toggler';

  @property({ type: String, reflect: true })
  theme: 'light' | 'dark' | 'auto' = 'auto';

  @property({ type: String, reflect: true })
  variant: 'switch' | 'button' | 'dropdown' = 'switch';

  @property({ type: String, reflect: true })
  size: 'sm' | 'md' | 'lg' = 'md';

  @property({ type: Boolean, reflect: true })
  animated = true;

  @property({ type: Boolean, reflect: true })
  showLabel = false;

  connectedCallback() {
    super.connectedCallback();
    this.initializeTheme();
    this.render();
    this.attachEventListeners();
  }

  private initializeTheme() {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'auto' | null;
    if (savedTheme) {
      this.theme = savedTheme;
    }
    this.applyTheme();
  }

  private applyTheme() {
    const root = document.documentElement;

    if (this.theme === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark', prefersDark);
      root.classList.toggle('light', !prefersDark);
    } else {
      root.classList.toggle('dark', this.theme === 'dark');
      root.classList.toggle('light', this.theme === 'light');
    }

    localStorage.setItem('theme', this.theme);
    this.dispatchEvent(new CustomEvent('theme-change', {
      detail: { theme: this.theme },
      bubbles: true,
      composed: true
    }));
  }

  private toggleTheme() {
    if (this.theme === 'light') {
      this.theme = 'dark';
    } else if (this.theme === 'dark') {
      this.theme = 'auto';
    } else {
      this.theme = 'light';
    }
    this.applyTheme();
    this.render();
  }

  private setTheme(newTheme: 'light' | 'dark' | 'auto') {
    this.theme = newTheme;
    this.applyTheme();
    this.render();
  }

  private attachEventListeners() {
    const shadowRoot = this.shadowRoot!;

    if (this.variant === 'switch') {
      const switchBtn = shadowRoot.querySelector('.theme-switch');
      switchBtn?.addEventListener('click', () => {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        this.applyTheme();
        this.render();
      });
    } else if (this.variant === 'button') {
      const buttons = shadowRoot.querySelectorAll('.theme-btn');
      buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const target = e.currentTarget as HTMLElement;
          const newTheme = target.dataset.theme as 'light' | 'dark' | 'auto';
          this.setTheme(newTheme);
        });
      });
    } else if (this.variant === 'dropdown') {
      const options = shadowRoot.querySelectorAll('.theme-option');
      options.forEach(opt => {
        opt.addEventListener('click', (e) => {
          const target = e.currentTarget as HTMLElement;
          const newTheme = target.dataset.theme as 'light' | 'dark' | 'auto';
          this.setTheme(newTheme);
        });
      });

      const toggle = shadowRoot.querySelector('.dropdown-toggle');
      const dropdown = shadowRoot.querySelector('.dropdown-menu');
      toggle?.addEventListener('click', () => {
        dropdown?.classList.toggle('open');
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (!this.contains(e.target as Node)) {
          dropdown?.classList.remove('open');
        }
      });
    }
  }

  render() {
    if (!this.shadowRoot) return;

    const sizeClasses = {
      sm: 'h-5 w-10',
      md: 'h-6 w-12',
      lg: 'h-8 w-16'
    };

    const iconSize = {
      sm: '12',
      md: '16',
      lg: '20'
    };

    const size = iconSize[this.size];

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .theme-toggler-container {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        /* Switch Variant */
        .theme-switch {
          position: relative;
          cursor: pointer;
          background: var(--switch-bg, #cbd5e1);
          border-radius: 9999px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: none;
          padding: 0;
        }

        .theme-switch.sm { height: 1.25rem; width: 2.5rem; }
        .theme-switch.md { height: 1.5rem; width: 3rem; }
        .theme-switch.lg { height: 2rem; width: 4rem; }

        .theme-switch.dark {
          background: var(--switch-bg-dark, #3b82f6);
        }

        .theme-switch-track {
          position: absolute;
          top: 0.125rem;
          left: 0.125rem;
          background: white;
          border-radius: 9999px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .theme-switch.sm .theme-switch-track {
          height: 1rem;
          width: 1rem;
        }

        .theme-switch.md .theme-switch-track {
          height: 1.25rem;
          width: 1.25rem;
        }

        .theme-switch.lg .theme-switch-track {
          height: 1.75rem;
          width: 1.75rem;
        }

        .theme-switch.dark .theme-switch-track {
          transform: translateX(1.5rem);
        }

        .theme-switch.md.dark .theme-switch-track {
          transform: translateX(1.5rem);
        }

        .theme-switch.lg.dark .theme-switch-track {
          transform: translateX(2rem);
        }

        .theme-switch:hover {
          opacity: 0.8;
        }

        .theme-switch:focus {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }

        /* Button Variant */
        .theme-buttons {
          display: flex;
          gap: 0.25rem;
          background: var(--bg-secondary, #f1f5f9);
          padding: 0.25rem;
          border-radius: 0.5rem;
        }

        .theme-btn {
          padding: 0.5rem 0.75rem;
          border: none;
          background: transparent;
          color: var(--text-secondary, #64748b);
          cursor: pointer;
          border-radius: 0.375rem;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 0.375rem;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .theme-btn:hover {
          background: var(--bg-hover, #e2e8f0);
        }

        .theme-btn.active {
          background: white;
          color: var(--text-primary, #1e293b);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        /* Dropdown Variant */
        .dropdown {
          position: relative;
        }

        .dropdown-toggle {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: var(--bg-secondary, #f1f5f9);
          border: 1px solid var(--border, #e2e8f0);
          border-radius: 0.5rem;
          cursor: pointer;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-primary, #1e293b);
          transition: all 0.2s;
        }

        .dropdown-toggle:hover {
          background: var(--bg-hover, #e2e8f0);
        }

        .dropdown-menu {
          position: absolute;
          top: calc(100% + 0.5rem);
          right: 0;
          background: white;
          border: 1px solid var(--border, #e2e8f0);
          border-radius: 0.5rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          padding: 0.5rem;
          min-width: 10rem;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-0.5rem);
          transition: all 0.2s;
          z-index: 50;
        }

        .dropdown-menu.open {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .theme-option {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.625rem 0.75rem;
          border-radius: 0.375rem;
          cursor: pointer;
          transition: all 0.2s;
          color: var(--text-primary, #1e293b);
          font-size: 0.875rem;
        }

        .theme-option:hover {
          background: var(--bg-hover, #f1f5f9);
        }

        .theme-option.active {
          background: var(--bg-active, #e0e7ff);
          color: var(--text-active, #4f46e5);
        }

        .label {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-secondary, #64748b);
        }

        /* Icons */
        svg {
          fill: currentColor;
        }

        /* Animations */
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .animated svg {
          animation: ${this.animated ? 'spin 20s linear infinite' : 'none'};
        }
      </style>

      ${this.renderContent()}
    `;

    // Reattach event listeners after render
    setTimeout(() => this.attachEventListeners(), 0);
  }

  private renderContent() {
    if (this.variant === 'switch') {
      return `
        <div class="theme-toggler-container">
          ${this.showLabel ? '<span class="label">Theme</span>' : ''}
          <button
            class="theme-switch ${this.size} ${this.theme === 'dark' ? 'dark' : ''}"
            role="switch"
            aria-checked="${this.theme === 'dark'}"
            aria-label="Toggle theme"
          >
            <span class="theme-switch-track">
              ${this.theme === 'dark' ? this.moonIcon() : this.sunIcon()}
            </span>
          </button>
        </div>
      `;
    } else if (this.variant === 'button') {
      return `
        <div class="theme-buttons">
          <button class="theme-btn ${this.theme === 'light' ? 'active' : ''}" data-theme="light">
            ${this.sunIcon()}
            ${this.showLabel ? '<span>Light</span>' : ''}
          </button>
          <button class="theme-btn ${this.theme === 'dark' ? 'active' : ''}" data-theme="dark">
            ${this.moonIcon()}
            ${this.showLabel ? '<span>Dark</span>' : ''}
          </button>
          <button class="theme-btn ${this.theme === 'auto' ? 'active' : ''}" data-theme="auto">
            ${this.autoIcon()}
            ${this.showLabel ? '<span>Auto</span>' : ''}
          </button>
        </div>
      `;
    } else {
      return `
        <div class="dropdown">
          <button class="dropdown-toggle">
            ${this.getCurrentIcon()}
            <span>${this.theme.charAt(0).toUpperCase() + this.theme.slice(1)}</span>
            ${this.chevronIcon()}
          </button>
          <div class="dropdown-menu">
            <div class="theme-option ${this.theme === 'light' ? 'active' : ''}" data-theme="light">
              ${this.sunIcon()}
              <span>Light</span>
            </div>
            <div class="theme-option ${this.theme === 'dark' ? 'active' : ''}" data-theme="dark">
              ${this.moonIcon()}
              <span>Dark</span>
            </div>
            <div class="theme-option ${this.theme === 'auto' ? 'active' : ''}" data-theme="auto">
              ${this.autoIcon()}
              <span>Auto</span>
            </div>
          </div>
        </div>
      `;
    }
  }

  private getCurrentIcon() {
    if (this.theme === 'light') return this.sunIcon();
    if (this.theme === 'dark') return this.moonIcon();
    return this.autoIcon();
  }

  private sunIcon() {
    return `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="5"/>
        <line x1="12" y1="1" x2="12" y2="3"/>
        <line x1="12" y1="21" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="1" y1="12" x2="3" y2="12"/>
        <line x1="21" y1="12" x2="23" y2="12"/>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
      </svg>
    `;
  }

  private moonIcon() {
    return `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
      </svg>
    `;
  }

  private autoIcon() {
    return `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    `;
  }

  private chevronIcon() {
    return `
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="6 9 12 15 18 9"/>
      </svg>
    `;
  }
}

customElements.define(ThemeToggler.is, ThemeToggler);
