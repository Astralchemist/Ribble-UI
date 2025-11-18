# Ribble UI - Marketing Landing Page

A comprehensive, modern marketing landing page for Ribble UI built with React, TypeScript, and Vite.

## Features

- **Modern Design**: Clean, professional UI with gradient aesthetics and micro-interactions
- **Responsive**: Fully responsive design that works on all devices
- **Dark Mode**: Built-in dark mode toggle with persistent preferences
- **Animated**: Smooth animations using Framer Motion
- **Interactive**: Live component demos and interactive playground
- **Performance Optimized**: Code splitting, lazy loading, and optimized bundle size
- **SEO Friendly**: Proper meta tags and semantic HTML
- **Accessible**: WCAG compliant with keyboard navigation support

## Sections

1. **Hero** - Animated gradient background with key stats
2. **Features** - Showcase of 9 key features with icons
3. **Component Demo** - Interactive component playground
4. **Performance Metrics** - Animated metrics and comparison chart
5. **Framework Comparison** - Support matrix for all frameworks
6. **Code Examples** - Syntax-highlighted code examples with copy buttons
7. **Template Showcase** - Production-ready template previews
8. **Getting Started** - 4-step quick start guide
9. **Footer** - Links, social media, and resources

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animations
- **React Syntax Highlighter** - Code highlighting
- **Lucide React** - Icon library
- **React Intersection Observer** - Scroll animations

## Getting Started

### Installation

```bash
cd apps/landing-page
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the landing page.

### Build

```bash
npm run build
```

The build output will be in the `dist` directory.

### Preview

```bash
npm run preview
```

## Project Structure

```
landing-page/
├── src/
│   ├── components/          # Reusable components
│   │   └── Navigation.tsx   # Main navigation with dark mode
│   ├── sections/            # Page sections
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── ComponentDemo.tsx
│   │   ├── PerformanceMetrics.tsx
│   │   ├── FrameworkComparison.tsx
│   │   ├── CodeExamples.tsx
│   │   ├── TemplateShowcase.tsx
│   │   ├── GettingStarted.tsx
│   │   └── Footer.tsx
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── index.html               # HTML template
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## Customization

### Colors

Edit the color palette in `tailwind.config.js`:

```js
colors: {
  primary: { /* your colors */ },
  accent: { /* your colors */ },
}
```

### Content

- Update meta tags in `index.html`
- Modify section content in `src/sections/`
- Customize navigation links in `src/components/Navigation.tsx`

### Features

Add or remove features in `src/sections/Features.tsx`:

```tsx
const features = [
  {
    icon: YourIcon,
    title: 'Feature Name',
    description: 'Feature description',
    gradient: 'from-color-500 to-color-500',
  },
  // ...
];
```

## Performance

- **Bundle Size**: Optimized with code splitting
- **Lazy Loading**: Components loaded on demand
- **Image Optimization**: Using modern formats
- **Code Splitting**: Vendor chunks separated
- **Tree Shaking**: Unused code eliminated

## Deployment

### Vercel

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Deploy the dist folder
```

### GitHub Pages

```bash
npm run build
# Deploy dist folder to gh-pages branch
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - see LICENSE file for details

## Contributing

Contributions are welcome! Please read the contributing guidelines first.

---

Made with ❤️ by the Ribble UI team
