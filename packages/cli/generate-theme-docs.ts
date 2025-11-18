// CLI script to generate theme documentation from tokens and theme files
import fs from 'fs';
import path from 'path';

const THEMES_DIR = path.resolve(__dirname, '../../core/src/themes');
const TOKENS_DIR = path.join(THEMES_DIR, 'tokens');
const OUTPUT = path.resolve(__dirname, '../../docs/themes.md');

function readJson(file: string) {
  return JSON.parse(fs.readFileSync(file, 'utf-8'));
}

function getAllTokens() {
  const files = fs.readdirSync(TOKENS_DIR);
  const tokens: Record<string, any> = {};
  for (const file of files) {
    if (file.endsWith('.json')) {
      tokens[file.replace('.json', '')] = readJson(path.join(TOKENS_DIR, file));
    }
  }
  return tokens;
}

function isColor(value: string) {
  return (
    typeof value === 'string' &&
    (value.startsWith('#') || value.startsWith('rgb') || value.startsWith('hsl'))
  );
}

function _colorSwatch(value: string) {
  return `<span style="display:inline-block;width:1.5em;height:1.5em;border:1px solid #ccc;background:${value};vertical-align:middle;margin-right:0.5em;"></span>`;
}

function escapeMd(str: string) {
  return str.replace(/`/g, '`');
}

function generateDocs() {
  const tokens = getAllTokens();
  let md = '# UI Kit Theme Tokens\n\n';
  for (const [name, group] of Object.entries(tokens)) {
    md += `## ${name}\n`;
    md += '| Token | Value | Preview |\n|-------|-------|---------|\n';
    for (const [token, value] of Object.entries(group)) {
      const valStr = String(value);
      const preview = isColor(valStr)
        ? `<span style="display:inline-block;width:1.5em;height:1.5em;border:1px solid #ccc;background:${valStr};vertical-align:middle;margin-right:0.5em;"></span>`
        : '';
      md += `| \`${escapeMd(token)}\` | \`${escapeMd(valStr)}\` | ${preview} |\n`;
    }
    md += '\n';
  }
  md += '\n---\n';
  md += '## Usage Example\n';
  md +=
    '```css\n.button {\n  color: var(--ui-color-primary);\n  background: var(--ui-color-bg);\n}\n```\n';
  fs.writeFileSync(OUTPUT, md, 'utf-8');
  console.log(`Theme docs generated at ${OUTPUT}`);
}

generateDocs();
