// var定义的变量没有块的概念，可以跨块访问，不能跨函数访问，有变量提升，可重复声明
// let定义的变量，只能在块作用域里访问，不能跨块访问，也不能跨函数访问，无变量提升，不可以重复声明
// let 声明的变量只在块级作用域内有效，不存在变量提升，而是绑定在暂时性死区
// 或者说let变量提升了，但是在let声明变量前不能使用该变量，这特性叫暂时性死区(temporal dead zone)
// 如果有重复变量let会在编译阶段报错

{
    let a = 10;
    {
        console.log(a);// Uncaught ReferenceError: Cannot access 'a' before initialization
        // 该块级作用域在编译阶段，检测到有变量a了，因此不能提前访问a
        let a = 20;
    }
}

{
    let b = 10;
    {
        console.log(b);// 10
    }
}


/**

{
    let a = 10;
    {// 行1
        console.log(a);// 行2
        let a = 20;// 行3
    }
}

从行1开始，到行3之前，不能提前访问变量a，称之为暂时性死区，如果提前访问会报错Uncaught ReferenceError: Cannot access 'a' before initializations

 */

/**

{
    console.log(1);
    let a = 10;
    let a = 20;
}

上面代码，不会打印1，而是会报错Uncaught SyntaxError: Identifier 'a' has already been declared
说明了，let在编译阶段，就会检查是否重复声明，因此还没到执行阶段，就报错了
 */
