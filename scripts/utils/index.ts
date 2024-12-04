import { glob } from "glob";
import { resolve } from "path";
import fs from "fs";

export const rollupInput = () => {
  //1. 读取全部的main文件路径
  const allEntry = glob.sync(resolve(__dirname, "../../src/module/**/main.ts"));
  //2. 读取html模版信息
  const temp = fs
    .readFileSync(resolve(__dirname, "../template/index.html"))
    .toString();
  //3. 初始化入口文件配置
  const entryPage = {};
  //4. 初始化模版文件内容
  let content = "";
  allEntry.forEach((entry) => {
    const pathArr = entry.split("/");
    const mode = {
        title: pathArr[pathArr.length - 2] || entry,
        src: entry,
      },
      writeHtmlPath = resolve(
        __dirname,
        `../../src/module/${mode.title}/index.html`,
      );
    entryPage[mode.title] = writeHtmlPath;
    //模版匹配
    content = temp.replace(/{{(.*?)}}/gi, (match, p1) => {
      return mode[p1.trim()];
    });
    //5. 写入文件
    fs.writeFileSync(writeHtmlPath, content);
  });
  return entryPage;
};
