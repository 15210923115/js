// 一、JSON.stringify的三个参数（出自：12.实现一个不可变对象.js）
let obj = {name: 'zf'};
console.log(JSON.stringify(obj, null, 2))

// 二、replace（出自：10.编写parse函数，实现访问对象里属性的值.js）
let str = 'e[0].f[0]';
str = str.replace(/\[(\d+)\]/g, '.$1');
console.log(str);

// 三、在控制台输入：[]+{}，回车之后，控制台返回的是"[object Object]"
console.log([]+{});// "[object Object]"

// 四、箭头函数不能new
let Arrow = () => {};
// new Arrow();// TypeError: Arrow is not a constructor