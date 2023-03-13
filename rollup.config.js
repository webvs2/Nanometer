// rollup.config.js
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import scss from 'rollup-plugin-scss'
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'
// import dev from 'rollup-plugin-dev'
// import livereload from 'rollup-plugin-livereload'
// import css from "rollup-plugin-import-css";

import rollupPostcss from 'rollup-plugin-postcss'
import sucrase from '@rollup/plugin-sucrase';
import typescript from '@rollup/plugin-typescript';
import { optimizeLodashImports } from "@optimize-lodash/rollup-plugin";
import path from 'path';

export default {
  input: './index.ts',
  treeshake:true,
  output: {
    file: path.join(__dirname, './build/index.js'),
    format: 'umd',
    name: '$message',
    sourcemap: true,
    globals: {
    },
    generatedCode:{
      arrowFunctions:true
    }
  },
  cache:true,
  watch: {
    include: ['index.ts','src/**'],
    exclude: 'node_modules/**',
    failAfterWarnings: true,
    clearScreen:false,
    buildDelay:100,

  },
  plugins: [
    nodeResolve({
      extensions: ['.js', '.ts']
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**' 
    }),
    typescript({
      exclude:['dist/*','build/*'],
      include:['src/**','./index.ts']
    }),
    json(),
    // peerDepsExternal(),
    scss({
      fileName: 'index.css',
      processor: () => postcss([autoprefixer()]),
      includePaths: [
        path.join(__dirname, '../../node_modules/'),
        'node_modules/'
      ],
      sass: require('sass')
    }),
    optimizeLodashImports(),
  ],

};