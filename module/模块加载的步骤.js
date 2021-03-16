let a = require('./a.js');

// 加载步骤：
// 1.Module._load 加载a模块
// 2.Module.resolveFilename 把相对路径转换成绝对路径
// 3.let module = new Module() 创建一个模块实例，实例里有两个重要的属性是id和exports
// 4.tryModuleLoad 尝试加载这个模块
// 5.通过不同的后缀进行加载 .json .js .node
// 6.Module._extensions 文件处理的方式
// 7.核心就是读取文件 （在源码里可以看到exports和module.exports，就是同一个东西，别名罢了）
// 8.给文件外层增加了一个函数 并且使用call的方式调用函数 第一个参数是thisValue（就是thisValue = exports，因此改变了一个模块内部的this指向，将其指向模块的exports）（具体参数是：this，exports，module，require，filename, dirname）
// 9.用户会给module.exports赋值（即一根模块里最终导出的内容）
// 10.最终返回的就是module.exports的值

console.log(this);