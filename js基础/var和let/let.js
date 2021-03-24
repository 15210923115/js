// 允许块级作用域任意嵌套
// 外层作用域无法读取内层作用域的变量
// 内层作用域可以定义外层作用域的同名变量
// 函数本身的作用域在其所在的块级作用域之内

'use strict'
function fn() {
    console.log("out");
}
(function () {
    if (false) {
        // 函数本身的作用域在其所在的块级作用域之内
        function fn() {
            console.log("in");
        }
    }
    fn();// out
}());