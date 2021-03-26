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

/**
 * 其实es6的“代码块里的”let和const也有变量提升，只是在变量赋值之前，变量是不能使用的，例如下面的代码：
 * {
 *      console.log(a);
 *      let a = 1;
 * }
 * 
 * 会报错：Uncaught ReferenceError: Cannot access 'a' before initialization
 * 
 * 由这个报错可以看出，肯定是进行了变量提升，要不然不会提示在a初始化之前不能访问使用。
 * 
 * 平时说的let和const不存在变量提示是不严谨的的，也是不正确的，但是大家都那么说，是因为表面上看着确实不像变量提升。
 */

 var s = 1;// window.a = global.variableEnvironment.a = 1; var在全局作用域下赋值，相当于给widow上赋值
 let x = 2;// global.lexicalEnvironment.b = 2，该操作并未在window上进行赋值，所以let声明的变量在window上拿不到
 console.log(window.s);// 1
 console.log(window.x);// undefined