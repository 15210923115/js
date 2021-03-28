// 一、JSON.stringify的三个参数（出自：12.实现一个不可变对象.js）
let obj = {name: 'zf'};
console.log(JSON.stringify(obj, null, 2))

// 二、replace（出自：10.编写parse函数，实现访问对象里属性的值.js）
let str = 'e[0].f[0]';
str = str.replace(/\[(\d+)\]/g, '.$1');
console.log(str);

// 三、