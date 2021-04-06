const Promise = require('./selfwrite');

new Promise(function(resolve, reject){
    reject('err');
    // setTimeout(()=>{
    //     resolve('ok');
    // },1000);

    // resolve(new Promise((resolve, reject)=>{
    //     resolve();
    // }));
    
}).then((data) => {
    console.log("then的成功1:", data);
    return 'then1 成功的返回值';
}, (err) => {
    console.log("then的失败1:", err);
    return 'then1 失败的返回值';
}).then((data) => {
    console.log("then的成功2:", data);
    return 'then2 成功的返回值';
}, (err) => {
    console.log("then的失败2:", err);
    return 'then2 失败的返回值';
}).then((data) => {
    console.log("then的成功3:", data);
}, (err) => {
    console.log("then的失败3:", err);
});
