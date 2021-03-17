// 深拷贝 拷贝后的结果更改了是不会影响拷贝前的（拷贝前后是没有关系）
// 浅拷贝 改变拷贝前的内容，会对拷贝后的内容又影响（拷贝前和拷贝后是有关系的）
const log = console.log;
// 区别就在于拷贝前后是否还存在引用关系
// ...运算符只能拷贝一层（浅拷贝）
// Array.slice()（浅拷贝）
// JSON.parse(JSON.stringify(x))（深拷贝，但是功能不完整，不能实现函数和undefined的拷贝）

// let obj = { 
//     name: 'jw',
//     address: {
//         x: 100,
//         y: 100
//     }
// };

// let o = {...obj};
// obj.address.x = 200;
// console.log(obj, o);

// let a = [1,2,3];
// let arr = [a];
// let newArr = arr.slice(); // [00ffff] 相当于只拷贝了一个地址
// newArr[0][0] = 100;
// console.log(arr);

// 深拷贝
// let obj2 = { 
//     name: 'jw',
//     address: {
//         x: 100,
//         y: 100
//     },
//     f: function(){},
//     un: undefined,
//     nu: null
// };
// let o2 = JSON.parse(JSON.stringify(obj2));// 可以实现深拷贝，但是工能不完整，如果对象的属性值是函数或者undefined，是不能被拷贝的
// obj2.address.x = 200;
// console.log(obj2, o2);

// 实现一个深拷贝 可以递归拷贝
function deepClone(obj, hash = new WeakMap()) {
    if (obj === null|| obj === undefined) return obj;// 如果是null或者undefined 我就不拷贝
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof RegExp) return new RegExp(obj);
    // 可能是对象 或者 普通值
    // 如果是函数的话，是不需要深拷贝的
    if (typeof obj !== 'object') return obj;
    // 是对象的话，进行深拷贝
    if (hash.get(obj)) return hash.get(obj);
    // 可能是[] {}  Object.prototype.toString.call(obj) == "[object Array]" ? [] : {}
    let cloneObj = new obj.constructor;
    hash.set(obj, cloneObj);
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            // 实现一个递归拷贝
            cloneObj[key] = deepClone(obj[key], hash);
        }
    }
    return cloneObj;
}
let obj = {name:1, address: {x: 100}};
obj.o = obj;
let d = deepClone(obj);
log(d);

// 如果对象复杂一点，例如循环引用，也就是对象自己引用自己，会造成无限递归，直接爆栈