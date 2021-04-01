Promise.resolve().then(() => {
    console.log(0);// 1
    return Promise.resolve(4);
}).then((res) => {
    console.log("xx"+res)
})

Promise.resolve().then(() => {
    console.log(1);// 2
}).then(() => {
    console.log(2);// 3
}).then(() => {
    console.log(3);
}).then(() => {
    console.log(5);
}).then(() =>{
    console.log(6);
})

// 0 1 2 3 xx4 5 6

// https://www.jianshu.com/p/175c1560cf83