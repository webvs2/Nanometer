import { default as config, outputGenerate } from './rollup.config'
const path = require('path')
import { terser } from "rollup-plugin-terser";
import analyze from 'rollup-plugin-analyzer'
const rimraf = require('rimraf');
const _console = require('console-color-mr')
import copy from 'rollup-plugin-copy'

rimraf('./dist/*', (err) => {
    if (err) {
        console.error(err)
    } else {
        console.log('Garbage removal program'.blue)
    }
})

config.output =  [{
    file: path.join(__dirname, './dist/index.js'),
    format: 'esm',
    name: '$message',
    sourcemap: false,
    generatedCode: {
      arrowFunctions: true
    }
  }, {
    file: path.join(__dirname, './dist/index-umd.js'),
    format: 'umd',
    name: '$message',
    sourcemap: false,
    generatedCode: {
      arrowFunctions: true
    }
  }]
config.plugins = config.plugins.concat([
    copy({
        targets: [
            { src: 'src/assets/icon/iconfont.ttf', dest: 'dist/' },
            { src: 'src/assets/icon/iconfont.woff', dest: 'dist/' },
            { src: 'src/assets/icon/iconfont.woff2', dest: 'dist/' },

        ]
    }),
    terser({
        compress: {
            drop_console: true,
            drop_debugger: false,
            pure_funcs: ['console.log'] // 移除console
        }
    }),
])


export default config

