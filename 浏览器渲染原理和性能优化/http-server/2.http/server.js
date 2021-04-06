const http = require('http');
const fs = require('fs');
const path = require('path');

// 浏览器就是一个能发送http请求并且能解析文件的软件
const server = http.createServer((req, res)=>{
    console.log(req.headers);

    res.end(fs.readFileSync(path.resolve(__dirname, 'index.html')));
});

server.listen(3000);