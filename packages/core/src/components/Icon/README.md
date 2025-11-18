# Icon Component

A flexible SVG icon component with a comprehensive icon library.

## Features

- 100+ built-in icons
- Customizable size and color
- Accessibility support
- Tree-shakeable
- Framework-agnostic

## Usage

### Basic Usage

```html
<ribble-icon name="check" size="md"></ribble-icon>
<ribble-icon name="user" size="lg" color="#3b82f6"></ribble-icon>
```

### With Accessible Label

```html
<ribble-icon name="settings" label="Open settings"></ribble-icon>
```

### Available Sizes

- `xs` - 12px
- `sm` - 16px
- `md` - 20px (default)
- `lg` - 24px
- `xl` - 32px
- `2xl` - 48px

### React Example

```tsx
import { Icon } from '@ribble-ui/react';

function MyComponent() {
  return (
    <>
      <Icon name="check" size="md" />
      <Icon name="user" color="blue" label="User profile" />
    </>
  );
}
```

### Vue Example

```vue
<template>
  <ribble-icon name="check" size="md" />
  <ribble-icon name="user" color="blue" label="User profile" />
</template>
```

## Available Icons

### Status & Actions
check, x, plus, minus, arrow-up, arrow-down, arrow-left, arrow-right, chevron-up, chevron-down, chevron-left, chevron-right

### Communication
info, alert, success, error, question

### UI Elements
menu, menu-alt, dots, dots-vertical, search, filter, settings

### Files & Media
file, folder, image, download, upload

### Social & Communication
mail, phone, bell, star, heart, share

### User & Account
user, users, user-plus, login, logout

### Commerce
shopping-cart, shopping-bag, credit-card, tag

### Editing & Tools
edit, trash, copy, clipboard

### Time & Calendar
clock, calendar

### Lock & Security
lock, unlock, eye, eye-off

### Media Controls
play, pause, stop, refresh

### Layout & View
grid, list, layout, maximize, minimize

### Weather
sun, moon, cloud

## Adding Custom Icons

```typescript
import { Icon } from '@ribble-ui/core';

// Register custom icon
Icon.registerIcon('my-icon', '<path d="..."/>');

// Use it
<ribble-icon name="my-icon"></ribble-icon>
```

## Styling

```css
ribble-icon {
  --icon-size: 24px;
}

ribble-icon::part(svg) {
  transition: transform 0.2s;
}

ribble-icon::part(svg):hover {
  transform: scale(1.1);
}
```

## Accessibility

Always provide a `label` attribute for icons that convey meaning:

```html
<!-- Good -->
<ribble-icon name="trash" label="Delete item"></ribble-icon>

<!-- Decorative - no label needed -->
<ribble-icon name="check"></ribble-icon> Success
```

## Performance

Icons are rendered as inline SVG for optimal performance. Each icon is approximately 100-300 bytes.

## License

Icons are based on Heroicons design system (MIT License).
