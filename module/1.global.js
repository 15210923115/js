// 全局变量就是可以直接访问的变量
// 如果定义在global上的属性，肯定是一个全局变量

console.log(Object.keys(global));
// [
//     'global',
//     'clearInterval',
//     'clearTimeout',
//     'setInterval',
//     'setTimeout',
//     'queueMicrotask',
//     'clearImmediate',
//     'setImmediate'
//   ]


// node里面，默认在文件中打印this的问题

console.log(this);// 打印：{} 
// 为什么在模块里直接打印this，打印的结果是一个空对象（而不是global）呢？
// 因为在文件执行的过程中，默认文件会被加一层函数（主要是为了实现node的模块化功能，模块化的好处是多个文件可以相互独立，互不影响）。
// 查看node源码，可以看到有一个compilerWrapper.call(thisValue, exports, require, module, filename, dirname)方法，第一个参数就是exports，因此包裹函数调用call，将函数内部的this指向改成了exports，而本文件没有写关于exports的代码，所以默认空对象了
// 为了印证这个函数，可以直接打印arguments参数看看，如下：
console.log(arguments);
// 打印结果是：
// [Arguments] {
//     '0': {}, 
//     '1': [Function: require] {...},
//     '2': Module {...},
//     '3': '/Users/yangyang/Documents/zf/js/module/1.global.js',
//     '4': '/Users/yangyang/Documents/zf/js/module'
// }
// 可以看到，能直接打印出结果，因为arguments是函数里特有的参数，因此可以证明整个模块是被一个函数包裹着的
// 参照arguments的打印结果，可以知道这个函数的参数分别是：exports require Module __filename __dirname，
// 这几个参数是通过函数参数的形式传递到模块里的，因此在模块里（文件中）可以直接访问到这些变量，所以我们给这些变量也叫全局变量

console.log(__filename); // /Users/yangyang/Documents/zf/js/module/1.global.js
// __filename代表的是当前运行的这个文件，是绝对路径

console.log(__dirname);// /Users/yangyang/Documents/zf/js/module
// __dirname代表的是当前运行的文件所在的文件夹

console.log(process.cwd());// /Users/yangyang/Documents/zf/js
// process.cwd()代表的是当前文件的工作目录

// node中为了实现模块化，帮我们传入了其中的exports、require和Module这三个参数

// 模块化 1.可以帮助我们解决命名冲突的问题（因为每个文件外面都会被包装一层函数） 2.高内聚低耦合（把相关的代码放到同一个模块中，不相干的放到另一个模块中，实现模块之间的独立）

// node的模块规范：common.j规范。
// common.js规范：1.每个js文件都是一个模块 2.模块导出 module.exports 3.模块导入 require

// 常用的模块规范：
// 1.esModule 是es6的模块规范 import export 
// 2.cmd sea.js
// 3.amd require.js

// 4.为了兼容不同的的模块规范，出现了umd，它不代表具体的模块规范，代表的是统一模块规范，它支持common.js、cmd和amd这三个规范，es6的模块规范不支持。

// common.js规范和es6模块规范的区别：
// node中默认不支持es6模块规范（如果想使用的话，需要用babel进行转译），虽然node不支持es6模块规范，但是大部分的es语法都是支持的
// common.js规范是动态引入（随用随取）：能放在代码的的任意地方去引入或者导出，比如可以在某个代码块里if (true) {require('xxx.js')}使用require引入某个模块
// es6模块规范是静态引入（需在全局环境中提前引入）：即只能放在代码的最外层去（全局环境）引入或者导出，比如不能在代码块里使用import引入模块，只能在代码的最外层引入，例如如下代码：
// import a from 'xx.js';
// if (true) {
//     console.log(a);
// }
// 不能是if (true) {import a from 'xx.js';console.log(a);}，即不能这样使用import

// node为了实现模块化，它把每个文件都包装成了一个函数，这样可以解决命名问题和引用问题。
// 那么问题来了，我包装成一个函数，就可以实现相互独立了吗？
// node中的模块化实现 等价于 webpack模块化实现 （所以我们需要搞懂node中的模块是如何加载的）
// node中的模块可以分为三类：
// 1.核心模块（内置模块） fs http path stream
// 2.第三方模块
// 3.自定义模块（自己写的）



// 面试题：node中可以使用es6模块规范吗？
// 可以。如下两种办法：
// 1.node最新的版本支持es6模块规范，但是文件模块的命名需要以.mjs作为后缀，而不是.js。（目前还没推广开，几乎没人用）
// 2.目前开发，你希望在node中使用es6模块规范的话，需要使用babel-node插件，把代码里的es6模块代码转译成符合common.js规范的模块代码。