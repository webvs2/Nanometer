//rollup.dev.config.js
// let listenersPath
import config from './rollup.config'
const rollup = require('rollup');
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
const html = require('@rollup/plugin-html');

config.plugins.push(
    // html(),
    serve({
        open: true,
        openPage: '/build/index.html',
        port: 520,
    }),
    livereload('build')
)
// console.log(config)
export default config