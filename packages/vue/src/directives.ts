// Custom Vue directives for component enhancement.

import { DirectiveBinding } from 'vue';

// Example: v-theme directive to apply theme CSS vars
export const vTheme = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    if (binding.value && typeof binding.value === 'object') {
      Object.entries(binding.value).forEach(([k, v]) => {
        el.style.setProperty(`--ui-${k}`, String(v));
      });
    }
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    if (binding.value && typeof binding.value === 'object') {
      Object.entries(binding.value).forEach(([k, v]) => {
        el.style.setProperty(`--ui-${k}`, String(v));
      });
    }
  },
};
