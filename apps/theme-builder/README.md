# Ribble UI Theme Builder

A production-ready visual theme editor for creating and customizing Ribble UI design tokens.

## Features

### 1. Token Editor
Visual controls for editing all design tokens:
- **Color Tokens**: Interactive color picker with hex input for all theme colors
- **Typography Tokens**: Font families, sizes, weights, and line heights
- **Spacing Tokens**: Consistent spacing scale (xs, sm, md, lg, xl, xxl)
- **Border Radius**: Corner radius tokens for different component sizes
- **Shadows**: Box shadow definitions for depth and elevation

### 2. Live Preview
Real-time preview of components using your theme:
- Buttons in all states (primary, secondary, success, warning, error, disabled)
- Form inputs (text, email, textarea, checkboxes)
- Cards with various content
- Alert components
- Modal dialogs
- Typography samples
- Spacing and border radius visualizations

### 3. Export Functionality
Export your custom theme in multiple formats:
- **CSS Variables**: Standard CSS custom properties
- **SCSS Variables**: Sass/SCSS variables for preprocessors
- **JSON**: Pure JSON format for easy importing/sharing
- **TypeScript**: Typed module with full type definitions
- **Figma Tokens**: Compatible with Figma design tokens plugins

### 4. Preset Themes
Pre-designed themes to get started quickly:
- **Default**: Ribble UI's default styling
- **Dark Mode**: Optimized for low-light environments
- **Ocean**: Blue/teal theme
- **Forest**: Green nature-inspired theme
- **Sunset**: Orange/red warm theme

### 5. Import/Export
- Import custom themes from JSON files
- Export themes to use across projects
- Automatic local storage persistence

## Getting Started

### Installation

```bash
cd apps/theme-builder
npm install
```

### Development

```bash
npm run dev
```

The app will open at `http://localhost:3001`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
apps/theme-builder/
├── src/
│   ├── App.tsx                 # Main app component with tabbed interface
│   ├── main.tsx                # Application entry point
│   ├── components/
│   │   ├── TokenEditor.tsx     # Visual token editing interface
│   │   ├── LivePreview.tsx     # Live component previews
│   │   ├── ExportPanel.tsx     # Export to multiple formats
│   │   ├── PresetThemes.tsx    # Preset theme selector
│   │   └── CodePreview.tsx     # Code preview with syntax highlighting
│   ├── hooks/
│   │   └── useTokens.ts        # Token state management hook
│   ├── utils/
│   │   ├── tokenGenerator.ts   # Generate code in various formats
│   │   └── presets.ts          # Preset theme definitions
│   └── styles/
│       └── app.css             # Application styles
├── index.html
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
└── package.json
```

## Usage Guide

### Creating a Custom Theme

1. **Start with a Preset**: Navigate to the "Presets" tab and load a theme that's close to your desired design
2. **Customize Tokens**: Go to "Edit Tokens" and adjust colors, typography, spacing, etc.
3. **Preview Changes**: Switch to "Live Preview" to see how components look with your theme
4. **Export Theme**: Use the "Export" tab to download your theme in your preferred format

### Importing a Theme

1. Go to the "Export" tab
2. Click "Import JSON File"
3. Select a JSON file containing theme tokens
4. Your theme will be loaded automatically

### Using Exported Themes

#### CSS Variables
```css
/* Import the generated CSS file */
@import 'ribble-ui-theme.css';

/* Use in your styles */
.my-button {
  background: var(--color-primary);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
}
```

#### TypeScript
```typescript
import theme from './ribble-ui-theme';

// Access tokens
const primaryColor = theme.colors.primary;
const baseFontSize = theme.typography.fontSizeBase;
```

#### Figma Tokens
1. Install a Figma tokens plugin
2. Import the generated `.figma.json` file
3. Sync tokens with your Figma designs

## Technology Stack

- **React 18**: Modern React with hooks
- **TypeScript**: Full type safety
- **Vite**: Fast build tool and dev server
- **react-colorful**: Color picker component
- **file-saver**: File download functionality

## Features in Detail

### Token Editor
- Color picker with visual swatch and hex input
- Number inputs for spacing and font sizes
- Text inputs for font families and shadows
- Real-time preview updates
- All changes auto-saved to local storage

### Live Preview
- Comprehensive component showcase
- Interactive elements (modal, buttons)
- Typography scale visualization
- Spacing and border radius demonstrations
- All components styled with current tokens

### Export Panel
- Multiple format support
- Copy to clipboard functionality
- Download as file
- Format-specific documentation
- Import validation

### Preset Themes
- Visual preview cards
- Color palette display
- Quick-load functionality
- Detailed token information
- Usage tips and best practices

## Local Storage

The Theme Builder automatically saves your changes to browser local storage under the key `ribble-ui-theme-tokens`. This means:
- Your theme persists across sessions
- No server or database needed
- Works completely offline
- Can be reset with the "Reset Theme" button

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)

## Development

### Type Safety
All components are fully typed with TypeScript. The `ThemeTokens` interface defines the structure:

```typescript
interface ThemeTokens {
  colors: { /* color tokens */ };
  typography: { /* typography tokens */ };
  spacing: { /* spacing tokens */ };
  borderRadius: { /* border radius tokens */ };
  shadows: { /* shadow tokens */ };
}
```

### Adding New Token Categories

1. Update the `ThemeTokens` interface in `utils/presets.ts`
2. Add update functions in `hooks/useTokens.ts`
3. Add editor controls in `components/TokenEditor.tsx`
4. Add preview examples in `components/LivePreview.tsx`
5. Update generators in `utils/tokenGenerator.ts`

## Contributing

This is part of the Ribble UI project. For contribution guidelines, see the main repository README.

## License

MIT License - see the main Ribble UI repository for details.
