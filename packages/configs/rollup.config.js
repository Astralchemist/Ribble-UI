import path from 'path';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import { terser } from 'rollup-plugin-terser';
import image from '@rollup/plugin-image';
import url from '@rollup/plugin-url';
import { visualizer } from 'rollup-plugin-visualizer';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import filesize from 'rollup-plugin-filesize';
import replace from '@rollup/plugin-replace';
import alias from '@rollup/plugin-alias';
import nodeResolve from '@rollup/plugin-node-resolve';

const isProd = process.env.NODE_ENV === 'production';

export default function createConfig({ input, outDir, name, tsconfig = './tsconfig.json', aliasEntries = [] }) {
  return {
    input,
    output: [
      {
        file: path.join(outDir, 'index.esm.js'),
        format: 'esm',
        sourcemap: true,
        exports: 'named',
      },
      {
        file: path.join(outDir, 'index.cjs.js'),
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
      },
      {
        file: path.join(outDir, 'index.umd.js'),
        format: 'umd',
        name,
        sourcemap: true,
        exports: 'named',
      },
    ],
    plugins: [
      peerDepsExternal(),
      nodeResolve({ extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'] }),
      alias({ entries: aliasEntries }),
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      }),
      typescript({ tsconfig, declaration: true, declarationDir: outDir, sourceMap: true }),
      postcss({
        extract: true,
        minimize: isProd,
        sourceMap: true,
        plugins: [autoprefixer(), cssnano()],
      }),
      image(),
      url({
        include: [
          '**/*.woff',
          '**/*.woff2',
          '**/*.ttf',
          '**/*.eot',
          '**/*.svg',
          '**/*.png',
          '**/*.jpg',
          '**/*.gif',
          '**/*.webp',
          '**/*.avif',
        ],
        limit: 8192,
        emitFiles: true,
      }),
      isProd && terser(),
      visualizer({ filename: path.join(outDir, 'bundle-analysis.html'), open: false }),
      filesize(),
    ],
    treeshake: true,
    watch: {
      clearScreen: false,
    },
  };
}
