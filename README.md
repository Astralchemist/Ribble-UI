<!-- Badges -->

[![npm version](https://img.shields.io/npm/v/@ribble-ui/core?style=flat-square)](https://www.npmjs.com/package/@ribble-ui/core)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen?style=flat-square)](#)

# Ribble UI

A modern, framework-agnostic UI component library and design system for building beautiful, accessible, and consistent user interfaces across web applications.

---

## 📚 Table of Contents

- [Features](#-features)
- [Quick Start](#-quick-start)
- [Monorepo Structure](#-monorepo-structure)
- [Example: Using a Button](#-example-using-a-button)
- [Design Tokens](#-design-tokens)
- [Contributing](#-contributing)
- [Documentation](#-documentation)
- [Community](#-community)
- [FAQ](#-faq)
- [Vision](#-vision)

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

### Framework-specific Usage

#### React

```sh
pnpm add @ribble-ui/react
```

```tsx
import { Button } from '@ribble-ui/react';
<Button>Click me!</Button>;
```

#### Vue

```sh
pnpm add @ribble-ui/vue
```

```vue
<template>
  <Button>Click me!</Button>
</template>
<script setup>
import { Button } from '@ribble-ui/vue';
</script>
```

#### Svelte

```sh
pnpm add @ribble-ui/svelte
```

```svelte
<script>
  import { Button } from '@ribble-ui/svelte';
</script>
<Button>Click me!</Button>
```

#### Angular

```sh
pnpm add @ribble-ui/angular
```

```ts
import { MyButton } from '@ribble-ui/angular';
// ... use <my-button label="Click me!"></my-button> in templates
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

## 🧩 Usage Examples

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

We welcome contributions! **Note:** A `CONTRIBUTING.md` should be created for detailed guidelines.

- Fork and clone the repo
- Create a new branch for your feature or fix
- Run tests and build locally
- Submit a pull request

Please follow our code style and commit conventions. If you have questions, open an issue or discussion.

---

## 📖 Documentation

- See the `docs/` directory for guides, usage, and Storybook
- Each package contains its own README for details

## 🌐 Community

- [GitHub Issues](https://github.com/your-org/ui-kit/issues) — Bug reports & feature requests
- [Discussions](https://github.com/your-org/ui-kit/discussions) — Q&A, ideas, and feedback
- [Discord](https://discord.gg/your-invite) — Chat with the team and community

---

## ❓ FAQ

**Q: Is Ribble UI production-ready?**
A: Yes, but we recommend testing in your environment before deploying at scale.

**Q: Can I use Ribble UI with other frameworks?**
A: Yes! Core components are Web Components, so you can use them anywhere.

**Q: How do I customize themes?**
A: See the [docs/design-tokens/usage.md](docs/design-tokens/usage.md) for theming instructions.

---

## 🏆 Vision

Ribble UI aims to be the most flexible, accessible, and modern UI toolkit for web apps—empowering teams to build consistent, beautiful products at scale.

**Roadmap:** See [GitHub Projects](https://github.com/your-org/ui-kit/projects) for upcoming features and plans.

---

© 2024 Ribble UI. MIT License.
