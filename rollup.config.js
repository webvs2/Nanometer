// rollup.config.js
import json from 'rollup-plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
// import scss from 'rollup-plugin-scss'
// import postcss from 'postcss'
// import autoprefixer from 'autoprefixer'
import serve from 'rollup-plugin-serve'
// import dev from 'rollup-plugin-dev'
import livereload from 'rollup-plugin-livereload'
import rollupPostcss from 'rollup-plugin-postcss'
const path = require('path')
export default {
  input: 'index.js',
  output: {
    file: path.join(__dirname, './build/bundle.js'),
    format: 'umd',
    name: '$message',
    sourcemap: true,
    globals: {
      // lodash: '_',
    },
  },
  watch: {
    include: ['src/*.js', 'index.js','styles/**'],
    exclude: 'node_modules/**',
    failAfterWarnings: true,

  },
  plugins: [
    nodeResolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**' 
    }),
    rollupPostcss({
      extract: true,
    }),
    // scss({
    //   output: './build.css',
    //   sourceMap: true,
    //   // include: ['/src/*.scss'],
    //   failOnError: true,
    //   sass: require('sass'),
    //   processor: () => postcss([autoprefixer()]),
    //   includePaths: [
    //     path.join(__dirname, '../../node_modules/'),
    //     'node_modules/'
    //   ],
    //   processor: (css, map) => ({
    //     css: css.replace('/*date*/', '/* ' + new Date().toJSON() + ' */'),
    //     map
    //   }),
    //   // watch: 'src/styles/**',
    // }),
    process.env.NODE_ENV=='dev'?serve({
        open: true,
        openPage: '/build/index.html',
      }):null,
      process.env.NODE_ENV=='dev'?livereload('build'):null,
    
      // dev({
      //   dirs:['build'],
      //   basePath:'./',

      // })
    // serve({
    //   open: true,
    //   openPage: '/build/index.html',
    // })
  ],

};