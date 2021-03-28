/**
 * 问题：编写parse函数，实现访问对象里属性的值
 * 
 */

let obj = { a: 1, b: { c: 2 }, d: [1, 2, 3], e: [{ f: [4, 5, 6] }]};
let r1 = parse(obj, 'a');// = 1;
let r2 = parse(obj, 'b.c');// = 2;
let r3 = parse(obj, 'd[2]');// = 3;
let r4 = parse(obj, 'e[0].f[0]');// = 4;


console.log(r1);
console.log(r2);
console.log(r3);
console.log(r4);

// 方法1：
function parse1(obj, str) {
    let str1 = str.replace(/\[+|\]+|\.+/ig, '');
    let keys = str1.split('');

    for (let i=0; i < keys.length; i++) {
        if (!isNaN(parseInt(keys[i]))) {
            obj = obj[Number(keys[i])];
        } else {
            obj = obj[keys[i]];
        }
    }
    
    return obj;
}

// 方法2：
function parse2(obj, str) {
    let fn = new Function('obj', 'return obj.'+str);
    return fn(obj);
}

// 方法3：
function parse(obj, str) {
    str = str.replace(/\[(\d+)\]/g, '.$1');
    console.log(str);
    arr = str.split('.');
    arr.forEach(function (item) {
        obj = obj[item];
    })
    return obj;
}


