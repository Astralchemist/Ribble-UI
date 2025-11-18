import { execaCommand } from 'execa';
import fs from 'fs-extra';
import path from 'path';

export type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun';

export async function detectPackageManager(cwd: string = process.cwd()): Promise<PackageManager> {
  // Check lock files
  if (await fs.pathExists(path.join(cwd, 'pnpm-lock.yaml'))) return 'pnpm';
  if (await fs.pathExists(path.join(cwd, 'yarn.lock'))) return 'yarn';
  if (await fs.pathExists(path.join(cwd, 'bun.lockb'))) return 'bun';
  if (await fs.pathExists(path.join(cwd, 'package-lock.json'))) return 'npm';

  // Check which is available
  try {
    await execaCommand('pnpm --version', { stdio: 'ignore' });
    return 'pnpm';
  } catch {}

  try {
    await execaCommand('yarn --version', { stdio: 'ignore' });
    return 'yarn';
  } catch {}

  try {
    await execaCommand('bun --version', { stdio: 'ignore' });
    return 'bun';
  } catch {}

  return 'npm';
}

export function getInstallCommand(pm: PackageManager, packages: string[]): string {
  const pkgs = packages.join(' ');
  switch (pm) {
    case 'npm': return `npm install ${pkgs}`;
    case 'pnpm': return `pnpm add ${pkgs}`;
    case 'yarn': return `yarn add ${pkgs}`;
    case 'bun': return `bun add ${pkgs}`;
  }
}

export function getDevInstallCommand(pm: PackageManager, packages: string[]): string {
  const pkgs = packages.join(' ');
  switch (pm) {
    case 'npm': return `npm install -D ${pkgs}`;
    case 'pnpm': return `pnpm add -D ${pkgs}`;
    case 'yarn': return `yarn add -D ${pkgs}`;
    case 'bun': return `bun add -D ${pkgs}`;
  }
}

export function getRunCommand(pm: PackageManager, script: string): string {
  switch (pm) {
    case 'npm': return `npm run ${script}`;
    case 'pnpm': return `pnpm ${script}`;
    case 'yarn': return `yarn ${script}`;
    case 'bun': return `bun run ${script}`;
  }
}
