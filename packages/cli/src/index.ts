#!/usr/bin/env node

import { Command } from 'commander';
import { initCommand } from './commands/init.js';
import { addCommand } from './commands/add.js';
import { tokensCommand } from './commands/tokens.js';
import { createAppCommand } from './commands/create-app.js';
import { updateCommand } from './commands/update.js';
import { themeCommand } from './commands/theme.js';

const program = new Command();

program
  .name('ribble')
  .description('Interactive CLI for Ribble UI - the universal component framework')
  .version('0.2.0');

// ribble init - Initialize a new project
program
  .command('init')
  .description('Initialize a new Ribble UI project')
  .option('-f, --framework <framework>', 'Framework to use (react, vue, svelte, angular, vanilla)')
  .option('-t, --typescript', 'Use TypeScript', true)
  .option('--skip-install', 'Skip package installation')
  .action(initCommand);

// ribble add <component> - Add a component
program
  .command('add')
  .description('Add a Ribble UI component to your project')
  .argument('[components...]', 'Component names to add (e.g., button, modal, input)')
  .option('-a, --all', 'Add all components')
  .option('--examples', 'Include usage examples')
  .action(addCommand);

// ribble tokens build - Compile design tokens
program
  .command('tokens')
  .description('Build and compile design tokens')
  .option('-o, --output <path>', 'Output directory', './src/theme')
  .option('-f, --format <format>', 'Output format (css, json, ts, all)', 'all')
  .option('--watch', 'Watch for changes')
  .action(tokensCommand);

// ribble create-app <template> - Create full app from template
program
  .command('create-app')
  .description('Create a new app from a template')
  .argument('[template]', 'Template name (saas-dashboard, admin-panel, analytics, crm)')
  .option('-n, --name <name>', 'Project name')
  .option('-f, --framework <framework>', 'Framework to use (react, vue, svelte, angular)')
  .option('--skip-install', 'Skip package installation')
  .action(createAppCommand);

// ribble update - Update Ribble UI packages
program
  .command('update')
  .description('Update Ribble UI packages to the latest version')
  .option('--core', 'Update core package only')
  .option('--adapter', 'Update framework adapter only')
  .option('--all', 'Update all Ribble UI packages', true)
  .action(updateCommand);

// ribble theme - Theme management
program
  .command('theme')
  .description('Manage themes and design tokens')
  .option('--init', 'Initialize theme configuration')
  .option('--export <format>', 'Export theme (figma, sketch, css, json)')
  .option('--import <file>', 'Import theme from file')
  .action(themeCommand);

program.parse();
