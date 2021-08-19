// 方法1
let count = 0;
let arr = [1,2,3]
function print() {
    console.log(arr[count++]);
}

function exe(timer, cb) {
    return new Promise(resolve => {
        setTimeout(()=>{
            cb();
            resolve();
        },timer)
    });
}

function step() {
    Promise.resolve().then(()=>{
        return exe(1000, print);
    }).then(()=>{
        if (count == 3) {
            return;
        }
        step();
    });
}

step();

// 方法
let list = [1,2,3];

list.reduce((p, e)=>{
    return p.then(()=>{
        return new Promise(resolve=>{
            setTimeout(()=>{
                console.log(e);
                resolve()
            },1000);
        });
    });
}, Promise.resolve());