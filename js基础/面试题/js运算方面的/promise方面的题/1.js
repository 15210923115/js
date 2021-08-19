const promise = Promise.resolve('fe').then(res => {
    console.log("1:",res);// 顺序3 - 'fe'
    return promise2;// 注意：这里返回的是一个Promise
}).then(res => {
    console.log("2:", res + 2);// 顺序6 - 7
});

const promise2 = new Promise((resolve, reject) => {
    console.log("3:", 'in'); // 顺序1 - 'in'
    resolve(5);
    return 996;
})

setTimeout(() => {
    promise3.then(res => {
        console.log("4:", res);// 顺序7 - undefined
    }, err => {
        console.log("5:", err)
    })
}, 0);

const promise3 = promise2.then(res => {
    console.log("6:", res);// 顺序4 - 5
    throw new Error("我错了");
}).catch(err => {
    console.log("7:", err);// 顺序5 - Error: 我错了
})

console.log("8:", 'ke');// 顺序2 - 'ke'
// 正确的答案：
// 3: in
// 8: ke
// 1: fe
// 6: 5
// 7: Error: 我错了
// 2: 7
// 4: undefined

// 我一开始的答案：
// in
// ke
// fe
// promise2 + 2 resolved
// 5 
// Error: 2
// 'res: ', undefined


