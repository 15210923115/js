## 问题描述
需要解决前端pc跟服务端(java)，跨域后都能获取到同一个cookie。
> 使用二级域名共享cookie有一个限制条件，就是两个域名的二级域名必须相同

* 前端pc访问域名：a.b.com
* 后端接口域名：a-gateway.b.com
* 这两个域名同属一个二级域名：b.com

## 跨域访问
服务器nginx增加以下配置，即可解决跨域访问的问题。也可以在程序中通过代码解决跨域访问。

* nginx配置文件
    ```sh
    location / {
        #是否允许跨域发送Cookie
        add_header Access-Control-Allow-Credentials true;
        add_header Access-Control-Allow-Origin 'http://a.b.com';
        add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
        add_header Access-Control-Allow-Headers 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization';

        if ($request_method = 'OPTIONS') {
            return 204;
        }
    }
    ```
## 跨域携带发送cookie
如果需要允许跨域携带发送cookie的话，nignx则需要以下参数配置

* nginx配置  
    1. "Access-Control-Allow-Credentials"：可选字段。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。设为true，即表示服务器明确许可，Cookie可以包含在请求中，一起发给服务器。这个值也只能设为true，如果服务器不要浏览器发送Cookie，删除该字段即可。
    2. 对于附带身份凭证的请求，服务器不得设置 Access-Control-Allow-Origin 的值为'*'。这是因为请求的首部中携带了Cookie信息，如果 Access-Control-Allow-Origin 的值为'*'，请求将会失败。而将 Access-Control-Allow-Origin 的值设置为 http://a.b.com，则请求将成功执行。也就是说Access-Control-Allow-Credentials设置为true的情况下
    Access-Control-Allow-Origin不能设置为*。

* 前端配置  
    以vue请求为例：
    ```js
    import axios from 'axios';
    axios.defaults.withCredentials=true //允许携带cookie
    ```

* java设置cookie
    ```js
    public static void  addCookie(HttpServletResponse response,String cookieName,String cookieValue,int maxAge){
        Cookie cookie  =new Cookie(cookieName,cookieValue);
        cookie.setDomain("b.com");//指定域名
        cookie.setPath("/");//设置cookie的生命周期
        cookie.setHttpOnly(false);
        if(maxAge>0){
            cookie.setMaxAge(maxAge);
        }
        response.addCookie(cookie);
    }
    ```

## 总结cookie跨域问题
* 同源ajax请求是可以自动携带cookie的
* 而非同源ajax请求不会自动携带cookie，需要客户端和服务端都做处理：
    1. 客户端需要对xhr对象设置withCredentials:true
    2. 服务端需要设置响应头 access-control-allow-credentials:true
    同时必须指明  access-control-allow-origin 为服务方的origin， 不能为*

    
为了防止`CSRF攻击`，服务端要给cookie设置`same-site`为`strict`模式。在Strict模式下，浏览器完全禁止第三方请求携带Cookie。比如请求a.com网站只能在a.com域名当中发起请求才能携带Cookie，在其他网站请求都不能。

## 了解一下cookie的作用域
* cookie的作用域就是domain和path。
* `domain`：指定 cookie 可以送达的主机名。假如没有指定，那么默认值为当前文档访问地址中的主机部分（但是不包含子域名）。与之前的规范不同的是，域名之前的点号会被忽略。假如指定了域名，那么相当于各个子域名也包含在内了。
* `path`：指定一个 URL 路径，这个路径必须出现在要请求的资源的路径中才可以发送Cookie首部。字符%x2F("/")可以解释为文件目录分隔符，此目录的下级目录也满足匹配的条件（例如，如果 path=/docs，那么"/docs", "/docs/Web/" 或者 "/docs/Web/HTTP" 都满足匹配的条件）。

## cookie的其它参数：
* `HttpOnly`：设置了HttpOnly属性的cookie不能使用JavaScript经由Document.cookie属性、XMLHttpRequest和Request APIs进行访问，`以防范跨站脚本攻击（XSS (en-US)）`。
* Secure：一个带有安全属性的cookie只有在请求使用SSL和HTTPS协议的时候才会被发送到服务器。
* Max-Age：在cookie失效之前需要经过的秒数。秒数为0或-1将会使cookie直接过期。一些老的浏览器（ie6、ie7 和 ie8）不支持这个属性。对于其他浏览器来说，假如二者（指 Expires 和Max-Age）均存在，那么Max-Age优先级更高。
* Expires：cookie的最长有效时间，形式为符合HTTP-date 规范的时间戳。参考Date可以获取详细信息。如果没有设置这个属性，那么表示这是一个会话期cookie。一个会话结束于客户端被关闭时，这意味着会话期cookie在彼时会被移除。然而，很多Web浏览器支持会话恢复功能，这个功能可以使浏览器保留所有的tab标签，然后在重新打开浏览器的时候将其还原。与此同时，cookie也会恢复，就跟从来没有关闭浏览器一样。

## cookie语法：
```sh
Set-Cookie: <cookie-name>=<cookie-value>
Set-Cookie: <cookie-name>=<cookie-value>; Expires=<date>
Set-Cookie: <cookie-name>=<cookie-value>; Max-Age=<non-zero-digit>
Set-Cookie: <cookie-name>=<cookie-value>; Domain=<domain-value>
Set-Cookie: <cookie-name>=<cookie-value>; Path=<path-value>
Set-Cookie: <cookie-name>=<cookie-value>; Secure
Set-Cookie: <cookie-name>=<cookie-value>; HttpOnly
Set-Cookie: <cookie-name>=<cookie-value>; SameSite=Strict
Set-Cookie: <cookie-name>=<cookie-value>; SameSite=Lax
// Multiple directives are also possible, for example:
Set-Cookie: <cookie-name>=<cookie-value>; Domain=<domain-value>; Secure; HttpOnly
```


参考：
1. [Set-Cookie](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Set-Cookie)
2. 