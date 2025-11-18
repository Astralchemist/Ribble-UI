/**
 * Performance benchmarking utilities for Ribble UI components
 */

export interface BenchmarkResult {
  name: string;
  duration: number;
  memory?: number;
  iterations: number;
  opsPerSecond: number;
}

export interface BenchmarkOptions {
  iterations?: number;
  warmup?: number;
  name?: string;
}

/**
 * Benchmark a function's performance
 */
export async function benchmark(
  fn: () => void | Promise<void>,
  options: BenchmarkOptions = {}
): Promise<BenchmarkResult> {
  const {
    iterations = 1000,
    warmup = 100,
    name = 'Unnamed benchmark',
  } = options;

  // Warmup
  for (let i = 0; i < warmup; i++) {
    await fn();
  }

  // Force garbage collection if available
  if (global.gc) {
    global.gc();
  }

  // Measure memory before
  const memBefore = performance.memory?.usedJSHeapSize;

  // Run benchmark
  const startTime = performance.now();

  for (let i = 0; i < iterations; i++) {
    await fn();
  }

  const endTime = performance.now();
  const duration = endTime - startTime;

  // Measure memory after
  const memAfter = performance.memory?.usedJSHeapSize;
  const memory = memAfter && memBefore ? memAfter - memBefore : undefined;

  const opsPerSecond = (iterations / duration) * 1000;

  return {
    name,
    duration,
    memory,
    iterations,
    opsPerSecond,
  };
}

/**
 * Compare multiple benchmarks
 */
export async function compareBenchmarks(
  benchmarks: Array<{ name: string; fn: () => void | Promise<void> }>,
  options: BenchmarkOptions = {}
): Promise<BenchmarkResult[]> {
  const results: BenchmarkResult[] = [];

  for (const { name, fn } of benchmarks) {
    const result = await benchmark(fn, { ...options, name });
    results.push(result);
  }

  return results.sort((a, b) => b.opsPerSecond - a.opsPerSecond);
}

/**
 * Format benchmark results as a table
 */
export function formatResults(results: BenchmarkResult[]): string {
  const headers = ['Name', 'Duration (ms)', 'Ops/sec', 'Memory (bytes)'];
  const rows = results.map((r) => [
    r.name,
    r.duration.toFixed(2),
    r.opsPerSecond.toFixed(0),
    r.memory ? r.memory.toFixed(0) : 'N/A',
  ]);

  const colWidths = headers.map((header, i) =>
    Math.max(
      header.length,
      ...rows.map((row) => row[i].length)
    )
  );

  const separator = colWidths.map((w) => '-'.repeat(w + 2)).join('+');

  const formatRow = (row: string[]) =>
    row.map((cell, i) => cell.padEnd(colWidths[i])).join(' | ');

  return [
    formatRow(headers),
    separator,
    ...rows.map(formatRow),
  ].join('\n');
}

/**
 * Measure component render performance
 */
export async function measureRender(
  componentTag: string,
  props: Record<string, any> = {}
): Promise<number> {
  const container = document.createElement('div');
  document.body.appendChild(container);

  const startTime = performance.now();

  const element = document.createElement(componentTag);
  Object.entries(props).forEach(([key, value]) => {
    element.setAttribute(key, String(value));
  });

  container.appendChild(element);

  // Wait for component to be defined
  await customElements.whenDefined(componentTag);

  // Wait for next frame
  await new Promise((resolve) => requestAnimationFrame(resolve));

  const endTime = performance.now();

  // Cleanup
  document.body.removeChild(container);

  return endTime - startTime;
}

/**
 * Measure paint performance
 */
export function measurePaint(): Promise<PerformanceEntry[]> {
  return new Promise((resolve) => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      observer.disconnect();
      resolve(entries);
    });

    observer.observe({ entryTypes: ['paint'] });
  });
}

/**
 * Get Core Web Vitals
 */
export interface CoreWebVitals {
  LCP?: number; // Largest Contentful Paint
  FID?: number; // First Input Delay
  CLS?: number; // Cumulative Layout Shift
}

export function getCoreWebVitals(): Promise<CoreWebVitals> {
  return new Promise((resolve) => {
    const vitals: CoreWebVitals = {};

    // LCP
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as any;
      vitals.LCP = lastEntry.renderTime || lastEntry.loadTime;
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // FID
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        vitals.FID = entry.processingStart - entry.startTime;
      });
    }).observe({ entryTypes: ['first-input'] });

    // CLS
    let clsScore = 0;
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsScore += entry.value;
          vitals.CLS = clsScore;
        }
      });
    }).observe({ entryTypes: ['layout-shift'] });

    // Resolve after a reasonable time
    setTimeout(() => resolve(vitals), 5000);
  });
}

/**
 * Measure bundle size impact
 */
export function measureBundleSize(componentName: string): number {
  const scripts = Array.from(document.scripts);
  const componentScript = scripts.find((s) =>
    s.src.includes(componentName.toLowerCase())
  );

  if (componentScript) {
    const response = fetch(componentScript.src);
    return response.then((r) => {
      const size = parseInt(r.headers.get('Content-Length') || '0');
      return size;
    }) as any;
  }

  return 0;
}
