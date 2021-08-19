// const arr = [1, 2, 3, 4, [1, 2, 3, [1, 2, 3, [1, 2, 3]]], 5, "string", { name: "弹铁蛋同学" }]

// 首先使用 reduce 展开一层
// console.log(arr.reduce((pre, cur) => {
//     return pre.concat(cur)
// }, []));
// [1, 2, 3, 4, 1, 2, 3, [1, 2, 3, [1, 2, 3]], 5, "string", { name: "弹铁蛋同学" }];

// 用 reduce 展开一层 + 递归
// const flat = arr => {
//   return arr.reduce((pre, cur) => {
//     return pre.concat(Array.isArray(cur) ? flat(cur) : cur);
//   }, []);
// };
// console.log(flat(arr));
// [1, 2, 3, 4, 1, 2, 3, 1, 2, 3, 1, 2, 3, 5, "string", { name: "弹铁蛋同学" }];

// reduce + 递归
// function flat(arr, num = 1) {
//     return num > 0 ? arr.reduce((pre, cur) => {
//         return pre.concat(Array.isArray(cur) ? flat(cur, num - 1) : cur);
//       },[]) : arr.slice();
// }
// const arr = [1, 2, 3, 4, [1, 2, 3, [1, 2, 3, [1, 2, 3]]], 5, "string", { name: "弹铁蛋同学" }]
// console.log(flat(arr, 2));
// [1, 2, 3, 4, 1, 2, 3, 1, 2, 3, 1, 2, 3, 5, "string", { name: "弹铁蛋同学" }];

const arr = [1, 2, 3, 4, [1, 2, 3, [1, 2, 3, [1, 2, 3]]], 5, "string", { name: "弹铁蛋同学" }]
// Array.prototype.flat = function (deep) {
//     var arr = this;
//     if (deep > 0) {
//         return arr.reduce((pre, cur) => {
//             return pre.concat(Array.isArray(cur) ? cur.flat(deep-1): cur);
//         }, []);
//     }
//     return arr.slice();
// }
// console.log(arr.flat(0));

Array.prototype.flat = function (deep) {
    let arr = this;
    if (deep > 0) {
        return arr.reduce((pre, cur)=>{
            return pre.concat(Array.isArray(cur) ? cur.flat(deep-1) : cur);
        },[]);
    }
    return arr.slice();
}
console.log(arr.flat(1));