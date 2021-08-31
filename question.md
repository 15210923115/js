1. instanceof原理 👌🏼
2. 函数防抖、截流 👌🏼
3. 前端二进制
 - 说一下arrayBuffer和Buffer的区别，以及应用场景
4. js继承 👌🏼
5. es6
6. xhr 👌🏼
7. 长列表滚动
8. 给定一组url，利用js的异步实现并发请求，并按顺序输出结果 👌🏼
9. polyfill
10. url输入到页面响应
11. 浏览器渲染原理
12. vue-router和vuex原理
13. vue里的三种watcher
14. webapck常用配置
15. new的原理 👌🏼
16. 深拷贝（完整的深拷贝，支持各种数据类型，引用循环问题） 👌🏼
17. Object.create原理 👌🏼
18. 词法作用域 👌🏼
19. 作用域和作用域链 👌🏼
20. 闭包 👌🏼
21. promise源码及相关面试题 👌🏼
22. 可枚举和不可枚举属性的遍历（ for in、Object.keys、Object.getOwnPropertyNames ）👌🏼
23. js垃圾回收机制
24. 类型判断 👌🏼
25. 数据类型 👌🏼
26. bind、call、apply 👌🏼 
27. performance API（TTFB、FP、FCP、FMP、FID、卡顿、PV、UV）、监控错误
28. 对图片了解多少，如何选用图片

## 前端优化方向，整理出几个点 preload、prefetch、cdn
css方向
动画方向：使用css3动画，少用js动画
较少重绘和重排，尤其是重排
先加载css，最后加载js，js会阻塞html解析，css样式会阻塞内嵌的js执行


## webpack优化方向，整理出几个点
* 图片base64
* 代码分割
* resolve路径查找
* 静态资源包通过cdn方式引入，比如vue、vue-router、vuex、element-ui，这种情况下的路径查找怎么处理
* js压缩、css压缩使用什么包
* plugin上传静态资源以后，如何在项目中引入 🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬

## 跨域
* nginx的proxy_pass可以解决跨域，服务端不存在跨域 👌🏼
* koa2的cors包可以解决跨域 👌🏼
* jsonp了解一下 👌🏼

## koa2是否默认启用了缓存功能

## js继承方面
👌🏼 in原理 - 如果指定的属性在指定的对象或其原型链中，则in运算符返回true。
👌🏼 instanceof原理 - 原理是：a instanceof A，沿着对象的__proto__这条链来向上查找，如果能找到函数的prototype则返回true，否则返回false）
👌🏼 isPrototypeOf原理 - 同instanceof，它俩原理是一样的。用法：Object.isPrototypeOf(obj)
👌🏼 new原理 - 创建一个空对象obj，让这个对象obj.__proto__ = Foo.prototype，然后以obj为this，调用构造函数，给实例对象obj赋值私有属性，返回obj对象即可。
👌🏼 Object.create原理 - 创建一个空的构造函数F，让这个构造函数F.prototype指向参数指向的那个原型，返回new F()即可。
👌🏼 js继承的6种方式以及优劣
👌🏼 obj.hasOwnProperty('b') 判断属性b是不是obj对象上自己的私有属性，而不是原型上的。 
👌🏼 Object.getPrototype(obj) 可以获取obj对象的原型对象。 
👌🏼 Object.getOwnPropertyNames() 返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组。
👌🏼 构造函数里创建的都是实例对象的私有属性，原型对象上创建的都是实例对象的公有属性。
👌🏼 __proto__属性组成的链条就叫原型链
👌🏼 为什么要有原型链？为了实现属性和方法的共享。
👌🏼 为什么会有函数呢？核心作用就是批量创建对象（共有的放在原型上，不共有的放在私有属性上）。
👌🏼 为什么会有原型？用来实现共有方法和属性，节省内存和性能。

## 正则方面的
replace的用法
match的用法
test的用法
exec的用法
()分组的概念
?贪婪模式 尽可能多的匹配
?:匹配但是不捕获

## 网络安全方面的 👌🏼
xss：跨站脚本攻击(Cross-Site Scripting)，为了不和css混淆， 故将跨站脚本攻击缩写为xss。

xss攻击是指浏览器中执行恶意脚本，然后拿到用户的信息进行操作。主要分为存储型、反射型和文档型。

防范措施：（1）不要相信用户的输入，对输入的内容转码或者过滤，让其不可执行。（2）利用CSP。（3）利用Cookie的HttpOnly属性。

csrf：CSRF（Cross-site request forgery）跨站请求伪造

原理：攻击者诱导受害者进入第三方网站，在第三方网站中，向被攻击网站发送跨站请求。利用受害者在被攻击网站已经获取的注册凭证，绕过后台的用户验证，达到冒充用户对被攻击的网站执行某项操作的目的。可利用的方式：点击img、a、form，这请求是可以跨站请求的，会带上cookie。

防范措施：（1）服务端给cookie设置samesite值为strict。（2）服务端验证来源站点：Origin和Referer。（3）CSRF Token。


dns劫持  
http中间人攻击  
sql注入  

## restful api规范

## http常见状态 👌🏼

## http缓存 👌🏼

## 浏览器本地存储cookie、localStorage、sessionStorage 👌🏼
cookie的跨域问题 👌🏼

## 浏览器渲染原理（dom树和css规则树、样式计算、布局、绘制）

## http发展历史 (每个阶段都解决了什么问题及缺陷)

## 跨域问题 👌🏼

## 垃圾回收机制

## js数组和字符串常用方法 👌🏼
数组：
push、pop、unshift、shift、reverse、sort、splice，这七个是Vue里的数据劫持用到的  
every、some、filter、reduce、map、includes、forEach、`indexOf`、`slice`、join、concat  

字符串：match、replace、`slice`、`indexOf`、lastIndexOf、split、trim、substring、substr  

## Map和Set数据结构 👌🏼
Set: 它类似于数组，但是成员的值都是唯一的，没有重复的值。  
定义：const s = new Set();  
方法：s.add(x)、s.delete(x)、s.has(x)、s.clear()   
遍历方法：Set 结构的实例有四个遍历方法，可以用于遍历成员。

- Set.prototype.keys()：返回键名的遍历器
- Set.prototype.values()：返回键值的遍历器
- Set.prototype.entries()：返回键值对的遍历器
- Set.prototype.forEach()：使用回调函数遍历每个成员

Map: 它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。Object结构提供了“字符串—-值”的对应，Map结构提供了“值-—值”的对应，是一种更完善的 Hash 结构实现。
定义：const m = new Map();
方法：m.size、m.set(key, value)、m.get(key)、m.has(key)、m.delete(key)、m.clear()
遍历方法：Map结构原生提供三个遍历器生成函数和一个遍历方法。

- Map.prototype.keys()：返回键名的遍历器。
- Map.prototype.values()：返回键值的遍历器。
- Map.prototype.entries()：返回所有成员的遍历器。
- Map.prototype.forEach()：遍历 Map 的所有成员。

## 深度克隆（简单版，值考虑Object和Array）
```js
function cloneDeep(source, map = new Map()) {
    if (typeof source==='object') {
        if (map.get(source)) {
            return map.get(source);
        }
        let target  = Array.isArray(source) ? [] : {};
        map.set(source, target);
        for (let key in source) {
            target[key] = cloneDeep(source[key], map);
        }
    }
    return source;
}
```

## 大小写 👌🏼
typeof
instanceOf
indexOf

## 安全的类型校验 👌🏼
Object.prototype.toString().call(obj)

-----------------------------------------------------------------

## 乱七八糟
1. 图片懒加载
2. JS里的事件类型（冒泡和捕获）
3. DOM和BOM
4. 长列表滚动
5. 上拉加载下拉刷新
6. css3动画
7. 

## 设计模式
1. 单例模式
2. 工厂模式
3. 发布订阅模式
4. 观察者模式
5. 策略模式
6. 状态模式（http解析中状态机机制）

## koa和express
1. 他们俩的区别 [多维度分析 Express、Koa 之间的区别](https://juejin.cn/post/6844904099767386126)
2. 为什么要从express框架切换到koa框架，解决了什么问题
3. 中间件原理

## 前后端登录流程
1. 自己项目的登录流程
2. 正常的登录流程

自己的这个项目，登录用的是cas服务的sso登录接口，因此账号和密码的校验发生在cas那边，我们拿到这个登录的数据后，将其生成一个jwtToken，使用cookie保存在客户端，以后用户在有效期内再访问服务器，就校验这个jwtToken是否合法就行了，合法的话，校验就通过了，根本不再请求sso了。如果用户修改了账号信息，那么这个账号信息是保存在我们自己的库里的，跟sso没关系了。所以说，我们项目里客户端认证的时候使用的是sso，客户端请求用户信息的时候使用的是专门的一个接口（/drm_api/v2/users/mine），这个接口时自己服务的接口，专门用于获取用户信息的接口。

### 认证方案1：jwt认证
后端拿到前端的账号和密码，然后后端调用cas的sso登录接口，sso接口返回用户信息userInfo。
使用jwt.encode将userInfo进行编码操作得到jwtToken，接着使用aes.encript加密jwtToken，得到加密后的jwtToken，将加密后的jwtToken当做sessionId存放到cookie里，保存在客户端。等客户端下次请求的时候，我们会从cookie里取出来这个sessionId，先使用aes.decript解密sessionID（也就是之前被浏览器加密的jwtToken），拿到真正的jwtToken，然后使用jwt.decode来验证这个jwtToken是否被篡改过，这样就能验证用户的身份是否合法了。这个认证方案是无法跨域认证的，因为token使用cookie当做载体，而cookie不支持跨域，因此就有了基于JWT的跨域认证解决方案。前端获取到后端的token之后，前端将token保存在localStory中，以后前端每次发送请求的时候，都将带上`Authorization: Bearer <token>`请求头，后端可以通过这个请求头来进行认证。因此客户端收到服务器返回的JWT，可以储存在Cookie里面（不能跨域），也可以储存在localStorage（可以跨域）。看具体的需求合理选择使用。使用JWT进行认证的这种方案，认证信息都是保存在客户端的，服务器端不做任何保存。所以这种设计方案，服务器是无状态的，状态的判断是根据客户端传来的JWT数据进行的。

### cookie的更新机制
1. 客户端的cookie里记录的过期时间为exp。
2. 那当前服务器的时间new Date()加上config.cookie.options.maxAge的时间，记这个时间和为newExp。
3. 判断`if (new Exp - exp > 90000) {如果条件成立，则在这里更新cookie}`。其中的那个90000可以根据自己实际需要自己设置。

## session、cookie、jwt是什么
cookie和session是都是记录客户状态的机制，不同的是Cookie保存在客户端浏览器中，而session保存在服务器上。jwt是跨域认证的解决方案。
### 认证方案2：使用redis共享sessionID
当然，另一种登录方案，也是使用cookie当做sessionID的载体，每次客户端访问的时候，都会携带cookie过来，那客户端cookie里携带的sessionID和redis缓存里缓存的sessionID去对比校验。如果一样，则证明登录状态有效，未被篡改过。这种方案可以先使用md5对信息进行签名，签名之后，再使用加密算法将签名进行一次加密，把这个加密的结果当做sessionID持久化在redis中，然后将sessionID返回给客户端。

### 跨域认证解决方案JWT
[JSON Web Token 入门教程](http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html)

### sessionID共享问题解决方案：
1. 如果使用nginx进行负载均衡，可以使用IP Hash将请求定位到一个机器上进行。
2. session复制。
3. redis缓存。

## Vue
1. dom-diff
2. nextTick
3. key
4. Vue.mixin和组件内的mixin
5. v-if和v-show的区别
6. vue自定义指令的实现
7. v-model原理
8. 组件通信的方式（兄弟组件如何通信、父子组件如何通信）
9. 数据劫持（响应式原理）
10. Vue中有几种watcher，他们有什么不同
11. Vue.use
### Vue中的性能优化有哪些？
1. 数据层级不易过深，合理设置响应式数据
2. 使用数据时缓存值的结果，不频繁取值
3. 合理设置Key属性
4. v-show和v-if的选取
5. 使用keep-alive缓存组件
6. 打包优化

### keep-alive平时在哪里使用？原理是？
1. 使用keep-alive包裹动态组件时, 会对组件进行缓存，避免组件的重新创建。
2. keep-alive第一次渲染的时候，会将其第一个子组件缓存起来。
3. 当组件后续在次被激活时，会复用上一次缓存的实例进行渲染。

## mq
1. 主题、交换机、路由、绑定
2. 使用mq解决什么问题
3. 生产者、消费者
4. 生产者确认、消费者确认
5. 如何保证高可用
6. 如何保证消息的可靠性传输啊？要是消息丢失了怎么办啊？

## 数据库
1. 索引下推、联合索引、最左前缀原则、聚簇索引、覆盖索引、索引回表
2. 为什么用B+树做索引而不用哈希表做索引
3. 主键索引和非主键索引有什么区别
4. 数据库设计三大范式
5. 为什么加了索引就快了？索引的注意事项
6. expalin分析
7. es用过吗？在哪些场景下用到过？为什么要用它？
8. mysql事务

## 服务
1. 服务监控 zabix kibana 接口巡检
2. token和cookie的区别
3. 秒杀活动
4. 应对高并发，可以从哪些方面着手处理
5. 红包设计
6. rbac
7. sso设计、cas

## 其它
1. serverless了解么
2. nodejs如何与java微服务进行RPC通信

## css
1. 单行/多行文本溢出（问到过1次）
2. flex布局（面试中问到过2次了）
3. 父亲宽高不固定、孩子宽高不固定，让孩子在父亲中上下左右居中显示（问到过1次）
4. BFC
5. 盒模型

## 每一个setTimeout都会开启一个新的线程，需要考虑性能问题
因此如果需要使一个方法异步立即执行的话，可以考虑使用Promise.resolve().then()处理。

## Awk、Sed

## webpack打包
### CDN怎么引入？
1. 比如Jquery、moment、lodash等库，可以直接上传到CDN，然后再index.html中使用link标签或者script标签直接用cdn地址直接引入即可。参见webpack配置中的externals配置。（这种情况的库是不会被打包到bundle里的）
2. webpack打包后的静态文件，通过webpack插件上传到cdn服务器，然后配置outPut.publicPath为cdn服务器的地址，这样打包后的静态文件的src就会自动带上cdn服务器地址的前缀了。
3. cdn原理了解吗？为什么用了cdn就快了？
4. cdn回源

## nodejs面试题
1. 支持高并发的原因：事件驱动、异步IO、单线程的理解、多进程多线程的理解
2. node模块查找机制
3. commonjs和esModule的区别（加载方面的区别：阻塞加载、动态加载）
4. 服务监控及报警-zabbix，日志分析-kibana
5. node做中间层的概念  
    [淘宝前后端分离解决方案](https://2014.jsconfchina.com/slides/herman-taobaoweb/index.html#/57)  
    [node中间层](https://www.cnblogs.com/Renyi-Fan/p/9004177.html)
6. node能解决什么问题？  
    1. 高性能：创建高性能服务器。  
    2. 高并发：对比Java和Php的实现方式，Web服务器的瓶颈在于并发的用户量。
7. Buffer的本质、stream的本质、socket的本质
8. 内存限制
9. sentinel接口限流
10. uuid、雪花算法


## 服务监控
1. [ELK三大日志中间组件之 kibana操作手册](https://my.oschina.net/suventop/blog/1857283)
2. [将Zabbix报警推送到企业微信群](http://repository.grandage.cn:8090/pages/viewpage.action?pageId=1311082)
3. [zabbix的面试题目总结1](https://blog.csdn.net/zhydream77/article/details/89705822?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522162176647516780255235095%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=162176647516780255235095&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_positive~default-1-89705822.first_rank_v2_pc_rank_v29&utm_term=zabbix%E9%9D%A2%E8%AF%95%E9%A2%98&spm=1018.2226.3001.4187)
4. 异常采集、监控和上报
5. Sentry

## redis集群部署、哨兵机制、选举机制
1. 缓存穿透
2. 缓存雪崩
3. 缓存命中
4. 单线程的redis为什么这么快
5. redis和数据库读写一致性问题
6. redis的过期策略以及内存淘汰机制
7. redis的数据类型
8. redis实现微信附近的人功能
9. 分布式锁set 死锁问题
10. 数据持久化

## 首页加载优化
1. ssr
2. 骨架屏
3. 懒加载列表、图片
4. banner图使用jpg格式
5. cdn引用静态资源及脚本
6. prefetch和prefload
7. import()懒加载或者按需加载，是一种很好的优化网页或应用的方式。这种方式实际上是先把你的代码在一些逻辑断点处分离开，然后在一些代码块中完成某些操作后，立即引用或即将引用另外一些新的代码块。这样加快了应用的初始加载速度，减轻了它的总体体积，因为某些代码块可能永远不会被加载。
8. 

## 还有啥
1. http、http2、https之间的不同
2. https安全连接的过程
3. CA证书申请流程、证书校验过程
4. http和udp的区别，http2为什么使用udp协议，是如何做到可靠的
5. tcp滑动窗口、三次握手、四次挥手
6. 什么是socket，通信原理
7. 对称加密、非对称加密、Diffie-Hellman秘钥交换算法、秘钥协商、完整性验证算法
8. SSL协议、TLS协议

## 运维？
1. CI\CD
2. lxc、docker、k8s
3. CI的意思是持续构建。负责拉取代码库中的代码后，执行用户预置定义好的操作脚本，通过一系列编译操作构建出一个 制品 ，并将制品推送至到制品库里面。常用工具有Gitlab CI，Github CI，Jenkins等。这个环节不参与部署，只负责构建代码，然后保存构建物。构建物被称为 制品，保存制品的地方被称为 “制品库”
4. CD则有2层含义：持续部署（Continuous Deployment）和持续交付（Continuous Delivery）。 持续交付的概念是：将制品库的制品拿出后，部署在测试环境/交付给客户提前测试。持续部署则是将制品部署在生产环境。可以进行持续部署的工具也有很多：Ansible批量部署，Docker直接推拉镜像等等。当然也包括我们后面要写到的Kubernetes集群部署。

## 线上CPU飙升>100%，如何排查

## 如何直接在线上排查问题和debugger