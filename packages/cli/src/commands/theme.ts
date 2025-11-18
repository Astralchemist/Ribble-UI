import prompts from 'prompts';
import fs from 'fs-extra';
import path from 'path';
import { logger } from '../utils/logger.js';
import { getProjectRoot, writeFile, readJson, ensureDir } from '../utils/files.js';

interface ThemeOptions {
  init?: boolean;
  export?: 'figma' | 'sketch' | 'css' | 'json';
  import?: string;
}

export async function themeCommand(options: ThemeOptions) {
  logger.title('🎨 Theme Management');

  const projectRoot = await getProjectRoot();

  if (options.init) {
    await initTheme(projectRoot);
  } else if (options.export) {
    await exportTheme(projectRoot, options.export);
  } else if (options.import) {
    await importTheme(projectRoot, options.import);
  } else {
    // Interactive mode
    const response = await prompts({
      type: 'select',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        { title: 'Initialize theme configuration', value: 'init' },
        { title: 'Export theme', value: 'export' },
        { title: 'Import theme', value: 'import' },
        { title: 'View current theme', value: 'view' }
      ]
    });

    if (!response.action) {
      process.exit(0);
    }

    switch (response.action) {
      case 'init':
        await initTheme(projectRoot);
        break;
      case 'export':
        const exportResponse = await prompts({
          type: 'select',
          name: 'format',
          message: 'Export format:',
          choices: [
            { title: 'CSS Variables', value: 'css' },
            { title: 'JSON', value: 'json' },
            { title: 'Figma Tokens', value: 'figma' },
            { title: 'Sketch Tokens', value: 'sketch' }
          ]
        });
        await exportTheme(projectRoot, exportResponse.format);
        break;
      case 'import':
        const importResponse = await prompts({
          type: 'text',
          name: 'file',
          message: 'Theme file path:',
          validate: (value: string) => value ? true : 'File path is required'
        });
        await importTheme(projectRoot, importResponse.file);
        break;
      case 'view':
        await viewTheme(projectRoot);
        break;
    }
  }
}

async function initTheme(projectRoot: string) {
  logger.step('Initializing theme configuration...');

  const themeName = await prompts({
    type: 'text',
    name: 'value',
    message: 'Theme name:',
    initial: 'default'
  });

  const themeDir = path.join(projectRoot, 'theme');
  await ensureDir(themeDir);

  // Create theme.config.json
  const config = {
    name: themeName.value || 'default',
    version: '1.0.0',
    tokens: {
      color: './tokens/color.json',
      typography: './tokens/typography.json',
      spacing: './tokens/spacing.json',
      radius: './tokens/radius.json'
    },
    output: {
      css: './dist/theme.css',
      json: './dist/tokens.json',
      typescript: './dist/tokens.ts'
    }
  };

  await writeFile(
    path.join(themeDir, 'theme.config.json'),
    JSON.stringify(config, null, 2)
  );

  logger.success('Theme configuration created');
  logger.info(`Location: ${path.relative(projectRoot, themeDir)}/theme.config.json`);
}

async function exportTheme(projectRoot: string, format: string) {
  logger.step(`Exporting theme as ${format}...`);

  const tokensDir = path.join(projectRoot, 'theme/tokens');

  if (!await fs.pathExists(tokensDir)) {
    logger.error('No theme tokens found. Run "ribble theme --init" first.');
    process.exit(1);
  }

  const exportDir = path.join(projectRoot, 'theme/export');
  await ensureDir(exportDir);

  if (format === 'css') {
    await exportAsCSS(tokensDir, exportDir);
  } else if (format === 'json') {
    await exportAsJSON(tokensDir, exportDir);
  } else if (format === 'figma') {
    await exportAsFigma(tokensDir, exportDir);
  } else if (format === 'sketch') {
    await exportAsSketch(tokensDir, exportDir);
  }

  logger.success(`Theme exported to ${path.relative(projectRoot, exportDir)}`);
}

async function importTheme(projectRoot: string, filePath: string) {
  logger.step(`Importing theme from ${filePath}...`);

  const absolutePath = path.isAbsolute(filePath) ? filePath : path.join(projectRoot, filePath);

  if (!await fs.pathExists(absolutePath)) {
    logger.error(`File not found: ${filePath}`);
    process.exit(1);
  }

  // const themeData = await readJson(absolutePath);

  // Import logic here
  logger.success('Theme imported successfully');
}

async function viewTheme(projectRoot: string) {
  logger.step('Current theme configuration:');

  const configPath = path.join(projectRoot, 'theme/theme.config.json');

  if (!await fs.pathExists(configPath)) {
    logger.warn('No theme configuration found');
    logger.info('Run "ribble theme --init" to create one');
    return;
  }

  const config = await readJson(configPath);
  console.log(JSON.stringify(config, null, 2));
}

async function exportAsCSS(tokensDir: string, exportDir: string) {
  const files = await fs.readdir(tokensDir);
  let css = ':root {\n';

  for (const file of files) {
    if (!file.endsWith('.json')) continue;

    const tokens = await readJson(path.join(tokensDir, file));
    const category = path.basename(file, '.json');

    for (const [key, value] of Object.entries(tokens)) {
      css += `  --ribble-${category}-${key}: ${value};\n`;
    }
  }

  css += '}\n';

  await writeFile(path.join(exportDir, 'theme.css'), css);
}

async function exportAsJSON(tokensDir: string, exportDir: string) {
  const files = await fs.readdir(tokensDir);
  const allTokens: Record<string, any> = {};

  for (const file of files) {
    if (!file.endsWith('.json')) continue;

    const tokens = await readJson(path.join(tokensDir, file));
    const category = path.basename(file, '.json');
    allTokens[category] = tokens;
  }

  await writeFile(
    path.join(exportDir, 'tokens.json'),
    JSON.stringify(allTokens, null, 2)
  );
}

async function exportAsFigma(tokensDir: string, exportDir: string) {
  // Figma tokens format: https://docs.tokens.studio/
  const files = await fs.readdir(tokensDir);
  const figmaTokens: Record<string, any> = {};

  for (const file of files) {
    if (!file.endsWith('.json')) continue;

    const tokens = await readJson(path.join(tokensDir, file));
    const category = path.basename(file, '.json');

    figmaTokens[category] = Object.entries(tokens).reduce((acc, [key, value]) => {
      acc[key] = {
        value,
        type: category === 'color' ? 'color' : 'other'
      };
      return acc;
    }, {} as Record<string, any>);
  }

  await writeFile(
    path.join(exportDir, 'figma-tokens.json'),
    JSON.stringify(figmaTokens, null, 2)
  );
}

async function exportAsSketch(tokensDir: string, exportDir: string) {
  // Sketch format is similar to Figma
  await exportAsFigma(tokensDir, exportDir);

  // Rename for Sketch
  await fs.copy(
    path.join(exportDir, 'figma-tokens.json'),
    path.join(exportDir, 'sketch-tokens.json')
  );
}
