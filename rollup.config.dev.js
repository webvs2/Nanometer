//rollup.dev.config.js
// let listenersPath
import config from './rollup.config'
const rollup = require('rollup');
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
const html = require('@rollup/plugin-html');

// let cache;
// // console.log(rollup.rollup)
// // console.log(config )
// async function buildWithCache() {
//     const bundle = await rollup.rollup({
//         cache // is ignored if falsy
//         // ... other input options
//         // 1212
//     });
//     cache = bundle.cache; // store the cache object of the previous build
//     console.log(bundle)
//     return bundle;
// }
// buildWithCache().then(() => {
//     console.log('will use the cache of the previous build')
//     // buildWithCache()
// })
config.cache = true
config.plugins.push(
    // html(),
    serve({
        open: true,
        openPage: '/build/index.html',
    }),
   
    livereload('build')
)
// console.log(config)
export default config