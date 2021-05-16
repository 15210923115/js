function foo() {
    let a = b = 0;
    a++;
    return a;
}
foo();
console.log(typeof a);// undefined
console.log(typeof b);// number

// 这个代码的重点在第二行，即:let a = b = 0。这个语句声明了一个局部变量a，但是它也声明了一个全局变量b。
// 在foo的函数作用域内或全局作用域中都没有声明变量b，因此JS引荐将b=0表达式解释为window.b=0。