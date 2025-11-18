import prompts from 'prompts';
import { execaCommand } from 'execa';
import ora from 'ora';
import path from 'path';
import fs from 'fs-extra';
import { logger } from '../utils/logger.js';
import { detectPackageManager } from '../utils/packageManager.js';
import { ensureDir } from '../utils/files.js';

interface CreateAppOptions {
  name?: string;
  framework?: 'react' | 'vue' | 'svelte' | 'angular';
  skipInstall?: boolean;
}

const TEMPLATES = {
  'saas-dashboard': {
    title: 'SaaS Dashboard',
    description: 'Full-featured SaaS dashboard with authentication, analytics, and settings'
  },
  'admin-panel': {
    title: 'Admin Panel',
    description: 'Admin panel with user management, CRUD operations, and data tables'
  },
  'analytics': {
    title: 'Analytics Dashboard',
    description: 'Analytics dashboard with charts, metrics, and real-time data'
  },
  'crm': {
    title: 'CRM Interface',
    description: 'CRM interface with contacts, deals, and pipeline management'
  },
  'ecommerce': {
    title: 'E-commerce Admin',
    description: 'E-commerce admin with products, orders, and inventory management'
  },
  'portfolio': {
    title: 'Portfolio Site',
    description: 'Personal portfolio with projects, blog, and contact form'
  }
};

export async function createAppCommand(template: string | undefined, options: CreateAppOptions) {
  logger.title('🚀 Create Ribble UI App');

  // Select template if not provided
  if (!template) {
    const response = await prompts({
      type: 'select',
      name: 'template',
      message: 'Choose a template:',
      choices: Object.entries(TEMPLATES).map(([key, { title, description }]) => ({
        title: `${title} - ${description}`,
        value: key
      }))
    });

    if (!response.template) {
      logger.error('Template selection is required');
      process.exit(1);
    }

    template = response.template;
  }

  // Validate template
  if (!TEMPLATES[template as keyof typeof TEMPLATES]) {
    logger.error(`Invalid template: ${template}`);
    logger.info(`Available templates: ${Object.keys(TEMPLATES).join(', ')}`);
    process.exit(1);
  }

  // Get project name
  let projectName = options.name;
  if (!projectName) {
    const response = await prompts({
      type: 'text',
      name: 'name',
      message: 'Project name:',
      initial: `my-${template}-app`,
      validate: (value: string) => {
        if (!value) return 'Project name is required';
        if (!/^[a-z0-9-_]+$/.test(value)) {
          return 'Project name can only contain lowercase letters, numbers, hyphens, and underscores';
        }
        return true;
      }
    });

    if (!response.name) {
      logger.error('Project name is required');
      process.exit(1);
    }

    projectName = response.name;
  }

  // Select framework
  let framework = options.framework;
  if (!framework) {
    const response = await prompts({
      type: 'select',
      name: 'framework',
      message: 'Choose a framework:',
      choices: [
        { title: 'React + TypeScript + Vite', value: 'react' },
        { title: 'Vue 3 + TypeScript + Vite', value: 'vue' },
        { title: 'Svelte + TypeScript + Vite', value: 'svelte' },
        { title: 'Angular', value: 'angular' }
      ],
      initial: 0
    });

    if (!response.framework) {
      logger.error('Framework selection is required');
      process.exit(1);
    }

    framework = response.framework;
  }

  const projectDir = path.join(process.cwd(), projectName!);

  // Check if directory exists
  if (await fs.pathExists(projectDir)) {
    logger.error(`Directory ${projectName} already exists`);
    process.exit(1);
  }

  const finalTemplate = template!;
  const finalFramework = framework!;

  logger.step(`Creating ${finalTemplate} app with ${finalFramework}...`);
  logger.nl();

  // Create base project structure
  await createProjectStructure(projectDir, finalTemplate, finalFramework);

  logger.success('Project structure created');

  // Install dependencies
  if (!options.skipInstall) {
    const spinner = ora('Installing dependencies...').start();

    try {
      const pm = await detectPackageManager(projectDir);
      const installCmd = pm === 'npm' ? 'npm install' : pm === 'pnpm' ? 'pnpm install' : pm === 'yarn' ? 'yarn install' : 'bun install';

      await execaCommand(installCmd, { cwd: projectDir, stdio: 'pipe' });

      spinner.succeed('Dependencies installed');
    } catch (error) {
      spinner.fail('Installation failed');
      logger.error(error instanceof Error ? error.message : String(error));
      logger.info('You can manually install with: npm install');
    }
  }

  logger.nl();
  logger.success(`${TEMPLATES[template as keyof typeof TEMPLATES].title} created successfully! 🎉`);
  logger.nl();
  logger.info('Next steps:');
  logger.info(`  cd ${projectName}`);

  if (options.skipInstall) {
    const pm = await detectPackageManager(process.cwd());
    const installCmd = pm === 'npm' ? 'npm install' : pm === 'pnpm' ? 'pnpm install' : pm === 'yarn' ? 'yarn install' : 'bun install';
    logger.info(`  ${installCmd}`);
  }

  const pm = await detectPackageManager(projectDir);
  const devCmd = pm === 'npm' ? 'npm run dev' : pm === 'pnpm' ? 'pnpm dev' : pm === 'yarn' ? 'yarn dev' : 'bun dev';
  logger.info(`  ${devCmd}`);

  logger.nl();
}

async function createProjectStructure(
  projectDir: string,
  template: string,
  framework: string
) {
  await ensureDir(projectDir);

  // Create package.json
  const packageJson = {
    name: path.basename(projectDir),
    version: '0.1.0',
    private: true,
    type: 'module',
    scripts: getScripts(framework),
    dependencies: getDependencies(framework, template),
    devDependencies: getDevDependencies(framework)
  };

  await fs.writeJson(path.join(projectDir, 'package.json'), packageJson, { spaces: 2 });

  // Create base file structure based on framework
  if (framework === 'react') {
    await createReactProject(projectDir, template);
  } else if (framework === 'vue') {
    await createVueProject(projectDir, template);
  } else if (framework === 'svelte') {
    await createSvelteProject(projectDir, template);
  } else if (framework === 'angular') {
    await createAngularProject(projectDir, template);
  }

  // Create shared files
  await createSharedFiles(projectDir);
}

function getScripts(framework: string): Record<string, string> {
  const baseScripts = {
    dev: 'vite',
    build: framework === 'react' ? 'tsc && vite build' : 'vite build',
    preview: 'vite preview',
    lint: 'eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0'
  };

  if (framework === 'angular') {
    return {
      dev: 'ng serve',
      build: 'ng build',
      test: 'ng test',
      lint: 'ng lint'
    };
  }

  return baseScripts;
}

function getDependencies(framework: string, template: string): Record<string, string> {
  const base = {
    '@ribble-ui/core': '^0.1.0'
  };

  const frameworkDeps: Record<string, Record<string, string>> = {
    react: {
      '@ribble-ui/react': '^0.1.0',
      'react': '^18.2.0',
      'react-dom': '^18.2.0',
      'react-router-dom': '^6.20.0'
    },
    vue: {
      '@ribble-ui/vue': '^0.1.0',
      'vue': '^3.3.0',
      'vue-router': '^4.2.0'
    },
    svelte: {
      '@ribble-ui/svelte': '^0.1.0',
      'svelte': '^4.2.0',
      'svelte-routing': '^2.0.0'
    },
    angular: {
      '@ribble-ui/angular': '^0.1.0',
      '@angular/core': '^17.0.0',
      '@angular/common': '^17.0.0',
      '@angular/router': '^17.0.0'
    }
  };

  // Add template-specific dependencies
  if (template.includes('dashboard') || template.includes('analytics')) {
    (base as any)['chart.js'] = '^4.4.0';
    (base as any)['date-fns'] = '^2.30.0';
  }

  return { ...base, ...frameworkDeps[framework] };
}

function getDevDependencies(framework: string): Record<string, string> {
  const base = {
    'typescript': '^5.0.0',
    'vite': '^5.0.0'
  };

  if (framework === 'react') {
    return {
      ...base,
      '@types/react': '^18.2.0',
      '@types/react-dom': '^18.2.0',
      '@vitejs/plugin-react': '^4.2.0'
    };
  } else if (framework === 'vue') {
    return {
      ...base,
      '@vitejs/plugin-vue': '^5.0.0',
      'vue-tsc': '^1.8.0'
    };
  } else if (framework === 'svelte') {
    return {
      ...base,
      '@sveltejs/vite-plugin-svelte': '^3.0.0',
      'svelte-check': '^3.6.0'
    };
  }

  return base;
}

async function createReactProject(projectDir: string, template: string) {
  // Create src directory structure
  const srcDir = path.join(projectDir, 'src');
  await ensureDir(srcDir);
  await ensureDir(path.join(srcDir, 'components'));
  await ensureDir(path.join(srcDir, 'pages'));
  await ensureDir(path.join(srcDir, 'theme'));

  // Create main.tsx
  const mainContent = `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './theme/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
`;
  await fs.writeFile(path.join(srcDir, 'main.tsx'), mainContent);

  // Create App.tsx based on template
  const appContent = generateTemplateApp(template, 'react');
  await fs.writeFile(path.join(srcDir, 'App.tsx'), appContent);

  // Create theme/index.css
  const themeContent = `@import '@ribble-ui/core/styles/tokens.css';

:root {
  --ribble-color-primary: #6366f1;
  --ribble-color-secondary: #8b5cf6;
}

body {
  margin: 0;
  font-family: var(--ribble-font-family-sans);
}
`;
  await fs.writeFile(path.join(srcDir, 'theme', 'index.css'), themeContent);

  // Create index.html
  const indexHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Ribble UI ${TEMPLATES[template as keyof typeof TEMPLATES].title}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;
  await fs.writeFile(path.join(projectDir, 'index.html'), indexHtml);

  // Create vite.config.ts
  const viteConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
`;
  await fs.writeFile(path.join(projectDir, 'vite.config.ts'), viteConfig);

  // Create tsconfig.json
  const tsconfig = {
    compilerOptions: {
      target: 'ES2020',
      useDefineForClassFields: true,
      lib: ['ES2020', 'DOM', 'DOM.Iterable'],
      module: 'ESNext',
      skipLibCheck: true,
      moduleResolution: 'bundler',
      allowImportingTsExtensions: true,
      resolveJsonModule: true,
      isolatedModules: true,
      noEmit: true,
      jsx: 'react-jsx',
      strict: true,
      noUnusedLocals: true,
      noUnusedParameters: true,
      noFallthroughCasesInSwitch: true
    },
    include: ['src'],
    references: [{ path: './tsconfig.node.json' }]
  };
  await fs.writeJson(path.join(projectDir, 'tsconfig.json'), tsconfig, { spaces: 2 });
}

async function createVueProject(_projectDir: string, _template: string) {
  // Similar structure for Vue
  logger.info('Vue project creation - implementation pending');
}

async function createSvelteProject(_projectDir: string, _template: string) {
  // Similar structure for Svelte
  logger.info('Svelte project creation - implementation pending');
}

async function createAngularProject(_projectDir: string, _template: string) {
  // Similar structure for Angular
  logger.info('Angular project creation - implementation pending');
}

async function createSharedFiles(projectDir: string) {
  // Create .gitignore
  const gitignore = `node_modules
dist
.DS_Store
*.local
.vite
.env
`;
  await fs.writeFile(path.join(projectDir, '.gitignore'), gitignore);

  // Create README.md
  const readme = `# Ribble UI Project

This project was created with Ribble UI CLI.

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

## Available Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run preview\` - Preview production build

## Documentation

- [Ribble UI Documentation](https://github.com/Astralchemist/Ribble-UI)
- [Component Reference](https://github.com/Astralchemist/Ribble-UI/blob/main/COMPONENTS.md)
`;
  await fs.writeFile(path.join(projectDir, 'README.md'), readme);
}

function generateTemplateApp(template: string, framework: string): string {
  if (framework === 'react') {
    const templates: Record<string, string> = {
      'saas-dashboard': `import { Navbar, Button, Card, Tabs } from '@ribble-ui/react';

function App() {
  return (
    <div className="app">
      <Navbar>
        <h1>SaaS Dashboard</h1>
      </Navbar>

      <main style={{ padding: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <Card>
            <h3>Total Users</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>1,234</p>
          </Card>
          <Card>
            <h3>Revenue</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>$12,345</p>
          </Card>
          <Card>
            <h3>Active Sessions</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>567</p>
          </Card>
        </div>

        <Card>
          <Tabs>
            <div slot="tab">Overview</div>
            <div slot="tab">Analytics</div>
            <div slot="tab">Settings</div>
          </Tabs>
        </Card>
      </main>
    </div>
  );
}

export default App;
`,
      'admin-panel': `import { Navbar, Button, Table, Input } from '@ribble-ui/react';

function App() {
  return (
    <div className="app">
      <Navbar>
        <h1>Admin Panel</h1>
      </Navbar>

      <main style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <Input placeholder="Search users..." />
          <Button variant="primary">Add User</Button>
        </div>

        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>John Doe</td>
              <td>john@example.com</td>
              <td>Admin</td>
              <td><Button size="small">Edit</Button></td>
            </tr>
          </tbody>
        </Table>
      </main>
    </div>
  );
}

export default App;
`
    };

    return templates[template] || templates['saas-dashboard'];
  }

  return '// Template app';
}
