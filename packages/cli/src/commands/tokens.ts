import fs from 'fs-extra';
import path from 'path';
import ora from 'ora';
import { logger } from '../utils/logger.js';
import { getProjectRoot, ensureDir, writeFile } from '../utils/files.js';

interface TokensOptions {
  output?: string;
  format?: 'css' | 'json' | 'ts' | 'all';
  watch?: boolean;
}

interface DesignTokens {
  color?: Record<string, any>;
  typography?: Record<string, any>;
  spacing?: Record<string, any>;
  radius?: Record<string, any>;
  shadow?: Record<string, any>;
  animation?: Record<string, any>;
  breakpoint?: Record<string, any>;
  zIndex?: Record<string, any>;
}

export async function tokensCommand(options: TokensOptions) {
  logger.title('🎨 Build Design Tokens');

  const projectRoot = await getProjectRoot();
  const outputDir = path.join(projectRoot, options.output || './src/theme');
  const format = options.format || 'all';

  const spinner = ora('Reading design tokens...').start();

  // Look for token files in common locations
  const tokenLocations = [
    path.join(projectRoot, 'tokens'),
    path.join(projectRoot, 'src/tokens'),
    path.join(projectRoot, 'design-tokens'),
    path.join(projectRoot, 'theme/tokens')
  ];

  let tokensDir: string | null = null;
  for (const location of tokenLocations) {
    if (await fs.pathExists(location)) {
      tokensDir = location;
      break;
    }
  }

  if (!tokensDir) {
    spinner.fail('No tokens directory found');
    logger.warn('Creating default tokens in ./tokens');

    tokensDir = path.join(projectRoot, 'tokens');
    await ensureDir(tokensDir);
    await createDefaultTokens(tokensDir);
    spinner.succeed('Created default tokens');
  } else {
    spinner.succeed(`Found tokens in ${path.relative(projectRoot, tokensDir)}`);
  }

  // Read all token files
  const tokens = await readTokens(tokensDir);

  // Ensure output directory exists
  await ensureDir(outputDir);

  // Build tokens in requested format(s)
  if (format === 'all' || format === 'css') {
    await buildCSSTokens(tokens, outputDir);
    logger.success('Built CSS tokens');
  }

  if (format === 'all' || format === 'json') {
    await buildJSONTokens(tokens, outputDir);
    logger.success('Built JSON tokens');
  }

  if (format === 'all' || format === 'ts') {
    await buildTSTokens(tokens, outputDir);
    logger.success('Built TypeScript tokens');
  }

  logger.nl();
  logger.success('Design tokens built successfully! 🎉');
  logger.nl();
  logger.info(`Output directory: ${path.relative(projectRoot, outputDir)}`);

  if (options.watch) {
    logger.nl();
    logger.info('👀 Watching for token changes...');

    const chokidar = await import('chokidar');
    const watcher = chokidar.watch(tokensDir, {
      ignored: /(^|[\/\\])\../,
      persistent: true
    });

    watcher.on('change', async () => {
      logger.step('Tokens changed, rebuilding...');
      const tokens = await readTokens(tokensDir!);

      if (format === 'all' || format === 'css') {
        await buildCSSTokens(tokens, outputDir);
      }
      if (format === 'all' || format === 'json') {
        await buildJSONTokens(tokens, outputDir);
      }
      if (format === 'all' || format === 'ts') {
        await buildTSTokens(tokens, outputDir);
      }

      logger.success('Tokens rebuilt');
    });
  }
}

async function readTokens(tokensDir: string): Promise<DesignTokens> {
  const tokens: DesignTokens = {};
  const files = await fs.readdir(tokensDir);

  for (const file of files) {
    if (!file.endsWith('.json')) continue;

    const category = path.basename(file, '.json');
    const filePath = path.join(tokensDir, file);
    const data = await fs.readJson(filePath);

    tokens[category as keyof DesignTokens] = data;
  }

  return tokens;
}

async function buildCSSTokens(tokens: DesignTokens, outputDir: string) {
  let css = '/* Ribble UI Design Tokens - Auto-generated */\n\n:root {\n';

  for (const [category, values] of Object.entries(tokens)) {
    css += `  /* ${category} */\n`;
    css += flattenTokensToCSS(values, `ribble-${category}`);
    css += '\n';
  }

  css += '}\n';

  await writeFile(path.join(outputDir, 'tokens.css'), css);
}

async function buildJSONTokens(tokens: DesignTokens, outputDir: string) {
  const json = JSON.stringify(tokens, null, 2);
  await writeFile(path.join(outputDir, 'tokens.json'), json);
}

async function buildTSTokens(tokens: DesignTokens, outputDir: string) {
  let ts = '/* Ribble UI Design Tokens - Auto-generated */\n\n';

  ts += 'export const tokens = ' + JSON.stringify(tokens, null, 2) + ' as const;\n\n';

  // Generate type-safe token accessors
  ts += 'export type TokenCategory = keyof typeof tokens;\n';
  ts += 'export type TokenPath<T extends TokenCategory> = keyof typeof tokens[T];\n\n';

  ts += 'export function getToken<T extends TokenCategory>(\n';
  ts += '  category: T,\n';
  ts += '  path: TokenPath<T>\n';
  ts += '): any {\n';
  ts += '  return tokens[category][path];\n';
  ts += '}\n';

  await writeFile(path.join(outputDir, 'tokens.ts'), ts);
}

function flattenTokensToCSS(obj: any, prefix: string, indent: string = '  '): string {
  let css = '';

  for (const [key, value] of Object.entries(obj)) {
    const cssVar = `--${prefix}-${key}`;

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      css += flattenTokensToCSS(value, `${prefix}-${key}`, indent);
    } else {
      css += `${indent}${cssVar}: ${value};\n`;
    }
  }

  return css;
}

async function createDefaultTokens(tokensDir: string) {
  const defaultTokens = {
    color: {
      primary: '#6366f1',
      secondary: '#8b5cf6',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      neutral: {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827'
      }
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '3rem',
      '3xl': '4rem'
    },
    typography: {
      fontFamily: {
        sans: 'system-ui, -apple-system, sans-serif',
        mono: 'Monaco, Courier, monospace'
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem'
      }
    },
    radius: {
      none: '0',
      sm: '0.125rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      full: '9999px'
    }
  };

  for (const [category, data] of Object.entries(defaultTokens)) {
    await writeFile(
      path.join(tokensDir, `${category}.json`),
      JSON.stringify(data, null, 2)
    );
  }
}
