import { FormField, FormErrors, ValidationRule } from '../types';

export function validateField(value: any, rule?: ValidationRule): string | null {
  if (!rule) return null;

  // Required validation
  if (rule.required && (!value || value === '')) {
    return 'This field is required';
  }

  // Skip other validations if field is empty and not required
  if (!value && !rule.required) return null;

  // Min length validation
  if (rule.minLength && String(value).length < rule.minLength) {
    return `Minimum length is ${rule.minLength} characters`;
  }

  // Max length validation
  if (rule.maxLength && String(value).length > rule.maxLength) {
    return `Maximum length is ${rule.maxLength} characters`;
  }

  // Pattern validation
  if (rule.pattern && !rule.pattern.test(String(value))) {
    return 'Invalid format';
  }

  // Min value validation
  if (rule.min !== undefined && Number(value) < rule.min) {
    return `Minimum value is ${rule.min}`;
  }

  // Max value validation
  if (rule.max !== undefined && Number(value) > rule.max) {
    return `Maximum value is ${rule.max}`;
  }

  // Custom validation
  if (rule.custom) {
    return rule.custom(value);
  }

  return null;
}

export function validateForm(fields: FormField[], formData: Record<string, any>): FormErrors {
  const errors: FormErrors = {};

  fields.forEach((field) => {
    const error = validateField(formData[field.name], field.validation);
    if (error) {
      errors[field.name] = error;
    }
  });

  return errors;
}

export const commonValidations = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  phone: {
    pattern: /^\+?[\d\s-()]+$/,
  },
  url: {
    pattern: /^https?:\/\/.+/,
  },
  number: {
    pattern: /^\d+$/,
  },
  decimal: {
    pattern: /^\d+\.?\d*$/,
  },
};
