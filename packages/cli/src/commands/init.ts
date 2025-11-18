import prompts from 'prompts';
import { execaCommand } from 'execa';
import ora from 'ora';
import path from 'path';
import { logger } from '../utils/logger.js';
import { detectPackageManager, getInstallCommand } from '../utils/packageManager.js';
import { writeFile, writeJson, ensureDir } from '../utils/files.js';

type Framework = 'react' | 'vue' | 'svelte' | 'angular' | 'vanilla';

interface InitOptions {
  framework?: Framework;
  typescript?: boolean;
  skipInstall?: boolean;
}

const FRAMEWORK_PACKAGES: Record<Framework, string[]> = {
  react: ['@ribble-ui/core', '@ribble-ui/react'],
  vue: ['@ribble-ui/core', '@ribble-ui/vue'],
  svelte: ['@ribble-ui/core', '@ribble-ui/svelte'],
  angular: ['@ribble-ui/core', '@ribble-ui/angular'],
  vanilla: ['@ribble-ui/core']
};

export async function initCommand(options: InitOptions) {
  logger.title('🎨 Initialize Ribble UI Project');

  const cwd = process.cwd();

  // Prompt for framework if not provided
  let framework = options.framework;
  if (!framework) {
    const response = await prompts({
      type: 'select',
      name: 'framework',
      message: 'Which framework are you using?',
      choices: [
        { title: 'React', value: 'react' },
        { title: 'Vue 3', value: 'vue' },
        { title: 'Svelte', value: 'svelte' },
        { title: 'Angular', value: 'angular' },
        { title: 'Vanilla JS/TS', value: 'vanilla' }
      ],
      initial: 0
    });

    if (!response.framework) {
      logger.error('Framework selection is required');
      process.exit(1);
    }

    framework = response.framework;
  }

  // Prompt for TypeScript if not provided
  let useTypeScript = options.typescript;
  if (useTypeScript === undefined) {
    const response = await prompts({
      type: 'confirm',
      name: 'typescript',
      message: 'Use TypeScript?',
      initial: true
    });

    useTypeScript = response.typescript;
  }

  const selectedFramework = framework!;
  logger.step(`Setting up Ribble UI with ${selectedFramework} ${useTypeScript ? '+ TypeScript' : ''}`);

  // Create ribble.config file
  const config = {
    framework: selectedFramework,
    typescript: useTypeScript,
    theme: {
      directory: './src/theme',
      format: 'css'
    },
    components: {
      directory: './src/components'
    }
  };

  const configPath = path.join(cwd, 'ribble.config.json');
  await writeJson(configPath, config);
  logger.success(`Created ribble.config.json`);

  // Create theme directory structure
  const themeDir = path.join(cwd, 'src', 'theme');
  await ensureDir(themeDir);

  // Create initial theme file
  const themeContent = `/* Ribble UI Theme Configuration */
@import '@ribble-ui/core/styles/tokens.css';

:root {
  /* Your custom theme overrides go here */
  /* Example: */
  /* --ribble-color-primary: #6366f1; */
  /* --ribble-color-secondary: #8b5cf6; */
}

[data-theme="dark"] {
  /* Dark theme overrides */
}
`;

  await writeFile(path.join(themeDir, 'index.css'), themeContent);
  logger.success('Created theme directory');

  // Create setup guide
  const setupGuide = generateSetupGuide(selectedFramework, useTypeScript!);
  await writeFile(path.join(cwd, 'RIBBLE_SETUP.md'), setupGuide);
  logger.success('Created setup guide');

  // Install packages
  if (!options.skipInstall) {
    const spinner = ora('Installing Ribble UI packages...').start();

    try {
      const pm = await detectPackageManager(cwd);
      const packages = FRAMEWORK_PACKAGES[selectedFramework];
      const installCmd = getInstallCommand(pm, packages);

      await execaCommand(installCmd, { cwd, stdio: 'pipe' });

      spinner.succeed(`Installed ${packages.join(', ')}`);
    } catch (error) {
      spinner.fail('Installation failed');
      logger.error(error instanceof Error ? error.message : String(error));
      logger.info('You can manually install with: npm install @ribble-ui/core @ribble-ui/' + selectedFramework);
    }
  }

  logger.nl();
  logger.success('Ribble UI initialized successfully! 🎉');
  logger.nl();
  logger.info('Next steps:');
  logger.info('  1. Import Ribble UI components in your app');
  logger.info('  2. Import the theme: import "./theme/index.css"');
  logger.info('  3. Start building with Ribble UI components!');
  logger.nl();
  logger.info('Check RIBBLE_SETUP.md for detailed setup instructions');
  logger.nl();
}

function generateSetupGuide(framework: Framework, typescript: boolean): string {
  const ext = typescript ? 'ts' : 'js';
  const jsxExt = typescript ? 'tsx' : 'jsx';

  const guides: Record<Framework, string> = {
    react: `# Ribble UI Setup Guide - React ${typescript ? '+ TypeScript' : ''}

## Installation

Ribble UI has been configured for your React project.

## Usage

### 1. Import the theme in your app entry point

\`\`\`${jsxExt}
// src/main.${jsxExt} or src/index.${jsxExt}
import './theme/index.css';
\`\`\`

### 2. Import and use components

\`\`\`${jsxExt}
import { Button, Input, Modal } from '@ribble-ui/react';

function App() {
  return (
    <div>
      <Button variant="primary">Click me</Button>
      <Input placeholder="Enter text..." />
    </div>
  );
}
\`\`\`

### 3. Theme Configuration

Customize your theme in \`src/theme/index.css\`:

\`\`\`css
:root {
  --ribble-color-primary: #6366f1;
  --ribble-color-secondary: #8b5cf6;
}
\`\`\`

## Available Commands

- \`ribble add <component>\` - Add more components
- \`ribble tokens build\` - Rebuild theme tokens
- \`ribble theme --export css\` - Export theme

## Documentation

- [Component Reference](https://github.com/Astralchemist/Ribble-UI/blob/main/COMPONENTS.md)
- [Theming Guide](https://github.com/Astralchemist/Ribble-UI/blob/main/docs/theming/README.md)
- [Examples](https://github.com/Astralchemist/Ribble-UI/blob/main/docs/examples/react.md)
`,

    vue: `# Ribble UI Setup Guide - Vue 3 ${typescript ? '+ TypeScript' : ''}

## Installation

Ribble UI has been configured for your Vue 3 project.

## Usage

### 1. Import the theme in your app entry point

\`\`\`${ext}
// src/main.${ext}
import './theme/index.css';
\`\`\`

### 2. Import and use components

\`\`\`vue
<script setup${typescript ? ' lang="ts"' : ''}>
import { Button, Input } from '@ribble-ui/vue';
</script>

<template>
  <div>
    <Button variant="primary">Click me</Button>
    <Input placeholder="Enter text..." />
  </div>
</template>
\`\`\`

### 3. Theme Configuration

Customize your theme in \`src/theme/index.css\`.

## Documentation

- [Component Reference](https://github.com/Astralchemist/Ribble-UI/blob/main/COMPONENTS.md)
- [Theming Guide](https://github.com/Astralchemist/Ribble-UI/blob/main/docs/theming/README.md)
`,

    svelte: `# Ribble UI Setup Guide - Svelte ${typescript ? '+ TypeScript' : ''}

## Installation

Ribble UI has been configured for your Svelte project.

## Usage

### 1. Import the theme in your app entry point

\`\`\`${ext}
// src/main.${ext}
import './theme/index.css';
\`\`\`

### 2. Import and use components

\`\`\`svelte
<script${typescript ? ' lang="ts"' : ''}>
  import { Button, Input } from '@ribble-ui/svelte';
</script>

<Button variant="primary">Click me</Button>
<Input placeholder="Enter text..." />
\`\`\`

### 3. Theme Configuration

Customize your theme in \`src/theme/index.css\`.

## Documentation

- [Component Reference](https://github.com/Astralchemist/Ribble-UI/blob/main/COMPONENTS.md)
- [Theming Guide](https://github.com/Astralchemist/Ribble-UI/blob/main/docs/theming/README.md)
`,

    angular: `# Ribble UI Setup Guide - Angular ${typescript ? '+ TypeScript' : ''}

## Installation

Ribble UI has been configured for your Angular project.

## Usage

### 1. Import the theme in your global styles

\`\`\`scss
// src/styles.scss
@import './theme/index.css';
\`\`\`

### 2. Import the module in your app module

\`\`\`typescript
// src/app/app.module.ts
import { RibbleUIModule } from '@ribble-ui/angular';

@NgModule({
  imports: [RibbleUIModule],
})
export class AppModule {}
\`\`\`

### 3. Use components in templates

\`\`\`html
<ribble-button variant="primary">Click me</ribble-button>
<ribble-input placeholder="Enter text..."></ribble-input>
\`\`\`

## Documentation

- [Component Reference](https://github.com/Astralchemist/Ribble-UI/blob/main/COMPONENTS.md)
- [Theming Guide](https://github.com/Astralchemist/Ribble-UI/blob/main/docs/theming/README.md)
`,

    vanilla: `# Ribble UI Setup Guide - Vanilla JS ${typescript ? '+ TypeScript' : ''}

## Installation

Ribble UI has been configured for your project.

## Usage

### 1. Import the theme and components

\`\`\`${ext}
import '@ribble-ui/core/styles/tokens.css';
import './theme/index.css';
import { defineCustomElements } from '@ribble-ui/core';

defineCustomElements();
\`\`\`

### 2. Use components in HTML

\`\`\`html
<ribble-button variant="primary">Click me</ribble-button>
<ribble-input placeholder="Enter text..."></ribble-input>
\`\`\`

### 3. Theme Configuration

Customize your theme in \`src/theme/index.css\`.

## Documentation

- [Component Reference](https://github.com/Astralchemist/Ribble-UI/blob/main/COMPONENTS.md)
- [Theming Guide](https://github.com/Astralchemist/Ribble-UI/blob/main/docs/theming/README.md)
`
  };

  return guides[framework];
}
