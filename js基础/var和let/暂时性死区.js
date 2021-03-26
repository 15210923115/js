// 不存在变量提升
'use strict';
function func(){// 行1
    console.log(i);// 行2
    let i;// 行3
};
func(); // Uncaught ReferenceError: Cannot access 'i' before initialization

// 从行1开始，到行3之前，不能提前访问变量a，称之为暂时性死区，如果提前访问会报错Uncaught ReferenceError: Cannot access 'a' before initializations

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