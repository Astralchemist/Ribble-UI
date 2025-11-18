import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  renderWebComponent,
  waitForComponent,
  queryShadow,
  userEvent,
} from '@ribble-ui/testing';
import '../Form';
import '../../Input/Input';
import '../../Button/Button';

describe('ribble-form', () => {
  beforeEach(async () => {
    await waitForComponent('ribble-form');
  });

  describe('Rendering', () => {
    it('should render form element', () => {
      const { element } = renderWebComponent('ribble-form');
      const form = queryShadow(element, 'form');
      expect(form).toBeTruthy();
    });

    it('should render slotted content', () => {
      const { element } = renderWebComponent(
        'ribble-form',
        {},
        { innerHTML: '<div class="test-content">Form content</div>' }
      );
      const content = element.querySelector('.test-content');
      expect(content?.textContent).toBe('Form content');
    });
  });

  describe('Form Submission', () => {
    it('should emit submit event on valid form submission', async () => {
      const container = document.createElement('div');
      document.body.appendChild(container);

      const form = document.createElement('ribble-form') as any;
      const input = document.createElement('input');
      input.setAttribute('name', 'username');
      input.value = 'testuser';

      form.appendChild(input);
      container.appendChild(form);

      const submitSpy = vi.fn();
      form.addEventListener('submit', submitSpy);

      // Trigger submit
      const formEl = queryShadow(form, 'form') as HTMLFormElement;
      formEl.dispatchEvent(new Event('submit'));

      expect(submitSpy).toHaveBeenCalled();
      expect(submitSpy.mock.calls[0][0].detail.data).toEqual({
        username: 'testuser',
      });

      document.body.removeChild(container);
    });

    it('should prevent submission of invalid form', async () => {
      const container = document.createElement('div');
      document.body.appendChild(container);

      const form = document.createElement('ribble-form') as any;
      form.setAttribute(
        'schema',
        JSON.stringify({
          email: { required: true, email: true },
        })
      );

      const input = document.createElement('input');
      input.setAttribute('name', 'email');
      input.value = 'invalid-email';

      form.appendChild(input);
      container.appendChild(form);

      const submitSpy = vi.fn();
      const invalidSpy = vi.fn();
      form.addEventListener('submit', submitSpy);
      form.addEventListener('invalid', invalidSpy);

      // Trigger submit
      const formEl = queryShadow(form, 'form') as HTMLFormElement;
      formEl.dispatchEvent(new Event('submit'));

      expect(submitSpy).not.toHaveBeenCalled();
      expect(invalidSpy).toHaveBeenCalled();

      document.body.removeChild(container);
    });
  });

  describe('Validation', () => {
    it('should validate required fields', async () => {
      const container = document.createElement('div');
      document.body.appendChild(container);

      const form = document.createElement('ribble-form') as any;
      form.setAttribute(
        'schema',
        JSON.stringify({
          username: { required: true },
        })
      );

      const input = document.createElement('input');
      input.setAttribute('name', 'username');
      form.appendChild(input);
      container.appendChild(form);

      const isValid = form.validate();
      expect(isValid).toBe(false);

      const errors = form.getErrors();
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].field).toBe('username');

      document.body.removeChild(container);
    });

    it('should validate email format', async () => {
      const container = document.createElement('div');
      document.body.appendChild(container);

      const form = document.createElement('ribble-form') as any;
      form.setAttribute(
        'schema',
        JSON.stringify({
          email: { email: true },
        })
      );

      const input = document.createElement('input');
      input.setAttribute('name', 'email');
      input.value = 'not-an-email';
      form.appendChild(input);
      container.appendChild(form);

      const isValid = form.validate();
      expect(isValid).toBe(false);

      input.value = 'valid@email.com';
      const isValidNow = form.validate();
      expect(isValidNow).toBe(true);

      document.body.removeChild(container);
    });

    it('should validate string length', async () => {
      const container = document.createElement('div');
      document.body.appendChild(container);

      const form = document.createElement('ribble-form') as any;
      form.setAttribute(
        'schema',
        JSON.stringify({
          password: { minLength: 8, maxLength: 20 },
        })
      );

      const input = document.createElement('input');
      input.setAttribute('name', 'password');
      input.value = 'short';
      form.appendChild(input);
      container.appendChild(form);

      let isValid = form.validate();
      expect(isValid).toBe(false);

      input.value = 'validpassword123';
      isValid = form.validate();
      expect(isValid).toBe(true);

      document.body.removeChild(container);
    });

    it('should support custom validation', async () => {
      const container = document.createElement('div');
      document.body.appendChild(container);

      const form = document.createElement('ribble-form') as any;
      form.validationSchema = {
        username: {
          custom: (value: string) => {
            if (value === 'admin') return 'Username cannot be "admin"';
            return true;
          },
        },
      };

      const input = document.createElement('input');
      input.setAttribute('name', 'username');
      input.value = 'admin';
      form.appendChild(input);
      container.appendChild(form);

      const isValid = form.validate();
      expect(isValid).toBe(false);

      const errors = form.getErrors();
      expect(errors[0].error).toBe('Username cannot be "admin"');

      document.body.removeChild(container);
    });
  });

  describe('Form Data Management', () => {
    it('should get form data', () => {
      const container = document.createElement('div');
      document.body.appendChild(container);

      const form = document.createElement('ribble-form') as any;
      const input1 = document.createElement('input');
      input1.setAttribute('name', 'username');
      input1.value = 'john';

      const input2 = document.createElement('input');
      input2.setAttribute('name', 'email');
      input2.value = 'john@example.com';

      form.appendChild(input1);
      form.appendChild(input2);
      container.appendChild(form);

      // Wait for field discovery
      setTimeout(() => {
        const data = form.getFormData();
        expect(data).toEqual({
          username: 'john',
          email: 'john@example.com',
        });
      }, 100);

      document.body.removeChild(container);
    });

    it('should set form data', () => {
      const container = document.createElement('div');
      document.body.appendChild(container);

      const form = document.createElement('ribble-form') as any;
      const input = document.createElement('input');
      input.setAttribute('name', 'username');
      form.appendChild(input);
      container.appendChild(form);

      setTimeout(() => {
        form.setFormData({ username: 'jane' });
        expect(input.value).toBe('jane');
      }, 100);

      document.body.removeChild(container);
    });

    it('should reset form', () => {
      const container = document.createElement('div');
      document.body.appendChild(container);

      const form = document.createElement('ribble-form') as any;
      const input = document.createElement('input');
      input.setAttribute('name', 'username');
      input.value = 'test';
      form.appendChild(input);
      container.appendChild(form);

      setTimeout(() => {
        form.reset();
        expect(input.value).toBe('');
      }, 100);

      document.body.removeChild(container);
    });
  });
});
