# @ribble-ui/cli

> Interactive CLI for Ribble UI - scaffolding, theming, and project management

## Installation

\`\`\`bash
npm install -g @ribble-ui/cli
# or
pnpm add -g @ribble-ui/cli
\`\`\`

## Usage

### Initialize a Project

\`\`\`bash
ribble init
\`\`\`

Interactive setup that:
- Selects framework (React, Vue, Svelte, Angular, Vanilla)
- Configures TypeScript
- Creates theme directory
- Installs dependencies

### Add Components

\`\`\`bash
# Interactive selection
ribble add

# Add specific components
ribble add button input modal

# Add all components
ribble add --all
\`\`\`

### Build Design Tokens

\`\`\`bash
ribble tokens
\`\`\`

### Create App from Template

\`\`\`bash
ribble create-app saas-dashboard
\`\`\`

## License

MIT
