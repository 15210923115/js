const net = require('net');
const { parse } = require('path');
const HttpParser = require('./http-parser');
const HtmlParser = require('htmlparser2');
const css = require('css');

class HTTPRequest {
    constructor(options = {}){
        this.host = options.host;
        this.method = options.method || 'GET';
        this.path = options.path || '/';
        this.port = options.port || 80;
        this.headers = options.headers;
    }
    send() {
        return new Promise((resolve, reject)=>{
            // 构建http请求
            const rows = [];
            rows.push(`${this.method} ${this.path} HTTP/1.1`);// 模拟浏览器的请求行
            Object.keys(this.headers).forEach((key)=>{
                rows.push(`${key}: ${this.headers[key]}`);
            });

            let data = rows.join('\r\n') + '\r\n\r\n';

            let socket = net.createConnection({ // 创建tcp连接，传输http数据
                host: this.host,
                port: this.port
            }, ()=>{
                socket.write(data);
            });

            const parser = new HttpParser();

            socket.on('data', function(chunk){// 事件会触发多次
                // console.log(chunk.toString());
                parser.parse(chunk);
                if (parser.result) {
                    resolve(parser.result);
                }
            });

        });
    }
}
function parserCss(styleText){
    const ast = css.parse(styleText);
    console.dir(ast.stylesheet);
}
async function request() {
    const req = new HTTPRequest({
        host: '127.0.0.1',
        method: 'GET',
        port: 3000,
        path: '/',
        headers: {
            name: 'Yyang',
            age: 12
        }
    });

    let {responseLine, headers, body} = await req.send();
    // console.log('abcd');
    // 浏览器会根据响应类型来解析文件 Content-Type: 'text/html'
    // html -> html-parser -> dom tree 词法分析 分析html
    // 解析后需要生成tree，典型的栈型结构
    // console.log(body);
    let stack = [{
        type: 'document',
        children: []
    }];
    
    const parser = new HtmlParser.Parser({// 内部也是通过状态机
        onopentag(name, attributes) {
            let parent = stack[stack.length-1];
            let element = {
                tagName: name,
                attributes,
                children: [],
                parent
            }
            parent.children.push(element);
            stack.push(element);
        },
        ontext(text) {
            let parent = stack[stack.length-1];
            let textNode = {
                type: 'text',
                text
            };
            parent.children.push(textNode);
        },
        onclosetag(name) {
            let parent = stack[stack.length-1];
            if (name === 'style') {
                parserCss(parent.children[0].text);
            }
            stack.pop();
        }
    });
    parser.end(body);// 生成DomTree
    // console.dir(stack,{depth: null});
    // 解析样式
    
}
request();