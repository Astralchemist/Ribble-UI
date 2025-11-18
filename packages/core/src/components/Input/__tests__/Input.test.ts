import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  renderWebComponent,
  waitForComponent,
  queryShadow,
  userEvent,
  fireCustomEvent,
} from '@ribble-ui/testing';
import '../Input';

describe('ribble-input', () => {
  beforeEach(async () => {
    await waitForComponent('ribble-input');
  });

  describe('Rendering', () => {
    it('should render with default props', () => {
      const { element } = renderWebComponent('ribble-input');
      expect(element).toBeInTheDocument();
      expect(element.tagName).toBe('RIBBLE-INPUT');
    });

    it('should render with label', () => {
      const { element } = renderWebComponent('ribble-input', {
        label: 'Username',
      });
      const label = queryShadow(element, 'label');
      expect(label?.textContent).toContain('Username');
    });

    it('should render with placeholder', () => {
      const { element } = renderWebComponent('ribble-input', {
        placeholder: 'Enter username',
      });
      const input = queryShadow(element, 'input');
      expect(input?.getAttribute('placeholder')).toBe('Enter username');
    });

    it('should apply disabled state', () => {
      const { element } = renderWebComponent('ribble-input', {
        disabled: true,
      });
      const input = queryShadow(element, 'input');
      expect(input?.hasAttribute('disabled')).toBe(true);
    });

    it('should apply required attribute', () => {
      const { element } = renderWebComponent('ribble-input', {
        required: true,
      });
      const input = queryShadow(element, 'input');
      expect(input?.hasAttribute('required')).toBe(true);
    });
  });

  describe('Input Types', () => {
    it.each(['text', 'email', 'password', 'number', 'tel', 'url'])(
      'should render with type="%s"',
      (type) => {
        const { element } = renderWebComponent('ribble-input', { type });
        const input = queryShadow(element, 'input');
        expect(input?.getAttribute('type')).toBe(type);
      }
    );
  });

  describe('User Interaction', () => {
    it('should update value on input', async () => {
      const { element } = renderWebComponent('ribble-input');
      const input = queryShadow(element, 'input') as HTMLInputElement;

      await userEvent.type(input, 'test value');
      expect(input.value).toBe('test value');
    });

    it('should emit change event', async () => {
      const { element } = renderWebComponent('ribble-input');
      const changeSpy = vi.fn();
      element.addEventListener('change', changeSpy);

      const input = queryShadow(element, 'input') as HTMLInputElement;
      await userEvent.type(input, 'test');
      fireCustomEvent(input, 'change');

      expect(changeSpy).toHaveBeenCalled();
    });

    it('should emit input event while typing', async () => {
      const { element } = renderWebComponent('ribble-input');
      const inputSpy = vi.fn();
      element.addEventListener('input', inputSpy);

      const input = queryShadow(element, 'input') as HTMLInputElement;
      await userEvent.type(input, 'a');

      expect(inputSpy).toHaveBeenCalled();
    });
  });

  describe('Validation', () => {
    it('should show error state', () => {
      const { element } = renderWebComponent('ribble-input', {
        error: true,
        'error-message': 'This field is required',
      });

      const errorMsg = queryShadow(element, '.error-message');
      expect(errorMsg?.textContent).toContain('This field is required');
    });

    it('should validate email format', async () => {
      const { element } = renderWebComponent('ribble-input', {
        type: 'email',
        required: true,
      });

      const input = queryShadow(element, 'input') as HTMLInputElement;
      await userEvent.type(input, 'invalid-email');

      expect(input.validity.valid).toBe(false);
    });

    it('should validate required field', () => {
      const { element } = renderWebComponent('ribble-input', {
        required: true,
      });

      const input = queryShadow(element, 'input') as HTMLInputElement;
      expect(input.validity.valid).toBe(false);
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      const { element } = renderWebComponent('ribble-input', {
        label: 'Email',
        required: true,
      });

      const input = queryShadow(element, 'input');
      expect(input?.hasAttribute('aria-required')).toBe(true);
    });

    it('should associate label with input', () => {
      const { element } = renderWebComponent('ribble-input', {
        label: 'Username',
      });

      const input = queryShadow(element, 'input');
      const inputId = input?.getAttribute('id');
      const label = queryShadow(element, 'label');
      const labelFor = label?.getAttribute('for');

      expect(inputId).toBeTruthy();
      expect(labelFor).toBe(inputId);
    });

    it('should have aria-invalid when error is present', () => {
      const { element } = renderWebComponent('ribble-input', {
        error: true,
      });

      const input = queryShadow(element, 'input');
      expect(input?.getAttribute('aria-invalid')).toBe('true');
    });
  });

  describe('Props Updates', () => {
    it('should update when props change', () => {
      const { element, rerender } = renderWebComponent('ribble-input', {
        value: 'initial',
      });

      rerender({ value: 'updated' });
      const input = queryShadow(element, 'input') as HTMLInputElement;
      expect(input.value).toBe('updated');
    });

    it('should toggle disabled state', () => {
      const { element, rerender } = renderWebComponent('ribble-input', {
        disabled: false,
      });

      const input = queryShadow(element, 'input');
      expect(input?.hasAttribute('disabled')).toBe(false);

      rerender({ disabled: true });
      expect(input?.hasAttribute('disabled')).toBe(true);
    });
  });
});
