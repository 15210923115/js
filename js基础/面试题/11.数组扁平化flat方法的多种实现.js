/**
 * 问题：数组扁平化flat方法的多种实现
 */

 let arr = [
    [1],
    [2, 3],
    [4, 5, 6, [7, 8, [9, 10, [11]]]],
    12
];

// 方法1：
console.log(arr.flat(Infinity));

// 方法2：仅限于纯数字
console.log(arr.toString().split(',').map(item => Number(item)));

// 方法3：仅限于纯数字
console.log(JSON.stringify(arr).replace(/\[|\]/g, '').split(',').map(item => Number(item)));

// 方法4：此方法不会改变数据类型
let count = 1;// 可以计算数组的最大嵌套深度
while(arr.some(item => Array.isArray(item))){
    count++;
    arr = [].concat(...arr);// concat每次只能展开一层
}
console.log(arr, count);

// 方法5：
Array.prototype._flat = function(){
    let ret = [];
    let _this = this;
    function __flat(arr){
        
        for (let i=0; i<arr.length; i++) {
            let item = arr[i];
            if (Array.isArray(item)) {
                __flat(item);
            } else {
                ret.push(item);
            }
        }
    }
    __flat(_this);
    return ret;
}

console.log(arr._flat());