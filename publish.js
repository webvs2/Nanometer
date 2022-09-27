const { exec } = require('child_process');
// const util = require('util');
async function getVersion() {
    const { stdout } = await exec('node npm -v');
    console.log(stdout);
  }
  getVersion();