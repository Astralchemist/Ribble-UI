import fs from 'fs-extra';
import path from 'path';

export async function ensureDir(dirPath: string): Promise<void> {
  await fs.ensureDir(dirPath);
}

export async function writeFile(filePath: string, content: string): Promise<void> {
  await fs.ensureDir(path.dirname(filePath));
  await fs.writeFile(filePath, content, 'utf-8');
}

export async function readFile(filePath: string): Promise<string> {
  return await fs.readFile(filePath, 'utf-8');
}

export async function fileExists(filePath: string): Promise<boolean> {
  return await fs.pathExists(filePath);
}

export async function copyTemplate(source: string, destination: string, replacements?: Record<string, string>): Promise<void> {
  await fs.ensureDir(path.dirname(destination));

  let content = await fs.readFile(source, 'utf-8');

  if (replacements) {
    for (const [key, value] of Object.entries(replacements)) {
      content = content.replace(new RegExp(key, 'g'), value);
    }
  }

  await fs.writeFile(destination, content, 'utf-8');
}

export async function getProjectRoot(): Promise<string> {
  let currentDir = process.cwd();

  while (currentDir !== path.parse(currentDir).root) {
    if (await fs.pathExists(path.join(currentDir, 'package.json'))) {
      return currentDir;
    }
    currentDir = path.dirname(currentDir);
  }

  return process.cwd();
}

export async function readJson<T = any>(filePath: string): Promise<T> {
  return await fs.readJson(filePath);
}

export async function writeJson(filePath: string, data: any): Promise<void> {
  await fs.ensureDir(path.dirname(filePath));
  await fs.writeJson(filePath, data, { spaces: 2 });
}
