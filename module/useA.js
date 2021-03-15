// node中可以采用同步的方式读取文件（为什么不是异步？因为异步的代码需要通过回调函数来解决，发生回调嵌套。另外同步方式读取，性能也高，文件一执行，就先去读取文件加载模块，以后想用的时候就能直接用了。）
let a = require('./a.js');
console.log(a);

function sum(a) {
    return function (b) {
        return a+b;
    }
}
let fn = sum('1');
fn('2');
// 通过读取文件内容 将内容包装到一个自执行函数中，默认返回module.exports作为函数的结果
// require('./a.js')这行代码相当于如下代码：
// let a = function (exports, require, module, __filename, __dirname) {
//     let a = 1;
//     module.exports = 'hello';
//     return module.exports;
// }(exports, require, module, __filename, __dirname)

// 调试Node代码 和浏览器调试方式基本一样
// 1.通过浏览器中调试代码 可能调试一些包使用，入webpack
// 2.vscode launch.json 进行调试 调试自己写的文件
// 3.在命令行中调试 