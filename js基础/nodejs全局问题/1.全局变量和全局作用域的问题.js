/**
    在nodejs环境中：
        * 没有全局作用域的概念，只有模块作用域和函数作用域，如果使用es6语法，还包括“块级作用域”。
        * 全局对象是global。

    在浏览器环境中：
        * 有“全局作用域”和“函数作用域”的概念，es6中还包括“块级作用域”。
        * 全局对象是window。
    
    为什么nodejs中，没有全局作用域的概念？因为nodejs是按照模块来划分的，每个文件都是一个独立的文件模块，
    每个文件模块都具有模块作用域，在这个模块作用域中定义的变量在模块自身当中是全局的。

    下面的五个对象在所有的模块中都可用。以下的变量虽然看似全局的，但实际上不是。它们仅存在于模块的作用域中，参见nodejs模块系统的文档：

    * __dirname
    * __filename
    * exports
    * module
    * require()
    
    此处列出的对象特定于 Node.js环境中。有些内置对象是JavaScript语言本身的一部分，它们也是全局可访问的。
 */

/**
    模块封装器：

    在执行模块代码之前，Node.js 会使用一个如下的函数封装器将其封装：

    (function(exports, require, module, __filename, __dirname) {
        // 模块的代码实际上在这里
    });

    通过这样做，Node.js 实现了以下几点：
        1. 它保持了顶层的变量（用 var、 const 或 let 定义）作用在模块范围内，而不是全局对象。
        2. 它有助于提供一些看似全局的但实际上是模块特定的变量，例如：
        3. 实现者可以用于从模块中导出值的 module 和 exports 对象。
        4. 包含模块绝对文件名和目录路径的快捷变量 __filename 和 __dirname 。

 */

// 例子：虽然下面这段代码可以在浏览器中正常运行，但在 Node.js 中 f1() 会产生一个“找不到变量 x ”的 ReferenceError。
// 这是因为在 Node 中顶级作用域不是全局作用域，而 x 其实是在当前模块的作用域之中。
var x = 10;

function createFunction1() {
    var x = 20;
    return new Function('return x;'); // 这里的 x 指向最上面全局作用域内的 x
}

function createFunction2() {
    var x = 20;
    function f() {
        return x; // 这里的 x 指向上方本地作用域内的 x
    }
    return f;
}

var f1 = createFunction1();
console.log(f1());// 在浏览器环境中输出10，在node环境中报错：ReferenceError: x is not defined
var f2 = createFunction2();
console.log(f2());// 20
