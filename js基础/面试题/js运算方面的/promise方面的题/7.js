Promise.resolve().then(()=>{
    console.log("1");
    return true;
}).then(()=>{
    console.log("2");
    return true;
}).then(()=>{
    console.log("3");
})

Promise.resolve().then(()=>{
    console.log("4");
    return true;
}).then(()=>{
    console.log("5");
});

// 1
// 4
// 2
// 5
// 3
