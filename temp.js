// // 写一个函数。输入一个无序数组，找到第二大的数字。
// let arr = [1,4,8,6];

// function second() {
//     let small = 0; 
//     let larger = 0;
//     if (arr.length == 0) return null;
//     if (arr.length == 1) return arr[0];

//     for (let i = 0; i < arr.length; ++i) {
//         if (arr[i] > larger) {
//             small = larger;
//             larger = arr[i];
//         } else if(arr[i] > small) {
//             small = arr[i];
//         }
//     }
    
//     return small;
// }

// console.log(second());

// function a(b) {
//     console.log(b);
//     var b = 1;
//     console.log(b);
// }
// a(2);
