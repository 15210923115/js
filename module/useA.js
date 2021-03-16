// 调试Node代码 和浏览器调试方式基本一样
// 1.通过浏览器中调试代码 可能调试一些包使用，入webpack
// 2.vscode launch.json 进行调试 调试自己写的文件
// 3.在命令行中调试 

/**
 * launch.json配置：
    {
        // 使用 IntelliSense 了解相关属性。 
        // 悬停以查看现有属性的描述。
        // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
        "version": "0.2.0",
        "configurations": [
            {
                "type": "node",
                "request": "launch",
                "name": "启动程序",
                "skipFiles": [
                    "<node_internals>/**"
                ],
                "program": "${workspaceFolder}/module/useA.js"
            }
        ]
    }

    skipFiles字段指代断点需要跳过的代码，默认的"<node_internals>/**"值，表示跳过源码。
    
 */

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
