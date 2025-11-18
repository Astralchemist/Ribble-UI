# Migration Guide: v1.x to v2.0

This guide will help you migrate from Ribble UI v1.x to v2.0.

## Breaking Changes

### 1. Component Naming

Several components have been renamed for consistency:

```diff
- <ui-button>        → <ribble-button>
- <ui-input>         → <ribble-input>
- <ui-modal>         → <ribble-modal>
```

**Migration:**
```bash
# Use find and replace in your codebase
find ./src -type f -name "*.tsx" -o -name "*.html" | xargs sed -i 's/<ui-button>/<ribble-button>/g'
```

### 2. Import Paths

Import paths have been restructured:

```diff
- import { Button } from '@ribble-ui/components';
+ import { Button } from '@ribble-ui/react';

- import '@ribble-ui/styles/index.css';
+ import '@ribble-ui/core/dist/index.css';
```

### 3. Design Tokens

CSS custom property names have changed:

```diff
- --primary-color     → --color-primary
- --text-size-md      → --font-size-md
- --space-4           → --spacing-4
- --border-radius     → --radius-md
```

**Migration:**
```css
/* Before */
.my-component {
  color: var(--primary-color);
  font-size: var(--text-size-md);
  padding: var(--space-4);
}

/* After */
.my-component {
  color: var(--color-primary);
  font-size: var(--font-size-md);
  padding: var(--spacing-4);
}
```

### 4. Event Names

Events are now more consistent:

```diff
- onChange           → onInput
- onOpen             → onOpen (unchanged)
- onClose            → onClose (unchanged)
```

**React Migration:**
```diff
- <Input onChange={handleChange} />
+ <Input onInput={handleChange} />
```

### 5. Props Changes

#### Button Component

```diff
- <Button color="primary">
+ <Button variant="primary">

- <Button size="md">
+ <Button size="medium">
```

#### Input Component

```diff
- <Input error="Error message">
+ <Input error errorMessage="Error message">
```

#### Modal Component

```diff
- <Modal visible={true}>
+ <Modal open={true}>

- <Modal onDismiss={handleClose}>
+ <Modal onClose={handleClose}>
```

### 6. Removed Components

The following components have been removed:

- `<ribble-legacy-button>` - Use `<ribble-button>` instead
- `<ribble-dropdown>` - Use `<ribble-menu>` instead
- `<ribble-notification>` - Use `<ribble-toast>` instead

### 7. Theme API Changes

```diff
- import { setTheme } from '@ribble-ui/theming';
- setTheme('dark');
+ import { ThemeProvider } from '@ribble-ui/core';
+ const provider = new ThemeProvider();
+ provider.setTheme('dark');
```

## New Features in v2.0

### 1. Form Component

New form wrapper with built-in validation:

```tsx
<Form schema={{
  email: { required: true, email: true },
  password: { required: true, minLength: 8 }
}}>
  <Input name="email" label="Email" />
  <Input name="password" label="Password" type="password" />
  <Button type="submit">Submit</Button>
</Form>
```

### 2. Drawer Component

New slide-in panel component:

```tsx
<Drawer open={isOpen} position="right" overlay>
  <h2 slot="header">Navigation</h2>
  <nav>...</nav>
</Drawer>
```

### 3. Icon System

100+ built-in icons:

```tsx
<Icon name="check" size="md" />
<Icon name="user" color="#3b82f6" />
```

### 4. Toast System

Improved notification system:

```tsx
import { showToast } from '@ribble-ui/react';

showToast({
  message: 'Success!',
  type: 'success',
  action: {
    label: 'Undo',
    handler: () => console.log('Undo'),
  },
});
```

### 5. Better TypeScript Support

All components now have full TypeScript definitions:

```tsx
import type { ButtonProps, InputProps } from '@ribble-ui/react';
```

## Step-by-Step Migration

### Step 1: Update Dependencies

```bash
# Remove old packages
npm uninstall @ribble-ui/components @ribble-ui/theming

# Install new packages
npm install @ribble-ui/react@^2.0.0 @ribble-ui/core@^2.0.0
```

### Step 2: Update Imports

```bash
# Find all imports
grep -r "@ribble-ui/components" src/

# Replace with new imports
# Manual: Update each import to use @ribble-ui/react or @ribble-ui/core
```

### Step 3: Update Component Tags

```bash
# Use sed or your IDE's find/replace
find src -type f \( -name "*.tsx" -o -name "*.jsx" \) -exec sed -i \
  -e 's/<ui-button>/<ribble-button>/g' \
  -e 's/<\/ui-button>/<\/ribble-button>/g' \
  -e 's/<ui-input>/<ribble-input>/g' \
  -e 's/<\/ui-input>/<\/ribble-input>/g' \
  {} +
```

### Step 4: Update CSS Custom Properties

Create a mapping file for automation:

```javascript
// scripts/migrate-tokens.js
const fs = require('fs');
const glob = require('glob');

const tokenMap = {
  '--primary-color': '--color-primary',
  '--text-size-md': '--font-size-md',
  '--space-4': '--spacing-4',
  // ... add more mappings
};

glob('src/**/*.css', (err, files) => {
  files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    Object.entries(tokenMap).forEach(([old, new]) => {
      content = content.replace(new RegExp(old, 'g'), new);
    });
    fs.writeFileSync(file, content);
  });
});
```

### Step 5: Update Props

Manual step - review each component usage:

```tsx
// Before
<Button color="primary" size="md">

// After
<Button variant="primary" size="medium">
```

### Step 6: Test

```bash
# Run your test suite
npm test

# Check TypeScript errors
npm run typecheck

# Build your app
npm run build
```

## Codemod Scripts

We provide automated migration scripts:

```bash
# Install codemod
npx @ribble-ui/codemod v2

# Run migration
npx @ribble-ui/codemod v2 --path=./src

# Dry run (preview changes)
npx @ribble-ui/codemod v2 --path=./src --dry-run
```

## Common Issues

### Issue: CSS not loading

**Solution:** Update CSS import path

```diff
- import '@ribble-ui/components/dist/style.css';
+ import '@ribble-ui/core/dist/index.css';
```

### Issue: TypeScript errors

**Solution:** Update type imports

```diff
- import { ButtonProps } from '@ribble-ui/components';
+ import type { ButtonProps } from '@ribble-ui/react';
```

### Issue: Events not firing

**Solution:** Check event name changes

```diff
- <Input onChange={handler} />
+ <Input onInput={handler} />
```

## Getting Help

- [GitHub Discussions](https://github.com/Astralchemist/Ribble-UI/discussions)
- [Discord Community](https://discord.gg/ribble-ui)
- [Migration FAQ](https://ribble-ui.dev/migration-faq)

## Timeline

- **v1.x End of Life:** December 31, 2025
- **v2.0 Support:** Active
- **v2.x LTS:** Until December 31, 2027
