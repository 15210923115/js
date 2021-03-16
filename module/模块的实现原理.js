const fs = require('fs');
const path = require('path');
const vm = require('vm');

function Module(id) {
    this.id = id;
    this.exports = {};// 代表的是模块的返回结果
}

Module.wrapper = [
    '(function(exports, require, module, __filename,__dirname){',
    '})'
];

Module._extensions = {
    '.js'(module) {
        let content = fs.readFileSync(module.id, 'utf8');
        content = Module.wrapper[0] + content + Module.wrapper[1];
        // 需要让函数字符串变成真正的函数
        let fn = vm.runInThisContext(content);
        // console.log(fn.toString());
        let exports = module.exports;
        let dirname = path.dirname(module.id);
        // 让包装的函数执行 require 时会让包装的函数执行，并且改变this指向
        fn.call(exports, exports, req, module, dirname, module.id);
    },
    '.json'(module) {
        let content = fs.readFileSync(module.id, 'utf8');
        module.exports = JSON.parse(content);
    }
}

Module._resolveFilename = function (filename) {
    let absPath = path.resolve(__dirname, filename);
    let isExists = fs.existsSync(absPath);
    if (isExists) {
        return absPath;
    } else {
        let keys = Object.keys(Module._extensions);
        for (let i=0; i<keys.length; i++) {
            let newPath = absPath + keys[i];
            let flag = fs.existsSync(newPath);
            if (flag) {
                return newPath;
            }
        }
        throw new Error('module not exists');
    }
}

Module.prototype.load = function () {
    let extname = path.extname(this.id);
    Module._extensions[extname](this);// module.exports = 'hello'
}

Module._cache = {};

function req(filename) {// 默认传入的文件名可能没有增加后缀，如果没有后缀我就尝试增加.js .json
    // 解析出绝对路径
    filename = Module._resolveFilename(filename);
    // 加载前先看一眼 是否加载过了
    let cacheModule = Module._cache[filename];
    if (cacheModule) {
        return cacheModule.exports; // 返回缓存的结果
    }
    // 创建一个模块
    let module = new Module(filename);
    Module._cache[filename] = module;// 创建缓存
    // 加载模块
    module.load();

    return module.exports;
}   

let a = req('./a');
// let b = req('./b');


console.log("a::::::",a);
// console.log(b);

// 注意exports 和 module.exports 的关系 exports = module.exports = {};

// 为啥module.exports的值已经改了，可打印的this还是{}？
// 答：因为module.exports原来是指实例里的exports属性，绑定的是一个对象，但是在模块导出的时候，
// module.exports又被重新赋值了，和实例里原来的那个对象切断了关系
// 二在require包的时候，给模块封装了一层函数，那个函数使用call调用的，第一个参数是exports，
// 而源码里有let exports = module.exports，exports指向的还是原来的对象，原来的对象是{}，所以打印出来的this是{}

// exports和module.exports一样，为啥不直接输出exports？
// 答：方便使用