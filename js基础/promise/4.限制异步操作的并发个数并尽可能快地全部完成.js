let urls = [1,2,3,4,5,6,7,8,9,10];

function loadImg(url) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(url);
        }, parseInt(Math.random() * 1000));
    });
}

function limitLoad(urls, limit = 3, cb) {
    // 代码在这里写
    return new Promise((resolve) => {
        let result = new Array(urls.length).fill(null);
        
        const copyUrls = urls.map((url, index)=>{
            return {
                index,
                url
            };
        });
        
        const createImgPromise = (imgs) => {
            let imgObj = imgs.shift();
            
            loadImg(imgObj.url).then(res => {
                result[imgObj.index] = res;
                if (imgs.length) {
                    createImgPromise(imgs);
                }
                if (result.filter(item => item != null).length === urls.length) {
                    cb(result);
                    resolve(result)
                }
            })
        }
        while (limit > 0) {// 循环开启limit个异步请求操作，每个异步请求操作结束后，根据是否还有剩余未请求的资源，决定进行递归请求下一个资源
            limit -= 1
            createImgPromise(copyUrls)
        }
    })
}
function cb(value) {
    console.log(`执行完了，结果是${value}`);
}
limitLoad(urls, 3, cb).then(res => {
    console.log(res);
})