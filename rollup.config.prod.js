import config from './rollup.config'
// const rollup = require('rollup');
// import serve from 'rollup-plugin-serve'
// import livereload from 'rollup-plugin-livereload'
// console.log(config.output)
const path = require('path')

let output={
    sourcemap:false,
    compact:true,
    file: path.join(__dirname, './dist/index.js'),

}
config.output=Object.assign({},config.output,output)

console.log(config.output)

export default config

