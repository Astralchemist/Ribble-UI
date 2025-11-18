import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  renderWebComponent,
  waitForComponent,
  queryShadow,
  userEvent,
} from '@ribble-ui/testing';
import '../Button';

describe('ribble-button', () => {
  beforeEach(async () => {
    await waitForComponent('ribble-button');
  });

  describe('Rendering', () => {
    it('should render button element', () => {
      const { element } = renderWebComponent('ribble-button');
      expect(element).toBeInTheDocument();
      const button = queryShadow(element, 'button');
      expect(button).toBeTruthy();
    });

    it('should render with slot content', () => {
      const { element } = renderWebComponent(
        'ribble-button',
        {},
        { slot: 'Click me' }
      );
      expect(element.textContent).toBe('Click me');
    });

    it('should apply variant classes', () => {
      const { element } = renderWebComponent('ribble-button', {
        variant: 'primary',
      });
      const button = queryShadow(element, 'button');
      expect(button?.classList.contains('primary')).toBe(true);
    });

    it('should apply size classes', () => {
      const { element } = renderWebComponent('ribble-button', {
        size: 'large',
      });
      const button = queryShadow(element, 'button');
      expect(button?.classList.contains('large')).toBe(true);
    });
  });

  describe('States', () => {
    it('should be disabled when disabled prop is true', () => {
      const { element } = renderWebComponent('ribble-button', {
        disabled: true,
      });
      const button = queryShadow(element, 'button');
      expect(button?.hasAttribute('disabled')).toBe(true);
    });

    it('should show loading state', () => {
      const { element } = renderWebComponent('ribble-button', {
        loading: true,
      });
      const spinner = queryShadow(element, '.spinner');
      expect(spinner).toBeTruthy();
    });

    it('should be disabled when loading', () => {
      const { element } = renderWebComponent('ribble-button', {
        loading: true,
      });
      const button = queryShadow(element, 'button');
      expect(button?.hasAttribute('disabled')).toBe(true);
    });
  });

  describe('User Interaction', () => {
    it('should emit click event', async () => {
      const { element } = renderWebComponent('ribble-button');
      const clickSpy = vi.fn();
      element.addEventListener('click', clickSpy);

      const button = queryShadow(element, 'button') as HTMLButtonElement;
      await userEvent.click(button);

      expect(clickSpy).toHaveBeenCalled();
    });

    it('should not emit click when disabled', async () => {
      const { element } = renderWebComponent('ribble-button', {
        disabled: true,
      });
      const clickSpy = vi.fn();
      element.addEventListener('click', clickSpy);

      const button = queryShadow(element, 'button') as HTMLButtonElement;
      await userEvent.click(button);

      expect(clickSpy).not.toHaveBeenCalled();
    });

    it('should support keyboard activation', async () => {
      const { element } = renderWebComponent('ribble-button');
      const clickSpy = vi.fn();
      element.addEventListener('click', clickSpy);

      const button = queryShadow(element, 'button') as HTMLButtonElement;
      button.focus();
      await userEvent.keyboard('{Enter}');

      expect(clickSpy).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have button role', () => {
      const { element } = renderWebComponent('ribble-button');
      const button = queryShadow(element, 'button');
      expect(button?.getAttribute('role')).toBe('button');
    });

    it('should be focusable', () => {
      const { element } = renderWebComponent('ribble-button');
      const button = queryShadow(element, 'button') as HTMLButtonElement;
      button.focus();
      expect(document.activeElement).toBe(button);
    });

    it('should have aria-disabled when disabled', () => {
      const { element } = renderWebComponent('ribble-button', {
        disabled: true,
      });
      const button = queryShadow(element, 'button');
      expect(button?.getAttribute('aria-disabled')).toBe('true');
    });

    it('should have aria-busy when loading', () => {
      const { element } = renderWebComponent('ribble-button', {
        loading: true,
      });
      const button = queryShadow(element, 'button');
      expect(button?.getAttribute('aria-busy')).toBe('true');
    });
  });

  describe('Button Types', () => {
    it('should support type="submit"', () => {
      const { element } = renderWebComponent('ribble-button', {
        type: 'submit',
      });
      const button = queryShadow(element, 'button');
      expect(button?.getAttribute('type')).toBe('submit');
    });

    it('should support type="reset"', () => {
      const { element } = renderWebComponent('ribble-button', {
        type: 'reset',
      });
      const button = queryShadow(element, 'button');
      expect(button?.getAttribute('type')).toBe('reset');
    });

    it('should default to type="button"', () => {
      const { element } = renderWebComponent('ribble-button');
      const button = queryShadow(element, 'button');
      expect(button?.getAttribute('type')).toBe('button');
    });
  });
});
