/**
 * 方法一：JSON.parse(JSON.stringify(xxx))
 * 
 * let obj = {name: 'yy', age: 10};
 * console.log(JSON.parse(JSON.stringify(obj)));
 * 
 * 缺点：无法支持复杂的数据类型，比如Date、Regex、Function、Symbol等，只能支持基本类型的拷贝。
 * 
 * Symbols 与 JSON.stringify()
 * 当使用 JSON.stringify() 时，以 symbol 值作为键的属性会被完全忽略：

 * JSON.stringify({[Symbol("foo")]: "foo"});// '{}'
 * 
 */

/**
 * 方法二：for in循环
 * 
 * let obj = {name: 'yy', age: 10};
 * function clone_forin(source) {
 *    let target = {};
 *    for (const key in source) {
 *        target[key] = source[key];
 *    }
 *    return  target;
 * }
 * console.log(clone_forin(obj));
 * 
 * 缺点：无法支持深拷贝
 */

// 说到深拷贝，就要提及JS里的数据类型，基本数据类型拷贝的时候是直接拷贝，把值拷贝过来就行了，但是引用类型不是，引用类型需要深度递归
// 基本数据类型：number、string、null、undefined、boolean、symbol
// 引用类型：object、function、regex、date、array

// let obj = {
//     name: 'yy', 
//     age: 10,
//     home: {
//         name: 'shandong'
//     },
//     hobbies: ['study', 'movie', 'music']
// };

/**
 * 方法三：支持对象和数组的深拷贝
 */

// function clone_obj_arr(source) {
//     if (typeof source === 'object') {
//         let target = Array.isArray(source) ? [] : {};
//         for (const key in source) {
//             target[key] = clone_obj_arr(source[key]);
//         }
//         return target;
//     }
//     return source;
// }

// let obj2 = clone_obj_arr(obj);
// obj2.home.name = 'beijing';
// console.log(obj);
// console.log(obj2);

/**
 * 方法四：解决循环引用问题
 * 
 * 方法三有个问题，按照clone_obj_arr的写法，如果出现了obj.obj = obj，
 * 然后再进行深拷贝，那么就会出现obj的循环引用，递归的时候就会造成爆栈。
 * 
 * 使用Map数据结构创建一个对象，可以解决此问题。
 * 
 * map的key是原始对象的内存地址，值是克隆后的对象的内存地址。
 * 
 * 该解决办法解决的是防止无限制的递归导致爆栈，并不影响对象的循环引用。
 */

function clone_obj_arr(source, map = new Map()) {
    if (typeof source === 'object') {
        if (map.get(source)) {
            // 等到复制到Obj属性时，发现有第一次调用函数的时候，记录的map.get(obj)，因此不再递归，直接返回其值，这样就可以防止爆栈了
            return map.get(source);
        }
        let target = Array.isArray(source) ? [] : {};
        map.set(source, target);// 第一次调用函数的时候，就会记录上map.set(obj, {})
        for (const key in source) {
            target[key] = clone_obj_arr(source[key], map);
        }
        return target;
    }
    return source;
}

// let obj2 = clone_obj_arr(obj);
// obj.obj = obj;
// obj2.home.name = 'beijing';
// console.log(obj);
// console.log(obj2);
// console.log(obj.obj.obj.obj);// 该解决办法解决的是防止无限制的递归导致深度克隆时爆栈，并不影响对象的循环引用。
// console.log(obj.obj.obj.obj.obj.obj.obj);// 该解决办法解决的是防止无限制的递归导致深度克隆时爆栈，并不影响对象的循环引用。

// 目前，方法四，是比较完善的一个深拷贝实现，但是仍有缺陷，目前它只支持基本数据类型、普通对象类型和数组类型，像Date类型、Regex类型、Function类型等都还不支持，因此下面要在深拷贝中支持这些类型。

/**
 * 方法五：精确类型
 * 
 * 该深拷贝的方法要支持所有的数据类型
 * 
 * 1.JS判断类型方式有：
 * 1.1 typeof
 *  - 返回结果都是字符串
 *  - 字符串中包含了对应的数据类型：number、string、boolean、undefined、symbol
 *  - typeof null === 'object'
 *  - typeof {} === 'object'
 *  - typeof [] === 'object'
 *  - typeof /&$/ === 'object'
 *  - typeof Date === 'object'
 * 
 * 1.2 instanceof（原理是：a instanceof A -> a.__proto__ === A.prototype）
 * 
 * 1.3 Object.prototype.toString.call（这个是最全的类型判断）
 * 
 */

/*
    Object.prototype.toString.call(xxx)打印已知的数据类型有下面几种：

    [object Boolean]
    [object Number]
    [object String]
    [object Null]
    [object Undefined]
    [object Symbol]
    [object Object]
    [object Function]
    [object Array]
    [object Error]
    [object RegExp]
    [object Math]
    [object JSON]
    [object HTMLDocument]
    [object Window]
*/

let obj = {
    married: true,
    age: 10,
    name: 'Yyang',
    girlfriend: null,
    boyfriend: undefined,
    flag: Symbol('man'),
    home: { name: '北京' },
    set: new Set(),
    map: new Map(),
    getName: function () { },
    hobbies: ['抽烟', '喝酒', '烫头'],
    error: new Error('我错了'),
    pattern: /^regexp$/ig,
    math: Math,
    json: JSON,
    // document: document,
    // window: window
};

obj.set.add(1);
obj.map.set('name', 'yyang');
obj.obj = obj;

// 首先对类型进行分类
let OBJECT_TYPES = [{}, [], new Map(), new Set(), new Error(), new Date(), /^$/].map(item => getType(item));// 引用类型都在这了，除了这些，都是基本类型
let MAP_TYPE = getType(new Map());
let SET_TYPE = getType(new Set());
let SYMBOL_TYPE = getType(Symbol('1'));
let REGEX_TYPE = getType(/^$/);
let CONSTRUCTOR_TYPE = [new Error(), new Date()].map(item => getType(item));

// console.log("OBJECT_TYPES:",OBJECT_TYPES);// ["[object Object]", "[object Array]", "[object Map]", "[object Set]", "[object Error]", "[object Date]", "[object RegExp]"]
// console.log("MAP_TYPE:",MAP_TYPE);// [object Map]
// console.log("SET_TYPE:",SET_TYPE);// [object Set]
// console.log("SYMBOL_TYPE:",SYMBOL_TYPE);// [object Symbol]
// console.log("REGEX_TYPE:",REGEX_TYPE);// [object RegExp]
// console.log("CONSTRUCTOR_TYPE:",CONSTRUCTOR_TYPE);// ["[object Error]", "[object Date]"]

function getType(source) {
    return Object.prototype.toString.call(source);
}

function cloneDeep(source, map = new Map()) {
    let type = getType(source);
    if (!OBJECT_TYPES.includes(type)) {
        return source;// 如果不是对象类型，那就是基本类型，直接返回
    }
    if (map.get(source)) {
        return map.get(source);// 处理循环引用问题
    }
    if (CONSTRUCTOR_TYPE.includes(type)) {
        return new source.constructor(source);// new Date(oldDate); new Error(oldError)
    }

    let target = new source.constructor();// 创建一个空对象
    map.set(source, target);

    if (SYMBOL_TYPE === type) {
        return Object(Symbol.prototype.valueOf.call(source)); // 如果是symbol类型，先拿到原始值，然后再包装成对象。包装对象在引用是，会调用valueOf方法获取其原始值。
    }
    
    if (REGEX_TYPE === type) {
        const flags = /\w*$/;
        let target = new source.constructor(source.source, flags.exec(source));
        target.lastIndex = source.lastIndex;// 正则可能被执行过了，我们要清空它的lastIndex（是上次匹配过的索引）
        return target;
    }
    
    if (SET_TYPE === type) {
        source.forEach(value => {
            target.add(cloneDeep(value, map));// 深度递归克隆
        });
        return target;
    }

    if (MAP_TYPE === type) {
        source.forEach((value, key) => {
            target.set(key, cloneDeep(value, map));// 深度递归克隆
        });
        return target;
    }

    // 剩下的就是普通的对象{xxx}和数组了[xxx]
    // for (const key in source) {
    //     target[key] = cloneDeep(source[key], map);// 对象或数组还需要深度递归拷贝
    // }
    let keys = Object(source);
    let length = keys.length;
    let index = 0;
    while (index < length) {
        target[keys[index]] = cloneDeep(source[keys[index]], map);
    }

    return target;
}

let obj2 = cloneDeep(obj);
console.log(obj2);

console.log(obj.home === obj2.home);// false
console.log(obj.set === obj2.set);// false
console.log(obj.map === obj2.map);// false

// let reg = /\.jpg$/gi;
// const flags = /\w*$/;
// console.log(reg.source);// \.jpg$  返回正则表达式的匹配模式
// console.log(flags.exec(reg));// [ 'gi', index: 8, input: '/\\.jpg$/gi', groups: undefined ]

// let r = /bo+/;
// let str1 = "A ghost booooed";
// let str2 = "A ghost boed";
// let str3 = "A ghost bed";
// console.log(r.test(str1));
// console.log(r.test(str2));
// console.log(r.test(str3));