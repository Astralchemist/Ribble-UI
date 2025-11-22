import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `
:host {
  display: block;
  width: 100%;
}

.file-upload-container {
  width: 100%;
}

.upload-zone {
  border: 2px dashed var(--color-border, #e2e8f0);
  border-radius: var(--radius-md, 0.375rem);
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background: var(--color-surface, #fff);
}

.upload-zone:hover {
  border-color: var(--color-primary, #3b82f6);
  background: var(--color-bg-secondary, #f8fafc);
}

.upload-zone.drag-over {
  border-color: var(--color-primary, #3b82f6);
  background: rgba(59, 130, 246, 0.05);
}

.upload-icon {
  color: var(--color-text-secondary, #64748b);
  margin-bottom: 1rem;
}

.upload-text {
  font-size: 0.875rem;
  color: var(--color-text, #1e293b);
  margin-bottom: 0.5rem;
}

.upload-hint {
  font-size: 0.75rem;
  color: var(--color-text-secondary, #64748b);
}

.file-input {
  display: none;
}

.file-list {
  margin-top: 1rem;
}

.file-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  background: var(--color-bg-secondary, #f8fafc);
  border-radius: var(--radius-md, 0.375rem);
  margin-bottom: 0.5rem;
}

.file-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
}

.file-icon {
  color: var(--color-primary, #3b82f6);
}

.file-details {
  flex: 1;
}

.file-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text, #1e293b);
  margin-bottom: 0.25rem;
}

.file-size {
  font-size: 0.75rem;
  color: var(--color-text-secondary, #64748b);
}

.file-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-remove {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  border: none;
  background: var(--color-error, #ef4444);
  color: white;
  border-radius: var(--radius-sm, 0.25rem);
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-remove:hover {
  background: var(--color-error-dark, #dc2626);
}

.progress-bar {
  width: 100%;
  height: 4px;
  background: var(--color-border, #e2e8f0);
  border-radius: 2px;
  overflow: hidden;
  margin-top: 0.5rem;
}

.progress-fill {
  height: 100%;
  background: var(--color-primary, #3b82f6);
  transition: width 0.3s ease;
}

:host([disabled]) {
  opacity: 0.6;
  pointer-events: none;
}
`;

export class FileUpload extends UIComponent {
  static is = 'ui-file-upload';

  @property({ type: String, reflect: true })
  accept = '';

  @property({ type: Boolean, reflect: true })
  multiple = false;

  @property({ type: Number, reflect: true })
  maxSize = 10485760; // 10MB default

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String, reflect: true })
  label = 'Click to upload or drag and drop';

  @property({ type: String, reflect: true })
  hint = '';

  private files: File[] = [];

  constructor() {
    super();
    this.setAttribute('role', 'group');
  }

  connectedCallback() {
    super.connectedCallback();
    this._attachEventListeners();
  }

  private _attachEventListeners() {
    const zone = this._shadow.querySelector('.upload-zone') as HTMLElement;
    const input = this._shadow.querySelector('.file-input') as HTMLInputElement;

    if (zone && input) {
      zone.addEventListener('click', () => input.click());
      zone.addEventListener('dragover', this._handleDragOver.bind(this));
      zone.addEventListener('dragleave', this._handleDragLeave.bind(this));
      zone.addEventListener('drop', this._handleDrop.bind(this));

      input.addEventListener('change', (e) => {
        const files = (e.target as HTMLInputElement).files;
        if (files) {
          this._handleFiles(Array.from(files));
        }
      });
    }

    const removeButtons = this._shadow.querySelectorAll('.btn-remove');
    removeButtons.forEach((btn, index) => {
      btn.addEventListener('click', () => this._removeFile(index));
    });
  }

  private _handleDragOver(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    const zone = this._shadow.querySelector('.upload-zone');
    zone?.classList.add('drag-over');
  }

  private _handleDragLeave(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    const zone = this._shadow.querySelector('.upload-zone');
    zone?.classList.remove('drag-over');
  }

  private _handleDrop(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    const zone = this._shadow.querySelector('.upload-zone');
    zone?.classList.remove('drag-over');

    const files = e.dataTransfer?.files;
    if (files) {
      this._handleFiles(Array.from(files));
    }
  }

  private _handleFiles(newFiles: File[]) {
    const validFiles = newFiles.filter(file => this._validateFile(file));

    if (!this.multiple) {
      this.files = validFiles.slice(0, 1);
    } else {
      this.files = [...this.files, ...validFiles];
    }

    this._render();
    this._attachEventListeners();
    this.emit('change', { files: this.files });
  }

  private _validateFile(file: File): boolean {
    // Check file size
    if (file.size > this.maxSize) {
      this.emit('error', {
        file,
        message: `File size exceeds ${this._formatFileSize(this.maxSize)}`
      });
      return false;
    }

    // Check file type
    if (this.accept) {
      const acceptedTypes = this.accept.split(',').map(t => t.trim());
      const fileExt = '.' + file.name.split('.').pop();
      const fileType = file.type;

      const isValid = acceptedTypes.some(type => {
        if (type.startsWith('.')) {
          return fileExt === type;
        }
        return fileType.match(new RegExp(type.replace('*', '.*')));
      });

      if (!isValid) {
        this.emit('error', {
          file,
          message: 'File type not accepted'
        });
        return false;
      }
    }

    return true;
  }

  private _removeFile(index: number) {
    this.files.splice(index, 1);
    this._render();
    this._attachEventListeners();
    this.emit('change', { files: this.files });
  }

  private _formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }

  protected _render() {
    const defaultHint = this.hint || (this.accept
      ? `Accepted formats: ${this.accept}`
      : `Max file size: ${this._formatFileSize(this.maxSize)}`);

    this._shadow.innerHTML = `
      <style>${style}</style>
      <div class="file-upload-container" part="container">
        <div class="upload-zone" part="zone" role="button" tabindex="0" aria-label="Upload files">
          <svg class="upload-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
          <div class="upload-text">${this.label}</div>
          <div class="upload-hint">${defaultHint}</div>
        </div>
        <input
          type="file"
          class="file-input"
          ${this.multiple ? 'multiple' : ''}
          ${this.accept ? `accept="${this.accept}"` : ''}
          ${this.disabled ? 'disabled' : ''}
          aria-label="File input"
        />
        ${this.files.length > 0 ? `
          <div class="file-list" part="list">
            ${this.files.map((file, index) => `
              <div class="file-item" part="item">
                <div class="file-info">
                  <svg class="file-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                    <polyline points="13 2 13 9 20 9"></polyline>
                  </svg>
                  <div class="file-details">
                    <div class="file-name">${file.name}</div>
                    <div class="file-size">${this._formatFileSize(file.size)}</div>
                  </div>
                </div>
                <div class="file-actions">
                  <button class="btn-remove" aria-label="Remove ${file.name}">Remove</button>
                </div>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    `;

    this._attachEventListeners();
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    switch (name) {
      case 'accept':
        this.accept = newValue || '';
        break;
      case 'multiple':
        this.multiple = newValue !== null;
        break;
      case 'maxSize':
        this.maxSize = parseInt(newValue) || 10485760;
        break;
      case 'disabled':
        this.disabled = newValue !== null;
        break;
      case 'label':
        this.label = newValue || 'Click to upload or drag and drop';
        break;
      case 'hint':
        this.hint = newValue || '';
        break;
    }
  }

  // Public API
  public getFiles(): File[] {
    return this.files;
  }

  public clear() {
    this.files = [];
    this._render();
    this._attachEventListeners();
  }
}

customElements.define(FileUpload.is, FileUpload);
