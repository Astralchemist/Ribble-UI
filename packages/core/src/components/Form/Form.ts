import { UIComponent } from '../base/UIComponent';

export interface FormField {
  name: string;
  value: any;
  valid: boolean;
  error?: string;
  element: HTMLElement;
}

export interface FormValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: RegExp;
  email?: boolean;
  url?: boolean;
  custom?: (value: any) => boolean | string;
}

export interface FormSchema {
  [fieldName: string]: FormValidationRule;
}

/**
 * Form component with built-in validation
 * @element ribble-form
 *
 * @fires {CustomEvent} submit - Emitted when form is submitted with valid data
 * @fires {CustomEvent} change - Emitted when any field value changes
 * @fires {CustomEvent} invalid - Emitted when form validation fails
 *
 * @prop {boolean} novalidate - Disable HTML5 validation
 * @prop {string} schema - JSON string of validation schema
 *
 * @example
 * <ribble-form>
 *   <ribble-input name="email" label="Email" required></ribble-input>
 *   <ribble-button type="submit">Submit</ribble-button>
 * </ribble-form>
 */
export class Form extends UIComponent {
  private fields: Map<string, FormField> = new Map();
  private validationSchema: FormSchema = {};
  private formElement!: HTMLFormElement;

  static get observedAttributes() {
    return ['novalidate', 'schema'];
  }

  get novalidate(): boolean {
    return this.hasAttribute('novalidate');
  }

  set novalidate(value: boolean) {
    if (value) {
      this.setAttribute('novalidate', '');
    } else {
      this.removeAttribute('novalidate');
    }
  }

  get schema(): string {
    return this.getAttribute('schema') || '{}';
  }

  set schema(value: string) {
    this.setAttribute('schema', value);
    try {
      this.validationSchema = JSON.parse(value);
    } catch (e) {
      console.error('Invalid schema JSON:', e);
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.render();
    this.setupFormListeners();
    this.discoverFields();
  }

  private render() {
    this.shadowRoot!.innerHTML = `
      <style>
        :host {
          display: block;
        }

        form {
          width: 100%;
        }

        .form-errors {
          margin-bottom: 1rem;
          padding: 1rem;
          background-color: var(--color-error-light, #fee);
          border: 1px solid var(--color-error, #c00);
          border-radius: var(--radius-md, 4px);
          color: var(--color-error-dark, #900);
        }

        .form-errors ul {
          margin: 0;
          padding-left: 1.5rem;
        }

        .hidden {
          display: none;
        }
      </style>
      <form part="form" novalidate="${this.novalidate}">
        <div class="form-errors hidden" part="errors" role="alert" aria-live="polite">
          <ul></ul>
        </div>
        <slot></slot>
      </form>
    `;

    this.formElement = this.shadowRoot!.querySelector('form')!;
  }

  private setupFormListeners() {
    // Handle form submission
    this.formElement.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });

    // Listen for changes in slotted form fields
    const slot = this.shadowRoot!.querySelector('slot');
    slot?.addEventListener('slotchange', () => {
      this.discoverFields();
    });
  }

  private discoverFields() {
    this.fields.clear();

    // Find all form field elements
    const fieldElements = this.querySelectorAll('[name]');

    fieldElements.forEach((element) => {
      const name = element.getAttribute('name');
      if (!name) return;

      // Register field
      this.registerField(name, element as HTMLElement);

      // Listen for changes
      element.addEventListener('input', () => {
        this.handleFieldChange(name);
      });

      element.addEventListener('blur', () => {
        this.validateField(name);
      });
    });
  }

  private registerField(name: string, element: HTMLElement) {
    const value = this.getFieldValue(element);

    this.fields.set(name, {
      name,
      value,
      valid: true,
      element,
    });
  }

  private getFieldValue(element: HTMLElement): any {
    // Handle different input types
    if (element instanceof HTMLInputElement) {
      if (element.type === 'checkbox') {
        return element.checked;
      }
      if (element.type === 'number') {
        return element.valueAsNumber;
      }
      return element.value;
    }

    if (element instanceof HTMLSelectElement || element instanceof HTMLTextAreaElement) {
      return element.value;
    }

    // Handle custom web components
    if ('value' in element) {
      return (element as any).value;
    }

    return element.textContent;
  }

  private setFieldValue(element: HTMLElement, value: any) {
    if (element instanceof HTMLInputElement) {
      if (element.type === 'checkbox') {
        element.checked = value;
      } else {
        element.value = value;
      }
    } else if (element instanceof HTMLSelectElement || element instanceof HTMLTextAreaElement) {
      element.value = value;
    } else if ('value' in element) {
      (element as any).value = value;
    }
  }

  private handleFieldChange(fieldName: string) {
    const field = this.fields.get(fieldName);
    if (!field) return;

    field.value = this.getFieldValue(field.element);

    // Emit change event
    this.emit('change', {
      field: fieldName,
      value: field.value,
      formData: this.getFormData(),
    });
  }

  private validateField(fieldName: string): boolean {
    const field = this.fields.get(fieldName);
    if (!field) return true;

    const rules = this.validationSchema[fieldName];
    if (!rules) {
      field.valid = true;
      field.error = undefined;
      return true;
    }

    const value = field.value;
    let error: string | undefined;

    // Required validation
    if (rules.required && !value) {
      error = `${fieldName} is required`;
    }

    // String length validations
    if (typeof value === 'string') {
      if (rules.minLength && value.length < rules.minLength) {
        error = `${fieldName} must be at least ${rules.minLength} characters`;
      }
      if (rules.maxLength && value.length > rules.maxLength) {
        error = `${fieldName} must be no more than ${rules.maxLength} characters`;
      }
    }

    // Number validations
    if (typeof value === 'number') {
      if (rules.min !== undefined && value < rules.min) {
        error = `${fieldName} must be at least ${rules.min}`;
      }
      if (rules.max !== undefined && value > rules.max) {
        error = `${fieldName} must be no more than ${rules.max}`;
      }
    }

    // Pattern validation
    if (rules.pattern && typeof value === 'string' && !rules.pattern.test(value)) {
      error = `${fieldName} format is invalid`;
    }

    // Email validation
    if (rules.email && typeof value === 'string') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        error = `${fieldName} must be a valid email address`;
      }
    }

    // URL validation
    if (rules.url && typeof value === 'string') {
      try {
        new URL(value);
      } catch {
        error = `${fieldName} must be a valid URL`;
      }
    }

    // Custom validation
    if (rules.custom) {
      const result = rules.custom(value);
      if (result === false) {
        error = `${fieldName} is invalid`;
      } else if (typeof result === 'string') {
        error = result;
      }
    }

    field.valid = !error;
    field.error = error;

    // Update field UI
    this.updateFieldUI(field);

    return field.valid;
  }

  private updateFieldUI(field: FormField) {
    const element = field.element;

    // Set error state on element
    if (field.valid) {
      element.removeAttribute('error');
      element.removeAttribute('error-message');
    } else {
      element.setAttribute('error', '');
      if (field.error) {
        element.setAttribute('error-message', field.error);
      }
    }
  }

  private validateForm(): boolean {
    let isValid = true;
    const errors: string[] = [];

    this.fields.forEach((field, name) => {
      const fieldValid = this.validateField(name);
      if (!fieldValid) {
        isValid = false;
        if (field.error) {
          errors.push(field.error);
        }
      }
    });

    // Update error display
    const errorContainer = this.shadowRoot!.querySelector('.form-errors');
    const errorList = errorContainer?.querySelector('ul');

    if (errors.length > 0) {
      errorContainer?.classList.remove('hidden');
      if (errorList) {
        errorList.innerHTML = errors.map((err) => `<li>${err}</li>`).join('');
      }
    } else {
      errorContainer?.classList.add('hidden');
    }

    return isValid;
  }

  private handleSubmit() {
    const isValid = this.validateForm();

    if (isValid) {
      const formData = this.getFormData();
      this.emit('submit', { data: formData });
    } else {
      this.emit('invalid', {
        errors: Array.from(this.fields.values())
          .filter((f) => !f.valid)
          .map((f) => ({ field: f.name, error: f.error })),
      });
    }
  }

  /**
   * Get current form data as an object
   */
  public getFormData(): Record<string, any> {
    const data: Record<string, any> = {};
    this.fields.forEach((field, name) => {
      data[name] = field.value;
    });
    return data;
  }

  /**
   * Set form data programmatically
   */
  public setFormData(data: Record<string, any>) {
    Object.entries(data).forEach(([name, value]) => {
      const field = this.fields.get(name);
      if (field) {
        field.value = value;
        this.setFieldValue(field.element, value);
      }
    });
  }

  /**
   * Reset form to initial state
   */
  public reset() {
    this.formElement.reset();
    this.fields.forEach((field) => {
      field.valid = true;
      field.error = undefined;
      this.updateFieldUI(field);
    });

    const errorContainer = this.shadowRoot!.querySelector('.form-errors');
    errorContainer?.classList.add('hidden');
  }

  /**
   * Manually trigger form validation
   */
  public validate(): boolean {
    return this.validateForm();
  }

  /**
   * Get validation errors
   */
  public getErrors(): Array<{ field: string; error: string }> {
    return Array.from(this.fields.values())
      .filter((f) => !f.valid && f.error)
      .map((f) => ({ field: f.name, error: f.error! }));
  }
}

// Register component
if (!customElements.get('ribble-form')) {
  customElements.define('ribble-form', Form);
}

export default Form;
