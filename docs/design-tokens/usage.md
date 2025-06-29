# Design Tokens Usage

Design tokens are the single source of truth for your UI Kit’s visual style. Use them in your CSS, JS, or framework code for consistent theming.

## Categories

- Color (palette, semantic, light/dark themes)
- Typography (font family, size, weight, line height)
- Spacing (modular scale)
- Radius (border radius)
- Shadow (elevation)
- Animation (duration, easing)
- Breakpoint (responsive)
- Z-Index (layering)

## Theme Switching

### CSS

Use `[data-theme="dark"]` on a parent element to enable dark mode. Semantic tokens automatically resolve to the correct palette for each theme.

```css
:root {
  --color-primary: var(--palette-blue-600); /* light */
}
[data-theme='dark'] {
  --color-primary: var(--palette-blue-600); /* dark */
}
```

### JS

Access both palette and semantic tokens, and switch themes as needed:

```js
import { tokens } from '@ui-kit/core/src/formats/tokens.js';
const primaryLight = tokens.color.light.blue[600];
const primaryDark = tokens.color.dark.blue[600];
const semanticPrimary = tokens.color.semantic.primary; // resolves to palette
```

## Example (CSS)

```css
.button {
  background: var(--color-primary);
  border-radius: var(--radius-md);
  font-size: var(--font-size-md);
  box-shadow: var(--shadow-md);
  transition: background 150ms var(--animation-easing-in-out);
}
```

## Example (SCSS)

```scss
.button {
  background: $color-primary;
  border-radius: $radius-md;
  font-size: $font-size-md;
  box-shadow: $shadow-md;
  transition: background $animation-duration-fast $animation-easing-in-out;
}
```

## Example (JS)

```js
import { tokens } from '@ui-kit/core/src/formats/tokens.js';
console.log(tokens.color.semantic.primary); // '{color.blue.600}'
console.log(tokens.color.light.blue[600]); // '#2563eb'
```

## Best Practices

- Use semantic tokens for UI roles (e.g., `primary`, `error`).
- Use palette tokens for custom/advanced theming.
- Always use the provided scale for spacing, radius, etc.
- Switch themes by toggling `[data-theme="dark"]`.
