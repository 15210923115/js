// 题目：实现mergePromise函数，把传进去的数组按顺序先后执行，并且把返回的数据先后放到数组data中。

const time = (timer) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, timer)
    })
}
const ajax1 = () => time(2000).then(() => {
    console.log(1);
    return 1
})
const ajax2 = () => time(1000).then(() => {
    console.log(2);
    return 2
})
const ajax3 = () => time(3000).then(() => {
    console.log(3);
    return 3
})

async function mergePromise(ajaxs) {
    // 在这里写代码
    let result = [];
    return new Promise(async resolve=>{
        for (let i=0; i<ajaxs.length; i++) {
            let temp = await ajaxs[i]();
            result.push(temp);
            if (i==ajaxs.length-1) {
                resolve(result);
            }
        }
    });
}

mergePromise([ajax1, ajax2, ajax3]).then(data => {
    console.log("done");
    console.log(data); // data 为 [1, 2, 3]
});

