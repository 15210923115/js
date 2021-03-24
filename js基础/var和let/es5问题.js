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