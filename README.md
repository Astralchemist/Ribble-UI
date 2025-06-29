# Ribble UI

A modern, framework-agnostic UI component library and design system for building beautiful, accessible, and consistent user interfaces across web applications.

---

## ✨ Features

- **Web Components**: Core UI elements built as standard Web Components in TypeScript
- **Framework Adapters**: First-class support for React, Vue, Svelte, and Angular
- **Design Tokens**: Centralized, themeable tokens for color, typography, spacing, and more
- **Theming**: Light/dark mode, brand customization, and responsive design out of the box
- **CLI Tools**: Automate scaffolding, building, and documentation
- **Type Safety**: Fully typed APIs and tokens for robust development
- **Accessible by Design**: ARIA, keyboard navigation, and focus management baked in
- **Monorepo**: Managed with pnpm workspaces for easy development and contribution

---

## 🚀 Quick Start

1. **Install dependencies:**
   ```sh
   pnpm install
   ```
2. **Start the development server (core package):**
   ```sh
   pnpm dev
   ```
3. **Explore the playground:**
   ```sh
   pnpm --filter @ribble-ui/playground dev
   ```

---

## 📦 Monorepo Structure

- `packages/core` – Web Components & design tokens
- `packages/react` – React adapter
- `packages/vue` – Vue adapter
- `packages/svelte` – Svelte adapter
- `packages/angular` – Angular adapter
- `packages/cli` – CLI tool
- `docs` – Documentation site (Storybook, guides)
- `packages/configs` – Shared configs
- `packages/testing` – Testing utilities

---

## 🧩 Example: Using a Button

```tsx
import { MyButton } from '@ribble-ui/core';

<MyButton label="Click me!" />;
```

Or with React:

```tsx
import { Button } from '@ribble-ui/react';

<Button>Click me!</Button>;
```

---

## 🎨 Design Tokens

- **Color**: Light/dark, semantic, and brand palettes
- **Typography**: Fluid, responsive font scales
- **Spacing**: Modular, consistent spacing system
- **Radius, Shadow, Animation, Breakpoints, Z-Index**: All customizable and type-safe

---

## 🛠️ Contributing

We welcome contributions! Please see the [CONTRIBUTING.md](CONTRIBUTING.md) (or open an issue/PR) for guidelines.

- Fork and clone the repo
- Create a new branch for your feature or fix
- Run tests and build locally
- Submit a pull request

---

## 📖 Documentation

- See the `docs/` directory for guides, usage, and Storybook
- Each package contains its own README for details

---

## 🏆 Vision

Ribble UI aims to be the most flexible, accessible, and modern UI toolkit for web apps—empowering teams to build consistent, beautiful products at scale.

---

© 2024 Ribble UI. MIT License.
