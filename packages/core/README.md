# Core Web Components

This package contains the core UI Kit components implemented as framework-agnostic Web Components using TypeScript.

## Usage

Import and use the components in any supported framework via the adapters.

# Core Design Tokens

This package contains the design tokens for the UI Kit, including color, typography, spacing, radius, shadow, animation, breakpoints, and z-index. Tokens are exported in multiple formats for use in any framework.

## Usage

- Import tokens from `@ui-kit/core` in your project.
- Use CSS custom properties, SCSS variables, or JS/JSON exports as needed.

## Token Categories

- **Color:** Semantic and palette tokens for light/dark themes
- **Typography:** Fluid font sizes, line heights, weights
- **Spacing:** Modular scale (4px, 8px, 16px, ...)
- **Radius:** Consistent border radii
- **Shadow:** Elevation levels
- **Animation:** Duration, easing, transforms
- **Breakpoints:** Responsive design
- **Z-Index:** Layering system

## Naming Conventions

- Use semantic names for UI roles (e.g., `primary`, `error`)
- Use scale-based names for sizes (e.g., `md`, `lg`, `xl`)

## Theming

- Light and dark theme variants are provided in `tokens/color/`

## Validation & Type Safety

- All tokens are validated and typed with TypeScript.

## Extending

- Add new tokens to the appropriate file in `src/tokens/`.
- Do **not** add components to the tokens directory.
