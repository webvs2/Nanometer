const http = require("https");
const fs = require("fs");
const path = require("path");
let request = require("request");
const program = require("commander");
const inquirer = require("inquirer");
const readline = require("readline");
let DEMAND = false;
let base = "/hp";
let sync = {
  jquery: "https://code.jquery.com/jquery-3.6.1.min.js",
  font_1141750_xwopum7j9a:
    "https://at.alicdn.com/t/font_1141750_xwopum7j9a.eot",
  font_1141750_xwopum7j9awoff2:
    "https://at.alicdn.com/t/font_1141750_xwopum7j9a.woff2",
};
let acquire = (customization) => {
  let syncObj = customization || sync;
  Object.keys(syncObj).map((item) => {
    let localUrl = path.join(__dirname, `${base}/${path.basename(sync[item])}`);
    fs.readFile(localUrl, function (err, data) {
      let DEMANDsubject = DEMAND ? !err : true;
      if (DEMANDsubject) {
        request(sync[item])
          .pipe(fs.createWriteStream(localUrl))
          .on("close", (err) => {
            console.log(
              "" +
                ` \x1B[32m同步完成,当前同步文件： ${path.basename(
                  sync[item]
                )}\x1B[0m   \x1B[33m path： ${base}/${path.basename(
                  sync[item]
                )}\x1B[0m      `
            );
            pathReplace('item',`${base}/${path.basename(sync[item])}`)
          });
      } else {
        console.log(
          "" + ` \x1B[31m同步策略已过滤 ${path.basename(sync[item])}\x1B[0m`
        );
      }
    });
  });
};
if (process.argv[2]) {
  if(!sync[process.argv[2]])return false
  inquirer
    .prompt([
      {
        type: "input",
        message: `即将同步${process.argv[2]}`,
        name: "name",
        default: "yes",
      },
    ])
    .then((answer) => {
      acquire({[process.argv[2]]:sync[process.argv[2]]});
    });
} else {
  inquirer
    .prompt([
      {
        type: "input",
        message: "是否采用按需同步策略:",
        name: "name",
        default: "no",
        message: "按需同步策略：若本地文件夹里面没有，将不同步（yes/no）",
      },
    ])
    .then((answer) => {
      if (answer.name == "yes" || answer.name == "Y") {
        DEMAND = true;
      }
      acquire();
    });
  const args = process.args;
}

function pathReplace(keyword,con,presentBase = "/src/",) {
  fs.readdir(path.join(__dirname, presentBase), function (err, files) {
    if (err) {
      return console.error(err);
    }
    files.map((file) => {
      fs.stat(path.join(__dirname, presentBase + file), function (err, stats) {
        if (stats.isFile()) {
          if (/(js|sass|vue)$/.test(path.extname(file))) {
            fs.readFile(
              path.join(__dirname, presentBase + file),
              "utf8",
              function (err, data) {
                let text = data.replace( new RegExp(  `hp+.+${keyword}`,'g') , con);
                fs.writeFile(
                  path.join(__dirname, presentBase + file),
                  text,
                  function (err) {
                    if (err) {
                      return console.error(err);
                    }
                    readline.clearLine(process.stdout);
                    process.stdout.write("数据写入成功！", "utf-8");
                    readline.cursorTo(process.stdout,0);
                  }
                );
              }
            );
          }
        } else if (stats.isDirectory()) {
          pathReplace(keyword,con,presentBase + file + "/");
        }
      });
    });
  });
}
// pathReplace('杨鹏飞','1212')
// console.log( /hp+.+aaa/g.test('/hp11/aaa.js'))
