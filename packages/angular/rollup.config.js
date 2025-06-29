import createConfig from '@ui-kit/configs/rollup.config.js';
import pkg from './package.json' assert { type: 'json' };

export default createConfig({
  input: 'src/index.ts',
  outDir: 'dist',
  name: 'UIKITAngular',
  tsconfig: './tsconfig.json',
});
