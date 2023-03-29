import { default as config, outputGenerate } from './rollup.config'
const path = require('path')
import { terser } from "rollup-plugin-terser";
import analyze from 'rollup-plugin-analyzer'
const rimraf = require('rimraf');
const _console = require('console-color-mr')
import copy from 'rollup-plugin-copy'

// import css from 'rollup-plugin-css-only'
// import myExample from './src/rollup-plugin-my-example.js';
rimraf('./dist/*', (err) => {
    if (err) {
        console.error(err)
    } else {
        console.log('Garbage removal program'.blue)
    }
})

// let output= outputGenerate  

// {
//     sourcemap:true,
//     compact:true,
//     file: path.join(__dirname, './dist/index.js'),

// }
config.output =  [{
    file: path.join(__dirname, './dist/index.js'),
    format: 'esm',
    name: '$message',
    sourcemap: true,
    generatedCode: {
      arrowFunctions: true
    }
  }, {
    file: path.join(__dirname, './dist/index-umd.js'),
    format: 'umd',
    name: '$message',
    sourcemap: true,
    generatedCode: {
      arrowFunctions: true
    }
  }]
config.plugins = config.plugins.concat([
    copy({
        targets: [
            // { src: 'src/assets/rain.ico', dest: 'build/' },
            { src: 'src/assets', dest: 'dist/' },
        ]
    }),
    terser({
        compress: {
            drop_console: true,
            drop_debugger: false,
            // pure_funcs: ['console.log'] // 移除console
        }
    }),
])


export default config

