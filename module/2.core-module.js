// fs path vm
// fs fileSystem 文件系统
// path 操作路径的
// vm 虚拟运行环境

const fs = require('fs');
const path = require('path');

let flag = fs.existsSync(path.resolve(__dirname, '../.gitignore'));
if (flag) {
    try {
        let r = fs.readFileSync(path.resolve(__dirname, '../.gitignorea'), 'utf8');
        console.log(r);
    } catch (e) {
        console.log('文件不存在');
    }
}

// 如果拼接的路径需要拼接/，必须采用join，因为resolve会回到根目录下
let r = path.join(__dirname, 'a', 'b', 'c', '/');// 如果参数中含有'/'，不会解析出绝对路径，而是进行拼接
let r1 = path.resolve(__dirname, 'a', 'b', 'c', '/');// 如果参数中含有'/'，会解析出绝对路径
let ext = path.extname('a.min.js');// 获取文件扩展名
let basename = path.basename('a.min.js', '.js');// 会返回 path 的最后一部分（文件名）

console.log(r, r1, ext, basename);



let vm = require('vm');
// 如何让一个字符串执行

// eval、new Function、

// new Function 在前端中需要让一个模块执行

// 模块之间要相互独立，不希望模块之间的变量共享
// let a = 1000086;
// let fn = new Function('a', 'console.log(a)');// 可以让字符串变成函数
// console.log(fn(a));

// 直接运行字符串，运行函数字符串
vm.runInThisContext('console.log(a)');