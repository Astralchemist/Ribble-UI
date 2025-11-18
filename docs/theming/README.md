# Theming & Customization Guide

Ribble UI provides a comprehensive theming system built on design tokens and CSS custom properties.

## Table of Contents

- [Quick Start](#quick-start)
- [Design Tokens](#design-tokens)
- [Creating Custom Themes](#creating-custom-themes)
- [Dark Mode](#dark-mode)
- [Component Customization](#component-customization)
- [Advanced Techniques](#advanced-techniques)

## Quick Start

### Basic Theme Setup

```typescript
import { createTheme, ThemeProvider } from '@ribble-ui/core';

// Create a custom theme
const myTheme = createTheme({
  colors: {
    primary: '#6366f1',
    secondary: '#8b5cf6',
  },
  spacing: {
    base: '8px',
  },
});

// Apply theme
const provider = new ThemeProvider();
provider.setTheme(myTheme);
```

### CSS Custom Properties

```css
:root {
  /* Override design tokens */
  --color-primary: #6366f1;
  --color-secondary: #8b5cf6;
  --spacing-base: 8px;
  --radius-md: 8px;
  --font-family: 'Inter', sans-serif;
}
```

## Design Tokens

### Color Tokens

```typescript
// Available color tokens
const colors = {
  // Brand colors
  primary: '#3b82f6',
  secondary: '#6b7280',

  // Semantic colors
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',

  // Neutral colors
  white: '#ffffff',
  black: '#000000',

  // Gray scale
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },

  // Surface colors
  surface: '#ffffff',
  'surface-secondary': '#f3f4f6',
  'surface-hover': '#f9fafb',

  // Text colors
  text: '#111827',
  'text-secondary': '#6b7280',
  'text-inverse': '#ffffff',

  // Border colors
  border: '#e5e7eb',
  'border-dark': '#d1d5db',
};
```

### Typography Tokens

```typescript
const typography = {
  fontFamily: {
    sans: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    mono: '"Fira Code", "Courier New", monospace',
  },

  fontSize: {
    xs: 'clamp(0.75rem, 0.7rem + 0.2vw, 0.875rem)',
    sm: 'clamp(0.875rem, 0.825rem + 0.2vw, 1rem)',
    md: 'clamp(1rem, 0.95rem + 0.4vw, 1.25rem)',
    lg: 'clamp(1.125rem, 1.05rem + 0.6vw, 1.5rem)',
    xl: 'clamp(1.25rem, 1.15rem + 0.8vw, 1.875rem)',
    '2xl': 'clamp(1.5rem, 1.35rem + 1.2vw, 2.25rem)',
    '3xl': 'clamp(1.875rem, 1.65rem + 1.8vw, 3rem)',
  },

  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
  },
};
```

### Spacing Tokens

```typescript
const spacing = {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '16px',
  4: '24px',
  5: '32px',
  6: '48px',
  7: '56px',
  8: '64px',
};
```

### Border Radius Tokens

```typescript
const radius = {
  none: '0',
  sm: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  '2xl': '16px',
  full: '9999px',
};
```

### Shadow Tokens

```typescript
const shadow = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
};
```

### Animation Tokens

```typescript
const animation = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },

  easing: {
    standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
    decelerate: 'cubic-bezier(0, 0, 0.2, 1)',
    accelerate: 'cubic-bezier(0.4, 0, 1, 1)',
  },
};
```

## Creating Custom Themes

### Method 1: JavaScript/TypeScript

```typescript
import { createTheme } from '@ribble-ui/core';

const customTheme = createTheme({
  name: 'my-brand',

  colors: {
    primary: '#6366f1',
    secondary: '#8b5cf6',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  },

  typography: {
    fontFamily: '"Poppins", sans-serif',
    fontSize: {
      base: '16px',
    },
  },

  spacing: {
    base: '8px',
    scale: 1.5, // Multiply base by scale for each step
  },

  radius: {
    default: '8px',
  },

  shadows: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.1)',
    md: '0 4px 8px rgba(0, 0, 0, 0.12)',
    lg: '0 8px 16px rgba(0, 0, 0, 0.15)',
  },
});

// Apply theme
import { ThemeProvider } from '@ribble-ui/core';
const provider = new ThemeProvider();
provider.setTheme(customTheme);
```

### Method 2: CSS Variables

```css
/* In your global CSS file */
:root {
  /* Colors */
  --color-primary: #6366f1;
  --color-primary-light: #a5b4fc;
  --color-primary-dark: #4338ca;

  --color-secondary: #8b5cf6;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;

  /* Typography */
  --font-family: 'Poppins', sans-serif;
  --font-size-base: 16px;
  --font-weight-normal: 400;
  --font-weight-bold: 700;

  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;

  /* Border radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.12);
  --shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.15);

  /* Transitions */
  --transition-fast: 150ms;
  --transition-normal: 300ms;
  --transition-slow: 500ms;
}
```

### Method 3: JSON Configuration

```json
{
  "theme": {
    "name": "my-brand",
    "colors": {
      "primary": "#6366f1",
      "secondary": "#8b5cf6"
    },
    "typography": {
      "fontFamily": "Poppins, sans-serif"
    },
    "spacing": {
      "base": "8px"
    }
  }
}
```

```typescript
import themeConfig from './theme.json';
import { createTheme } from '@ribble-ui/core';

const theme = createTheme(themeConfig.theme);
```

## Dark Mode

### Automatic Dark Mode

```typescript
import { ThemeProvider, themes } from '@ribble-ui/core';

const provider = new ThemeProvider();

// Automatically detect system preference
provider.setTheme(themes.auto);

// Or set explicitly
provider.setTheme(themes.dark);
```

### CSS-Based Dark Mode

```css
:root {
  --color-surface: #ffffff;
  --color-text: #111827;
  --color-border: #e5e7eb;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-surface: #1f2937;
    --color-text: #f9fafb;
    --color-border: #374151;
  }
}

/* Or use data attribute */
[data-theme="dark"] {
  --color-surface: #1f2937;
  --color-text: #f9fafb;
  --color-border: #374151;
}
```

### Dark Mode Toggle

```typescript
import { ThemeProvider } from '@ribble-ui/core';

const provider = new ThemeProvider();

function toggleDarkMode() {
  const currentTheme = provider.getCurrentTheme();
  provider.setTheme(currentTheme === 'dark' ? 'light' : 'dark');
}
```

```html
<ribble-button onclick="toggleDarkMode()">
  <ribble-icon name="moon"></ribble-icon>
  Toggle Dark Mode
</ribble-button>
```

## Component Customization

### Using CSS Parts

```css
/* Target specific parts of components */
ribble-button::part(button) {
  border-radius: 20px;
  font-weight: 600;
}

ribble-input::part(input) {
  background-color: #f9fafb;
  border-color: #e5e7eb;
}

ribble-modal::part(dialog) {
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
```

### Component-Specific Variables

```css
/* Button customization */
ribble-button {
  --button-bg: #6366f1;
  --button-text: #ffffff;
  --button-hover-bg: #4338ca;
  --button-padding: 12px 24px;
  --button-radius: 8px;
}

/* Input customization */
ribble-input {
  --input-border: #e5e7eb;
  --input-focus-border: #6366f1;
  --input-padding: 12px;
  --input-radius: 6px;
}

/* Card customization */
ribble-card {
  --card-bg: #ffffff;
  --card-border: #e5e7eb;
  --card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --card-padding: 24px;
  --card-radius: 12px;
}
```

### Variant Customization

```css
/* Custom button variants */
ribble-button[variant="gradient"] {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
}

ribble-button[variant="glass"] {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

## Advanced Techniques

### Multi-Brand Theming

```typescript
import { createTheme, registerTheme } from '@ribble-ui/core';

// Brand A
const brandA = createTheme({
  name: 'brand-a',
  colors: {
    primary: '#6366f1',
  },
});

// Brand B
const brandB = createTheme({
  name: 'brand-b',
  colors: {
    primary: '#ec4899',
  },
});

// Register themes
registerTheme('brand-a', brandA);
registerTheme('brand-b', brandB);

// Switch between brands
provider.setTheme('brand-a');
// or
provider.setTheme('brand-b');
```

### Theme Switching with Transitions

```css
:root {
  transition: background-color 300ms, color 300ms;
}

* {
  transition: background-color 300ms, border-color 300ms, color 300ms;
}
```

```typescript
function switchTheme(themeName: string) {
  // Add transition class
  document.documentElement.classList.add('theme-transitioning');

  // Change theme
  provider.setTheme(themeName);

  // Remove transition class after animation
  setTimeout(() => {
    document.documentElement.classList.remove('theme-transitioning');
  }, 300);
}
```

### Context-Specific Themes

```html
<!-- Different themes for different sections -->
<div data-theme="light">
  <ribble-button>Light Theme Button</ribble-button>
</div>

<div data-theme="dark">
  <ribble-button>Dark Theme Button</ribble-button>
</div>
```

```css
[data-theme="light"] {
  --color-surface: #ffffff;
  --color-text: #111827;
}

[data-theme="dark"] {
  --color-surface: #1f2937;
  --color-text: #f9fafb;
}
```

### Dynamic Color Generation

```typescript
import { generateColorScale } from '@ribble-ui/utils';

// Generate color scale from single color
const primaryScale = generateColorScale('#6366f1');

// Apply to theme
const theme = createTheme({
  colors: {
    primary: primaryScale[600],
    'primary-light': primaryScale[400],
    'primary-dark': primaryScale[800],
  },
});
```

### Theme Persistence

```typescript
import { ThemeProvider, persistTheme } from '@ribble-ui/core';

const provider = new ThemeProvider();

// Save theme preference
function setAndSaveTheme(themeName: string) {
  provider.setTheme(themeName);
  persistTheme(themeName); // Saves to localStorage
}

// Restore theme on load
window.addEventListener('load', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    provider.setTheme(savedTheme);
  }
});
```

## Best Practices

1. **Use Design Tokens**: Always use design tokens instead of hard-coded values
2. **Maintain Contrast**: Ensure proper color contrast ratios (WCAG AA)
3. **Test Both Themes**: Always test light and dark modes
4. **Responsive Typography**: Use fluid typography with `clamp()`
5. **Consistent Spacing**: Follow spacing scale for predictable layouts
6. **Document Customizations**: Keep track of custom theme overrides
7. **Performance**: Minimize use of CSS filters and backdrop-filter
8. **Fallbacks**: Provide fallback values for older browsers

## Examples

### E-commerce Theme

```typescript
const ecommerceTheme = createTheme({
  name: 'ecommerce',
  colors: {
    primary: '#059669', // Green for "add to cart"
    secondary: '#dc2626', // Red for sales
    accent: '#f59e0b', // Orange for highlights
  },
  typography: {
    fontFamily: '"Roboto", sans-serif',
  },
  radius: {
    default: '4px', // Sharp corners for product cards
  },
});
```

### SaaS Dashboard Theme

```typescript
const dashboardTheme = createTheme({
  name: 'dashboard',
  colors: {
    primary: '#3b82f6',
    sidebar: '#1e293b',
    surface: '#f8fafc',
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
    fontSize: {
      sm: '0.875rem',
    },
  },
  spacing: {
    compact: true, // Use tighter spacing
  },
});
```

## Resources

- [Design Tokens Specification](https://design-tokens.github.io/community-group/)
- [CSS Custom Properties (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [Material Design Color System](https://m3.material.io/styles/color)
- [Tailwind CSS Color Palette](https://tailwindcss.com/docs/customizing-colors)
