// 面试题1：
let funs = [];
for (let i=0;i<6;i++) {// let会形成块级作用域
    funs.push(function(){
        console.log(i);
    });
}
funs[3]();// 3

let funs2 = [];
for (var i=0;i<6;i++) {
    funs2.push(function(){
        console.log(i);
    });
}
funs2[3]();// 6


// 面试题2：
for(var i=0;i<5;i++){
    setTimeout(()=>{
        console.log(i);//5个5
    },100) 
}

for(let j=0;j<5;j++){
    setTimeout(()=>{
        console.log(j);//0,1,2,3,4
    },100) 
}

// 解答：
// let是块级作用域，只能在代码块中起作用，在js中一个{}中的语句我们也称为叫一个代码块，每次循环会产生一个代码块，每个代码块中的都是一个新的变量i
// var是全局作用域，有变量提升的作用，所以在for中定义一个变量，全局可以使用，循环中的每一次给变量i赋值都是给全局变量i赋值。
// {}代表一个块，这个时候let声明的变量只在这个块中起作用，而这个块对var声明的变量不起作用。因为var是全局作用域。
