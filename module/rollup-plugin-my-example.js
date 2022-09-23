const fs = require('fs')

export default function myExample() {
    return {
        name: 'my-example', // 此名称将显示在警告和错误中
        resolveId(source) {
            if (source === 'virtual-module') {
                return source; // this signals that rollup should not ask other plugins or check the file system to find this id
            }
            return null; // other ids should be handled as usually
        },
        load(id) {
            if (id === 'virtual-module') {
                return 'export default "This is virtual!"'; // the source code for "virtual-module"
            }
            return null; // other ids should be handled as usually
        },
        outputOptions(OutputOptions) {
            // console.log(OutputOptions)
        },
        writeBundle(options, bundle) {
            // console.log(bundle)
        },
        generateBundle(options, bundle) {
            console.log(...bundle)
            // fs.readdir()
        }
    };
}

