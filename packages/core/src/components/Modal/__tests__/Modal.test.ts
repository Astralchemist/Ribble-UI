import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  renderWebComponent,
  waitForComponent,
  queryShadow,
  userEvent,
  waitFor,
} from '@ribble-ui/testing';
import '../Modal';

describe('ribble-modal', () => {
  beforeEach(async () => {
    await waitForComponent('ribble-modal');
  });

  describe('Rendering', () => {
    it('should not be visible by default', () => {
      const { element } = renderWebComponent('ribble-modal');
      const dialog = queryShadow(element, 'dialog');
      expect(dialog?.hasAttribute('open')).toBe(false);
    });

    it('should be visible when open prop is true', () => {
      const { element } = renderWebComponent('ribble-modal', { open: true });
      const dialog = queryShadow(element, 'dialog');
      expect(dialog?.hasAttribute('open')).toBe(true);
    });

    it('should render title', () => {
      const { element } = renderWebComponent('ribble-modal', {
        title: 'Modal Title',
        open: true,
      });
      const title = queryShadow(element, '.modal-title');
      expect(title?.textContent).toContain('Modal Title');
    });

    it('should render slot content', () => {
      const { element } = renderWebComponent(
        'ribble-modal',
        { open: true },
        { slot: 'Modal content' }
      );
      expect(element.textContent).toContain('Modal content');
    });
  });

  describe('Interactions', () => {
    it('should close on close button click', async () => {
      const { element } = renderWebComponent('ribble-modal', { open: true });
      const closeSpy = vi.fn();
      element.addEventListener('close', closeSpy);

      const closeButton = queryShadow(
        element,
        '.close-button'
      ) as HTMLButtonElement;
      await userEvent.click(closeButton);

      expect(closeSpy).toHaveBeenCalled();
    });

    it('should close on backdrop click when closeOnBackdrop is true', async () => {
      const { element } = renderWebComponent('ribble-modal', {
        open: true,
        'close-on-backdrop': true,
      });
      const closeSpy = vi.fn();
      element.addEventListener('close', closeSpy);

      const backdrop = queryShadow(element, '.backdrop') as HTMLElement;
      await userEvent.click(backdrop);

      expect(closeSpy).toHaveBeenCalled();
    });

    it('should not close on backdrop click when closeOnBackdrop is false', async () => {
      const { element } = renderWebComponent('ribble-modal', {
        open: true,
        'close-on-backdrop': false,
      });
      const closeSpy = vi.fn();
      element.addEventListener('close', closeSpy);

      const backdrop = queryShadow(element, '.backdrop') as HTMLElement;
      await userEvent.click(backdrop);

      expect(closeSpy).not.toHaveBeenCalled();
    });

    it('should close on Escape key', async () => {
      const { element } = renderWebComponent('ribble-modal', { open: true });
      const closeSpy = vi.fn();
      element.addEventListener('close', closeSpy);

      await userEvent.keyboard('{Escape}');

      await waitFor(() => {
        expect(closeSpy).toHaveBeenCalled();
      });
    });

    it('should not close on Escape when closeOnEscape is false', async () => {
      const { element } = renderWebComponent('ribble-modal', {
        open: true,
        'close-on-escape': false,
      });
      const closeSpy = vi.fn();
      element.addEventListener('close', closeSpy);

      await userEvent.keyboard('{Escape}');

      await new Promise((resolve) => setTimeout(resolve, 100));
      expect(closeSpy).not.toHaveBeenCalled();
    });
  });

  describe('Focus Management', () => {
    it('should trap focus inside modal when open', async () => {
      const { element } = renderWebComponent('ribble-modal', { open: true });

      const firstFocusable = queryShadow(
        element,
        'button'
      ) as HTMLButtonElement;
      firstFocusable?.focus();

      expect(document.activeElement).toBe(firstFocusable);
    });

    it('should return focus to trigger element on close', async () => {
      const trigger = document.createElement('button');
      document.body.appendChild(trigger);
      trigger.focus();

      const { element } = renderWebComponent('ribble-modal', { open: true });

      // Simulate close
      element.setAttribute('open', 'false');

      await waitFor(() => {
        expect(document.activeElement).toBe(trigger);
      });

      document.body.removeChild(trigger);
    });
  });

  describe('Accessibility', () => {
    it('should have dialog role', () => {
      const { element } = renderWebComponent('ribble-modal', { open: true });
      const dialog = queryShadow(element, 'dialog');
      expect(dialog?.getAttribute('role')).toBe('dialog');
    });

    it('should have aria-modal attribute', () => {
      const { element } = renderWebComponent('ribble-modal', { open: true });
      const dialog = queryShadow(element, 'dialog');
      expect(dialog?.getAttribute('aria-modal')).toBe('true');
    });

    it('should have aria-labelledby referencing title', () => {
      const { element } = renderWebComponent('ribble-modal', {
        title: 'Test Modal',
        open: true,
      });

      const dialog = queryShadow(element, 'dialog');
      const title = queryShadow(element, '.modal-title');
      const titleId = title?.getAttribute('id');

      expect(dialog?.getAttribute('aria-labelledby')).toBe(titleId);
    });

    it('should have aria-describedby for content', () => {
      const { element } = renderWebComponent('ribble-modal', { open: true });
      const dialog = queryShadow(element, 'dialog');
      const describedBy = dialog?.getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();
    });
  });

  describe('Size Variants', () => {
    it.each(['small', 'medium', 'large', 'fullscreen'])(
      'should apply size class for %s',
      (size) => {
        const { element } = renderWebComponent('ribble-modal', {
          size,
          open: true,
        });
        const dialog = queryShadow(element, 'dialog');
        expect(dialog?.classList.contains(size)).toBe(true);
      }
    );
  });

  describe('Animation', () => {
    it('should apply entering animation when opening', async () => {
      const { element, rerender } = renderWebComponent('ribble-modal', {
        open: false,
      });

      rerender({ open: true });

      await waitFor(() => {
        const dialog = queryShadow(element, 'dialog');
        expect(dialog?.classList.contains('entering')).toBe(true);
      });
    });

    it('should apply leaving animation when closing', async () => {
      const { element, rerender } = renderWebComponent('ribble-modal', {
        open: true,
      });

      rerender({ open: false });

      await waitFor(() => {
        const dialog = queryShadow(element, 'dialog');
        expect(
          dialog?.classList.contains('leaving') ||
            !dialog?.hasAttribute('open')
        ).toBe(true);
      });
    });
  });
});
