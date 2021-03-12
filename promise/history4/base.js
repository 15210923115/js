let fs = require('fs');

let Promise = require('./promise');

// 注意原生的Promise库里，并没有Promise.deferred这么一个属性，是我们自己扩展的，这样扩展可以产生一个延迟对象，以前会这么用，现在不这么用了，都是直接new Promise()。
// Q库中，有Q.deferred这么一个属性方法，可以帮助我们产生一个延迟对象。Promise.deferred也是这个意思。

function read() {
    let dfd = Promise.deferred();
    fs.readFile('name.txt', 'utf8', function (err, data) {
        if (err) {
            dfd.reject(err);
        }
        dfd.resolve(data);
    });
    return dfd.promise;
}

read().then(data => {
    console.log(data);
}).catch(err => {// promise中的catch 指代的就是then没有成功的回调的一个别名而已
    console.log(err);
});

/**
 * promise是为了解决嵌套问题的，但是下面这个使用方式，又发生嵌套了。违背了promise的初衷，因此这样使用不合适。

   function read() {
        return new Promise((resolve, reject) => {// 一层
            fs.readFile('name.txt', 'utf8', function (err, data) {// 二层
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    read().then(data => {
        console.log(data);
    });

 * 解决办法：使用Promise.deferred产生一个延迟对象，避免发生代码嵌套。
 * 这就是面试会问到的Promise.deferred可以解决什么问题。

 */
