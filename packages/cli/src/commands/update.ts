import { execaCommand } from 'execa';
import ora from 'ora';
import { logger } from '../utils/logger.js';
import { detectPackageManager, getInstallCommand } from '../utils/packageManager.js';
import { getProjectRoot, readJson, fileExists } from '../utils/files.js';
import path from 'path';

interface UpdateOptions {
  core?: boolean;
  adapter?: boolean;
  all?: boolean;
}

export async function updateCommand(options: UpdateOptions) {
  logger.title('📦 Update Ribble UI');

  const projectRoot = await getProjectRoot();
  const packageJsonPath = path.join(projectRoot, 'package.json');

  if (!await fileExists(packageJsonPath)) {
    logger.error('No package.json found in current directory');
    process.exit(1);
  }

  const packageJson = await readJson(packageJsonPath);
  const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };

  // Find installed Ribble UI packages
  const ribblePackages = Object.keys(dependencies).filter(pkg => pkg.startsWith('@ribble-ui/'));

  if (ribblePackages.length === 0) {
    logger.warn('No Ribble UI packages found in this project');
    logger.info('Run "ribble init" to add Ribble UI to your project');
    process.exit(0);
  }

  logger.step('Found Ribble UI packages:');
  ribblePackages.forEach(pkg => {
    logger.info(`  ${pkg}@${dependencies[pkg]}`);
  });
  logger.nl();

  // Determine which packages to update
  let packagesToUpdate = ribblePackages;

  if (options.core) {
    packagesToUpdate = ribblePackages.filter(pkg => pkg === '@ribble-ui/core');
  } else if (options.adapter) {
    packagesToUpdate = ribblePackages.filter(pkg =>
      pkg !== '@ribble-ui/core' && pkg !== '@ribble-ui/cli'
    );
  }

  if (packagesToUpdate.length === 0) {
    logger.warn('No packages to update');
    process.exit(0);
  }

  const spinner = ora(`Updating ${packagesToUpdate.length} package(s)...`).start();

  try {
    const pm = await detectPackageManager(projectRoot);

    // Add @latest to each package
    const packagesWithLatest = packagesToUpdate.map(pkg => `${pkg}@latest`);
    const updateCmd = getInstallCommand(pm, packagesWithLatest);

    await execaCommand(updateCmd, { cwd: projectRoot, stdio: 'pipe' });

    spinner.succeed('Packages updated successfully');
    logger.nl();
    logger.success('Ribble UI packages are now up to date! 🎉');
  } catch (error) {
    spinner.fail('Update failed');
    logger.error(error instanceof Error ? error.message : String(error));
    logger.nl();
    logger.info('Try updating manually with:');
    packagesToUpdate.forEach(pkg => {
      logger.info(`  npm install ${pkg}@latest`);
    });
    process.exit(1);
  }
}
