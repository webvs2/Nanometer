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
import rollupPostcss from 'rollup-plugin-postcss'
// import peerDepsExternal from 'rollup-plugin-peer-deps-external';
const path = require('path')

export default {
  input: 'index.js',
  treeshake:true,
  output: {
    file: path.join(__dirname, './build/index.js'),
    format: 'umd',
    name: '$message',
    sourcemap: true,
    globals: {
      // lodash: '_',
    },
    generatedCode:{
      arrowFunctions:true
    }
  },

  watch: {
    include: ['src/*.js', 'index.js','styles/**'],
    exclude: 'node_modules/**',
    failAfterWarnings: true,
    clearScreen:false,
    buildDelay:300,

  },
  // external: ['lodash'],
  plugins: [
    nodeResolve(),
    // commonjs(),
    babel({
      exclude: 'node_modules/**' 
    }),
    json(),
    // peerDepsExternal(),
    scss({
      processor: () => postcss([autoprefixer()]),
      includePaths: [
        path.join(__dirname, '../../node_modules/'),
        'node_modules/'
      ],
      sass: require('sass')
    }),

  ],

};