import createConfig from '@ribble-ui/configs/rollup.config.js';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require('./package.json');

export default createConfig({
  input: 'src/index.ts',
  outDir: 'dist',
  name: 'UIKITVue',
  tsconfig: './tsconfig.json',
});
