// rollup.config.js
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import scss from 'rollup-plugin-scss'
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'
import alias from '@rollup/plugin-alias';
import postUrl from "postcss-url"
import copyAssets from "postcss-copy-assets"

// import dev from 'rollup-plugin-dev'
// import livereload from 'rollup-plugin-livereload'
// import css from "rollup-plugin-import-css";
import importCss from "rollup-plugin-import-css";
import rollupPostcss from 'rollup-plugin-postcss'
import typescript from '@rollup/plugin-typescript';
import { optimizeLodashImports } from "@optimize-lodash/rollup-plugin";
import path from 'path';
import postImport from 'postcss-import';
export function outputGenerate(Option = { sourcemap: true, file: path.join(__dirname, './build/index.js'), }) {
  return [{
    format: 'esm',
    generatedCode: {
      arrowFunctions: true
    },
  }, {
    format: 'umd',
    name: '$message',
    generatedCode: {
      arrowFunctions: true
    },
  }].map(item => {
    item = Object.assign({}, item, Option)
    return item
  })
}

export default {
  input: './index.ts',
  treeshake: true,
  output: [{
    file: path.join(__dirname, './build/index.js'),
    format: 'esm',
    name: '$message',
    sourcemap: true,
    generatedCode: {
      arrowFunctions: true
    }
  }, {
    file: path.join(__dirname, './build/index-umd.js'),
    format: 'umd',
    name: '$message',
    sourcemap: true,
    generatedCode: {
      arrowFunctions: true
    }
  }],
  // cache:true,
  watch: {
    include: ['index.ts', 'src/*.ts', 'src/*.js'],
    exclude: 'node_modules/**',
    failAfterWarnings: true,
    clearScreen: false,
    buildDelay: 100,

  },
  plugins: [
    alias({
      entries: [
        { find: '@', replacement: './src' },
      ]
    }),
    nodeResolve({
      extensions: ['.js', '.ts']
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**'
    }),
    typescript(),
    json(),
    // peerDepsExternal(),
    // importCss(),
    scss({
      fileName: 'index.css',
      processor: (css) => postcss([autoprefixer()]),
      verbose: true,
      watch: ['src/styles', 'src/assets'],
      includePaths: [
        path.join(__dirname, '../../node_modules/'),
        'node_modules/'
      ],
      outputStyle: 'compressed',
      sass: require('sass')
    }),
    // rollupPostcss({
    //   plugins:[
    //     postImport(),
    //     postUrl()
    //   ]
    // }),
    optimizeLodashImports()
  ],

};