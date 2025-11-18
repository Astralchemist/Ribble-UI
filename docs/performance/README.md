# Performance Guide

Best practices and tools for optimizing Ribble UI performance.

## Bundle Size Optimization

### Tree Shaking

Ribble UI supports tree shaking out of the box. Import only what you need:

```typescript
// ✅ Good - Tree shakeable
import { Button, Input } from '@ribble-ui/react';

// ❌ Bad - Imports everything
import * as RibbleUI from '@ribble-ui/react';
```

### Lazy Loading Components

Load components only when needed:

```typescript
import { lazyLoadComponent } from '@ribble-ui/core';

// Register lazy component
lazyLoadComponent('ribble-modal', () =>
  import('@ribble-ui/core/components/Modal')
);

// Use lazy version
<lazy-ribble-modal open={isOpen}>
  <p>Modal content</p>
</lazy-ribble-modal>
```

### Code Splitting by Route

```typescript
// React Router example
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  );
}
```

## Runtime Performance

### Avoid Unnecessary Re-renders

```tsx
import { memo } from 'react';
import { Button } from '@ribble-ui/react';

// Memoize components
const MemoizedButton = memo(Button);

function MyComponent() {
  return <MemoizedButton variant="primary">Click</MemoizedButton>;
}
```

### Virtualize Long Lists

```tsx
import { useVirtualizer } from '@tanstack/react-virtual';
import { Card } from '@ribble-ui/react';

function VirtualList({ items }) {
  const parentRef = useRef();

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
  });

  return (
    <div ref={parentRef} style={{ height: '400px', overflow: 'auto' }}>
      {virtualizer.getVirtualItems().map((virtualItem) => (
        <Card key={virtualItem.key} style={{
          height: `${virtualItem.size}px`,
          transform: `translateY(${virtualItem.start}px)`,
        }}>
          {items[virtualItem.index]}
        </Card>
      ))}
    </div>
  );
}
```

### Debounce Input Handlers

```tsx
import { useMemo } from 'react';
import { debounce } from '@ribble-ui/utils';
import { Input } from '@ribble-ui/react';

function SearchInput() {
  const debouncedSearch = useMemo(
    () => debounce((value) => {
      // Perform search
    }, 300),
    []
  );

  return <Input onInput={(e) => debouncedSearch(e.target.value)} />;
}
```

## Performance Benchmarks

### Running Benchmarks

```bash
# Run all benchmarks
pnpm run benchmark

# Run specific component benchmark
pnpm run benchmark -- --component=button

# Compare components
pnpm run benchmark:compare
```

### Writing Custom Benchmarks

```typescript
import { benchmark, formatResults } from '@ribble-ui/utils/performance';

async function runButtonBenchmark() {
  const result = await benchmark(
    () => {
      const button = document.createElement('ribble-button');
      button.textContent = 'Click me';
      document.body.appendChild(button);
      button.remove();
    },
    { iterations: 1000, name: 'Button render' }
  );

  console.log(formatResults([result]));
}
```

## Core Web Vitals

### Measuring Vitals

```typescript
import { getCoreWebVitals } from '@ribble-ui/utils/performance';

async function measureVitals() {
  const vitals = await getCoreWebVitals();
  console.log('LCP:', vitals.LCP); // Largest Contentful Paint
  console.log('FID:', vitals.FID); // First Input Delay
  console.log('CLS:', vitals.CLS); // Cumulative Layout Shift
}
```

### Optimization Tips

**Largest Contentful Paint (LCP) - Target: < 2.5s**
- Lazy load images below the fold
- Preload critical assets
- Optimize server response time

**First Input Delay (FID) - Target: < 100ms**
- Minimize JavaScript execution time
- Use web workers for heavy computations
- Break up long tasks

**Cumulative Layout Shift (CLS) - Target: < 0.1**
- Set explicit sizes for images and iframes
- Avoid inserting content above existing content
- Use CSS Grid/Flexbox for stable layouts

## Production Optimizations

### Enable Production Mode

```typescript
// vite.config.ts
export default {
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
};
```

### CDN and Caching

```html
<!-- Use CDN for faster loading -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@ribble-ui/core/dist/index.css">
<script type="module" src="https://cdn.jsdelivr.net/npm/@ribble-ui/core/dist/index.esm.js"></script>

<!-- Set cache headers -->
<meta http-equiv="Cache-Control" content="public, max-age=31536000">
```

### Preload Critical Resources

```html
<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="@ribble-ui/core/dist/index.css" as="style">
```

## Monitoring

### Performance Observer

```typescript
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.duration > 50) {
      console.warn('Slow component:', entry.name, entry.duration);
    }
  }
});

observer.observe({ entryTypes: ['measure'] });
```

### Bundle Analysis

```bash
# Analyze bundle size
pnpm run size:analyze

# Visualize bundle
pnpm run build -- --analyze
```

## Best Practices Checklist

- [ ] Import only needed components
- [ ] Use lazy loading for large components
- [ ] Implement code splitting by route
- [ ] Debounce input handlers
- [ ] Virtualize long lists
- [ ] Optimize images (WebP, lazy loading)
- [ ] Enable production mode
- [ ] Use CDN for static assets
- [ ] Monitor Core Web Vitals
- [ ] Set bundle size budgets
- [ ] Minimize CSS
- [ ] Remove unused code

## Performance Targets

| Metric | Target | Good | Needs Improvement |
|--------|--------|------|-------------------|
| Bundle Size (gzipped) | < 50KB | < 100KB | > 100KB |
| LCP | < 2.5s | < 4s | > 4s |
| FID | < 100ms | < 300ms | > 300ms |
| CLS | < 0.1 | < 0.25 | > 0.25 |
| Time to Interactive | < 3.8s | < 7.3s | > 7.3s |
| First Contentful Paint | < 1.8s | < 3s | > 3s |
