import { useState, FormEvent } from 'react';
import { FormField, FormErrors } from '../types';
import { validateForm } from '../utils/validation';

interface FormBuilderProps {
  fields: FormField[];
  initialData?: Record<string, any>;
  onSubmit: (data: Record<string, any>) => void;
  submitLabel?: string;
  cancelLabel?: string;
  onCancel?: () => void;
}

export default function FormBuilder({
  fields,
  initialData = {},
  onSubmit,
  submitLabel = 'Submit',
  cancelLabel = 'Cancel',
  onCancel,
}: FormBuilderProps) {
  const [formData, setFormData] = useState<Record<string, any>>(() => {
    const data: Record<string, any> = {};
    fields.forEach((field) => {
      data[field.name] = initialData[field.name] ?? field.defaultValue ?? '';
    });
    return data;
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleBlur = (name: string) => {
    setTouched((prev) => new Set(prev).add(name));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched = new Set(fields.map((f) => f.name));
    setTouched(allTouched);

    // Validate form
    const validationErrors = validateForm(fields, formData);
    setErrors(validationErrors);

    // Submit if no errors
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData);
    }
  };

  const renderField = (field: FormField) => {
    const value = formData[field.name];
    const error = touched.has(field.name) ? errors[field.name] : undefined;
    const hasError = !!error;

    const commonProps = {
      id: field.name,
      name: field.name,
      value: value || '',
      onChange: (e: any) => handleChange(field.name, e.target.value),
      onBlur: () => handleBlur(field.name),
      className: hasError ? 'error' : '',
    };

    switch (field.type) {
      case 'text':
      case 'email':
      case 'password':
      case 'number':
        return (
          <input
            {...commonProps}
            type={field.type}
            placeholder={field.placeholder}
            className={`form-input ${hasError ? 'error' : ''}`}
          />
        );

      case 'textarea':
        return (
          <textarea
            {...commonProps}
            placeholder={field.placeholder}
            className={`form-textarea ${hasError ? 'error' : ''}`}
            rows={5}
          />
        );

      case 'select':
        return (
          <select {...commonProps} className={`form-select ${hasError ? 'error' : ''}`}>
            <option value="">Select {field.label}</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'checkbox':
        return (
          <div className="checkbox-group">
            {field.options?.map((option) => (
              <label key={option.value} className="checkbox-label">
                <input
                  type="checkbox"
                  name={field.name}
                  value={option.value}
                  checked={
                    Array.isArray(value) ? value.includes(option.value) : false
                  }
                  onChange={(e) => {
                    const currentValues = Array.isArray(value) ? value : [];
                    const newValues = e.target.checked
                      ? [...currentValues, option.value]
                      : currentValues.filter((v) => v !== option.value);
                    handleChange(field.name, newValues);
                  }}
                />
                {option.label}
              </label>
            ))}
          </div>
        );

      case 'radio':
        return (
          <div className="radio-group">
            {field.options?.map((option) => (
              <label key={option.value} className="radio-label">
                <input
                  type="radio"
                  name={field.name}
                  value={option.value}
                  checked={value === option.value}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                />
                {option.label}
              </label>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name} className="form-group">
          <label
            htmlFor={field.name}
            className={`form-label ${field.validation?.required ? 'required' : ''}`}
          >
            {field.label}
          </label>
          {renderField(field)}
          {touched.has(field.name) && errors[field.name] && (
            <div className="form-error">{errors[field.name]}</div>
          )}
        </div>
      ))}

      <div className="btn-group" style={{ marginTop: '24px' }}>
        {onCancel && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            {cancelLabel}
          </button>
        )}
        <button type="submit" className="btn btn-primary">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
