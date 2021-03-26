// 全局变量：在if或者for循环中声明的变量会变成全局变量
for(var i=0;i<=5;i++){
    console.log("hello");
}
console.log(i); // 6

// 内层变量可能会覆盖外层变量
var a = 1;
function fn() {
  console.log(a);
  if (false) {
      var a = 2;// 进行变量提升，将a变量提升到fn函数上下文的顶部
  }
}
fn(); // undefined

/**
 * 
var a = 1;
function fn() {
  console.log(a);// 向外查找，发现全局有一个使用var声明的变量a
  if (false) {
      let a = 2;// 不会进行变量提升
  }
}
fn(); // 1

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