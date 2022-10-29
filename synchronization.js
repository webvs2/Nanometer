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
  font_2584761_1u7dwraxww1:
    "https://at.alicdn.com/t/font_2584761_1u7dwraxww1.css",
  font_2584761_uyk2t2qdhl9:
    "https://at.alicdn.com/t/font_2584761_uyk2t2qdhl9.css",
  font_2735453_5qukyiw3qso:
    "https://at.alicdn.com/t/font_2735453_5qukyiw3qso.css",
  font_2735451_byy7g2xtc3p:
    "https://at.alicdn.com/t/c/font_2735451_byy7g2xtc3p.css",
  font_2584761_vultm9qpa3:
    "https://at.alicdn.com/t/c/font_2584761_vultm9qpa3.css",
  t1624882059084: "https://at.alicdn.com/t/font_2584761_1u7dwraxww1.ttf",
  woff: "https://at.alicdn.com/t/font_2584761_1u7dwraxww1.woff",
  woff2: "https://at.alicdn.com/t/font_2584761_1u7dwraxww1.woff2",
  uyk2t2qdhl9Eot: "https://at.alicdn.com/t/font_2584761_uyk2t2qdhl9.eot",
  uyk2t2qdhl9Woff: "https://at.alicdn.com/t/font_2584761_uyk2t2qdhl9.woff",
  uyk2t2qdhl9Ttf: "https://at.alicdn.com/t/font_2584761_uyk2t2qdhl9.ttf",
  uyk2t2qdhl9Svg: "https://at.alicdn.com/t/font_2584761_uyk2t2qdhl9.svg",
  vultm9qpa3Eot: "https://at.alicdn.com/t/c/font_2584761_vultm9qpa3.eot",
  byy7g2xtc3pEot: "https://at.alicdn.com/t/c/font_2735451_byy7g2xtc3p.eot",
  qukyiw3qsoTtf: "https://at.alicdn.com/t/font_2735453_5qukyiw3qso.ttf",
  qukyiw3qsoWoff: "https://at.alicdn.com/t/font_2735453_5qukyiw3qso.woff",
  qukyiw3qsoWoff2: "https://at.alicdn.com/t/font_2735453_5qukyiw3qso.woff2",
};
let syncInfo = {};
let acquire = (customization) => {
  let syncObj = customization || sync;
  Object.keys(syncObj).map((item, index) => {
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
            // ${base}
            syncInfo[item] = path.basename(sync[item]);
            // console.log(Object.keys(syncObj).length,index)
            if (Object.keys(syncObj).length - 1 === index) {
              Object.keys(syncInfo).map((j, i) => {
                pathReplace(syncInfo[j],`./${path.basename(
                  sync[item]
                )}`);
              });
            }

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
  if (!sync[process.argv[2]]) return false;
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
      acquire({ [process.argv[2]]: sync[process.argv[2]] });
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

function pathReplace(keyword, con, presentBase = "/hp/") {
  fs.readdir(path.join(__dirname, presentBase), function (err, files) {
    if (err) {
      return console.error(err);
    }
    files.map((file) => {
      fs.stat(path.join(__dirname, presentBase + file), function (err, stats) {
        if (err) {
          return console.error(err);
        }
        if (stats.isFile()) {
          if (/(html|js|css)$/.test(path.extname(file))) {
            let data = fs.readFileSync(
              path.join(__dirname, presentBase + file),
              "utf8"
            );
                fs.writeFileSync(
                    path.join(__dirname, presentBase + file),
                    data.replace(
                      new RegExp(`(http|https)?:?\/\/+at.+${keyword}+(.+(?='|"))?`, "g"),
                      function (context) {
                        console.log(context)
                        return con;
                      }
                    ),
                    function (err) {
                      if (err) {
                        return console.error(err);
                      }
                      readline.clearLine(process.stdout);
                      process.stdout.write("数据写入成功！", "utf-8");
                      readline.cursorTo(process.stdout, 0);
                    }
                  );
          }
        } else if (stats.isDirectory()) {
          pathReplace(keyword, con, presentBase + file + "/");
        }
      });
    });
  });
}
// pathReplace('https://at.alicdn.com/t/font_2735453_5qukyiw3qso.ttf','杨鹏飞')
