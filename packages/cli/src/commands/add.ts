import prompts from 'prompts';
import fs from 'fs-extra';
import path from 'path';
import { logger } from '../utils/logger.js';
import { getProjectRoot, readJson, writeFile } from '../utils/files.js';

interface AddOptions {
  all?: boolean;
  examples?: boolean;
}

const AVAILABLE_COMPONENTS = [
  'button', 'input', 'checkbox', 'radio', 'select', 'textarea', 'switch', 'form',
  'card', 'container', 'divider', 'drawer', 'sidebar',
  'alert', 'modal', 'progress', 'spinner', 'toast', 'tooltip',
  'tabs', 'breadcrumbs', 'pagination', 'navbar', 'menu', 'dropdown',
  'badge', 'avatar', 'table', 'accordion', 'chip', 'tag', 'icon'
];

const COMPONENT_CATEGORIES = {
  'Form Components': ['button', 'input', 'checkbox', 'radio', 'select', 'textarea', 'switch', 'form'],
  'Layout Components': ['card', 'container', 'divider', 'drawer', 'sidebar'],
  'Feedback Components': ['alert', 'modal', 'progress', 'spinner', 'toast', 'tooltip'],
  'Navigation Components': ['tabs', 'breadcrumbs', 'pagination', 'navbar', 'menu', 'dropdown'],
  'Data Display Components': ['badge', 'avatar', 'table', 'accordion', 'chip', 'tag', 'icon']
};

export async function addCommand(components: string[], options: AddOptions) {
  logger.title('📦 Add Ribble UI Components');

  const projectRoot = await getProjectRoot();
  const configPath = path.join(projectRoot, 'ribble.config.json');

  let config: any = {};
  if (await fs.pathExists(configPath)) {
    config = await readJson(configPath);
  } else {
    logger.warn('No ribble.config.json found. Run "ribble init" first.');

    const response = await prompts({
      type: 'confirm',
      name: 'continue',
      message: 'Continue without configuration?',
      initial: false
    });

    if (!response.continue) {
      process.exit(0);
    }

    config = {
      framework: 'react',
      components: {
        directory: './src/components'
      }
    };
  }

  const framework = config.framework || 'react';
  let selectedComponents = components;

  // If --all flag is used
  if (options.all) {
    selectedComponents = AVAILABLE_COMPONENTS;
    logger.step(`Adding all ${AVAILABLE_COMPONENTS.length} components`);
  }
  // If no components specified, show interactive selection
  else if (!selectedComponents || selectedComponents.length === 0) {
    const response = await prompts({
      type: 'multiselect',
      name: 'components',
      message: 'Select components to add:',
      choices: Object.entries(COMPONENT_CATEGORIES).flatMap(([category, comps]) => [
        { title: `--- ${category} ---`, value: '', disabled: true },
        ...comps.map(comp => ({ title: comp, value: comp }))
      ]),
      min: 1
    });

    if (!response.components || response.components.length === 0) {
      logger.error('No components selected');
      process.exit(1);
    }

    selectedComponents = response.components.filter((c: string) => c !== '');
  }

  // Validate components
  const invalidComponents = selectedComponents.filter(c => !AVAILABLE_COMPONENTS.includes(c));
  if (invalidComponents.length > 0) {
    logger.error(`Invalid components: ${invalidComponents.join(', ')}`);
    logger.info(`Available components: ${AVAILABLE_COMPONENTS.join(', ')}`);
    process.exit(1);
  }

  logger.step(`Adding ${selectedComponents.length} component(s) for ${framework}`);
  logger.nl();

  // Create components directory if it doesn't exist
  const componentsDir = path.join(projectRoot, config.components?.directory || './src/components');
  await fs.ensureDir(componentsDir);

  // Generate component usage files
  for (const component of selectedComponents) {
    await generateComponentUsageFile(component, framework, componentsDir, options.examples);
    logger.success(`Added ${component}`);
  }

  logger.nl();
  logger.success('Components added successfully! 🎉');
  logger.nl();
  logger.info('Import components in your code:');

  if (framework === 'react') {
    logger.info(`  import { ${selectedComponents.map(c => capitalize(c)).join(', ')} } from '@ribble-ui/react';`);
  } else if (framework === 'vue') {
    logger.info(`  import { ${selectedComponents.map(c => capitalize(c)).join(', ')} } from '@ribble-ui/vue';`);
  } else if (framework === 'svelte') {
    logger.info(`  import { ${selectedComponents.map(c => capitalize(c)).join(', ')} } from '@ribble-ui/svelte';`);
  } else {
    logger.info(`  import { defineCustomElements } from '@ribble-ui/core';`);
  }

  logger.nl();
}

async function generateComponentUsageFile(
  component: string,
  framework: string,
  outputDir: string,
  includeExamples: boolean = false
) {
  const componentName = capitalize(component);
  const fileName = `${componentName}.${framework === 'react' || framework === 'angular' ? 'tsx' : framework === 'vue' ? 'vue' : 'svelte'}`;
  const filePath = path.join(outputDir, fileName);

  // Don't overwrite existing files
  if (await fs.pathExists(filePath)) {
    return;
  }

  let content = '';

  if (framework === 'react') {
    content = generateReactExample(componentName, includeExamples);
  } else if (framework === 'vue') {
    content = generateVueExample(componentName, includeExamples);
  } else if (framework === 'svelte') {
    content = generateSvelteExample(componentName, includeExamples);
  } else if (framework === 'angular') {
    content = generateAngularExample(componentName, includeExamples);
  }

  if (content) {
    await writeFile(filePath, content);
  }
}

function generateReactExample(component: string, _includeExamples: boolean): string {
  const basic = `import { ${component} } from '@ribble-ui/react';

export function ${component}Example() {
  return (
    <${component}>
      Example ${component}
    </${component}>
  );
}
`;

  if (!_includeExamples) return basic;

  const examples: Record<string, string> = {
    Button: `import { Button } from '@ribble-ui/react';

export function ButtonExample() {
  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button disabled>Disabled</Button>
      <Button size="small">Small</Button>
      <Button size="large">Large</Button>
    </div>
  );
}
`,
    Input: `import { Input } from '@ribble-ui/react';
import { useState } from 'react';

export function InputExample() {
  const [value, setValue] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
      <Input
        placeholder="Enter text..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Input type="email" placeholder="Email address" />
      <Input type="password" placeholder="Password" />
      <Input disabled placeholder="Disabled input" />
    </div>
  );
}
`,
    Modal: `import { Modal, Button } from '@ribble-ui/react';
import { useState } from 'react';

export function ModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Example Modal"
      >
        <p>This is modal content.</p>
        <Button onClick={() => setIsOpen(false)}>Close</Button>
      </Modal>
    </>
  );
}
`
  };

  return examples[component] || basic;
}

function generateVueExample(component: string, _includeExamples: boolean): string {
  return `<script setup lang="ts">
import { ${component} } from '@ribble-ui/vue';
</script>

<template>
  <${component}>
    Example ${component}
  </${component}>
</template>
`;
}

function generateSvelteExample(component: string, _includeExamples: boolean): string {
  return `<script lang="ts">
  import { ${component} } from '@ribble-ui/svelte';
</script>

<${component}>
  Example ${component}
</${component}>
`;
}

function generateAngularExample(component: string, _includeExamples: boolean): string {
  const selector = component.toLowerCase();
  return `import { Component } from '@angular/core';

@Component({
  selector: 'app-${selector}-example',
  template: \`
    <ribble-${selector}>
      Example ${component}
    </ribble-${selector}>
  \`
})
export class ${component}ExampleComponent {}
`;
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
