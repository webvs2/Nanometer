import config from './rollup.config'
const path = require('path')
import { terser } from "rollup-plugin-terser";
import analyze from 'rollup-plugin-analyzer'
const rimraf = require('rimraf');
const  _console =require('console-color-mr')
// import myExample from './src/rollup-plugin-my-example.js';
rimraf('./dist/*',(err)=>{
    if(err){
        console.error(err)
    }else{
        console.log('Garbage removal program'.blue)
    }
})

let output={
    sourcemap:false,
    compact:true,
    file: path.join(__dirname, './dist/index.js'),

}
config.output=Object.assign({},config.output,output)
config.plugins=config.plugins.concat([
    terser({
        compress: {
            drop_console: true,
            drop_debugger: false,
            pure_funcs: ['console.log'] // 移除console
        }
    }),
    // myExample()
    // analyze()
])



// console.log(config)
// console.log(config.output)

export default config

