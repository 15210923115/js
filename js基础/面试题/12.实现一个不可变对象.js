/**
 * 问题：实现一个不可变对象
 * 
 * 不可改变的严格度：不可扩展 < 密封 < 冻结
 * 
 * 1.无论是不可扩展，密封，还是冻结，都是浅层控制的，即只控制对象本身属性的增删改。
 * 如果对象属性是一个引用类型，比如数组 subArr 或对象 subObj等，虽然subArr、subObj的不可被删改，
 * 但subArr、subObj 的属性仍然可增删改。
 * 
 * 2.由于每个对象都有一个属性__proto__,该属性的值是该对象的原型对象，也是引用类型，
 * 由于冻结是浅层的所以原型对象并不会被连着冻结，仍然可以通过给对象的原型对象加属性达到给当前对象新增属性的效果。
 * 所以如果想进一步冻结还需要把原型对象也冻结上。
 */

/**
 * 一、不可扩展
 * 
 * 1.Object.preventExtensions()可以使一个对象不可再添加新的属性，参数为目标对象，返回修改后的对象。
 * 
 * 增加（×）删除（√）修改（√）
 * 
 */

// let obj = { name: 'yy' };
// console.log(Object.isExtensible(obj));// true 可扩展
// Object.preventExtensions(obj);
// console.log(Object.isExtensible(obj));// false 不可扩展
// obj.age = 10;
// console.log(JSON.stringify(obj, null, 2));// {"name": "yy"} 不能新增属性
// delete obj.name;
// console.log(JSON.stringify(obj, null, 2));// {} 可以删除



/**
 * 二、密封
 * 
 * 1.Object.seal() 可以使一个对象无法添加新属性的同时，也无法删除旧属性。参数是目标对象，返回修改后的对象。
 * 2.其本质是通过修改属性的 configurable 为 false 来实现的。
 * 3.configurable 为 false 时，其他配置不可改变，writable 只能 true 变 false，且属性无法被删除。而由于只要 writable 或 configurable 其中之一为 true，则 value 可改，所以密封之后的对象还是可以改属性值的。
 * 4.Object.isSealed() 可以检测一个对象是否密封，即是否可以增删属性。参数是目标对象，返回布尔值，true 代表被密封不可增删属性，false 代表没被密封可增删属性。
 * 
 * 增加（×）删除（×）修改（√）
 * 
 */

// let obj2 = {name: 'yy'};
// console.log(Object.isExtensible(obj2));// true 可扩展
// console.log(Object.isSealed(obj2));// false 没有密封
// console.log(Object.getOwnPropertyDescriptor(obj2, 'name'));// { value: 'yy', writable: true, enumerable: true, configurable: true }
// Object.seal(obj2);
// console.log(Object.getOwnPropertyDescriptor(obj2, 'name'));// { value: 'yy', writable: true, enumerable: true, configurable: false }
// obj2.name = 'zz';
// obj2.age = 30;
// delete obj2.name;
// console.log('delete:', delete obj2.name);// delete: false 意思是删除失败，不能删除了
// console.log(obj2);// { name: 'zz' } 可以修改值
// console.log(Object.isExtensible(obj2));// 不可扩展
// console.log(Object.isSealed(obj2));// 已经密封


/**
 * 三、冻结
 * 
 * 1.Object.freeze() 可以使对象一个对象不能再添加新属性，也不可以删除旧属性，且不能修改属性的值。参数是目标对象，返回修改后的对象。
 * 2.Object.isFrozen() 可以检测一个对象是否冻结，即是否可以增删改。参数是目标对象，返回布尔值，true 表示已经冻结不可再增删改，false 反之。
 * 
 * 增加（×）删除（×）修改（x）
 * 
 */


// let obj3 = {name: 'aa'};
// console.log(Object.isExtensible(obj3));// true 可扩展
// console.log(Object.isSealed(obj3));// false 没有密封
// console.log(Object.isFrozen(obj3));// 没有冻结
// Object.freeze(obj3);
// obj3.name = 'zz';
// obj3.age = 20;
// delete obj3.name;
// console.log(obj3);// { name: 'aa' } 增删改都不行
// console.log(Object.isExtensible(obj3));// 不可扩展
// console.log(Object.isSealed(obj3));// 已经密封
// console.log(Object.isFrozen(obj3));// 已经冻结
// Object.defineProperty(obj3, 'name', {// TypeError: Cannot redefine property: name
//     value: 'xx'
// })

// console.log(Object.getOwnPropertyDescriptor(obj2, 'name')); 
// 打印{ value: 'yy', writable: true, enumerable: true, configurable: true }
// 什么叫enumerable？就是枚举，意思是是否可以使用for in循环。

/**
 * 无论是不可扩展，密封，还是冻结，都是浅层控制的，即只控制对象本身属性的增删改。
 * 如果对象属性是一个引用类型，比如数组 subArr 或对象 subObj等，虽然subArr、subObj的不可被删改，
 * 但subArr、subObj 的属性仍然可增删改。
 * 
 * 问题：那么如何自己实现一个深度冻结呢？
 * 
 * 和深拷贝的实现思路是一样的
 */
let obj4 = {
    info: { name: 'yangyang' },
    arr: [1, 2, {rows: [3, 4]}]
};
function deepFreeze(obj) {
    let newObj = {};
    for (let key in obj) {
        let value = obj[key];
        if (typeof value === 'object') {
            newObj[key] = deepFreeze(value);
        }
        newObj[key] = Object.freeze(value);
    }
    return obj;
}
obj4 = deepFreeze(obj4);
obj4.info.name = 'java';
obj4.arr[2].rows[0] = 100;
console.log(obj4); 
console.log(obj4.arr[2].rows);