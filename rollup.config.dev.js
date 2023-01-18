//rollup.dev.config.js
// let listenersPath
import config from './rollup.config.js'
// const rollup = require('rollup');
// import rollup from "rollup"
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
const html = require('@rollup/plugin-html');
import copy from 'rollup-plugin-copy'
// const fs = require('fs')
// fs.existsSync(path, callback)
// let  isCopy=false;
// let copyInfo = [
//     { src: 'src/assets/rain.ico', dest: 'build/' },
//     { src: 'src/assets', dest: 'build/assets' },
// ]
// copyInfo.map((path)=>{
//     if(	!fs.existsSync(path)){
//         isCopy=true
//     }
// })
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