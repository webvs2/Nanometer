import config from './rollup.config'
// const rollup = require('rollup');
// import serve from 'rollup-plugin-serve'
// import livereload from 'rollup-plugin-livereload'
// console.log(config.output)
let output={
    sourcemap:false,
    compact:true,
}
config.output=Object.assign({},config.output,output)

console.log(config.output)

export default config

