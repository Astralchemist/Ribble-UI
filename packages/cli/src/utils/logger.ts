import pc from 'picocolors';

export const logger = {
  info: (message: string) => {
    console.log(pc.blue('ℹ'), message);
  },

  success: (message: string) => {
    console.log(pc.green('✔'), message);
  },

  error: (message: string) => {
    console.log(pc.red('✖'), message);
  },

  warn: (message: string) => {
    console.log(pc.yellow('⚠'), message);
  },

  step: (message: string) => {
    console.log(pc.cyan('→'), message);
  },

  title: (message: string) => {
    console.log();
    console.log(pc.bold(pc.magenta(message)));
    console.log();
  },

  nl: () => {
    console.log();
  }
};
