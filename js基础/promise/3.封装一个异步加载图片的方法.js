function loadImg(url) {
    // 代码在这里写
    return new Promise((resolve, reject)=>{
        let img = new Image();
        img.onload = function(){
            resolve(img);
        }
        img.onerror = function(){
            reject(new Error(`Could not load image at ${url}`));
        }
        img.src = url;
    });
}
