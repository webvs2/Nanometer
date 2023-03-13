
import config from './rollup.config.js'

import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
// const html = require('@rollup/plugin-html');
import copy from 'rollup-plugin-copy'

config.plugins.push(
    copy({
        targets: [
            { src: 'src/assets/rain.ico', dest: 'build/' },
            { src: 'src/assets', dest: 'build/' },
            //   { src: ['src/assets', 'assets/fonts/arial.woff2'], dest: 'dist/public/fonts' },
            //   { src: 'assets/images/**/*', dest: 'dist/public/images' }
        ]
    }),
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