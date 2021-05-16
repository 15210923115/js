1. instanceof原理 👌🏼
2. 函数防抖、截流 👌🏼
3. 前端二进制
 - 说一下arrayBuffer和Buffer的区别，以及应用场景
4. js继承
5. es6
6. xhr 👌🏼
7. 长列表滚动
8. 给定一组url，利用js的异步实现并发请求，并按顺序输出结果 👌🏼
9. pollify
10. url输入到页面响应
11. 浏览器渲染原理
12. vue-router和vuex原理
13. vue里的三种watcher
14. webapck常用配置
15. new的原理 👌🏼
16. 深拷贝
17. Object.create原理 👌🏼
18. 词法作用域
19. 作用域和作用域链
20. 闭包
21. promise源码及相关面试题
22. 可枚举和不可枚举属性的遍历（ for in、Object.keys、Object.getOwnPropertyNames ）👌🏼
23. js垃圾回收机制
24. 类型判断
25. 数据类型

## 前端优化方向，整理出几个点 preload、prefetch、cdn
css方向
动画方向：使用css3动画，少用js动画
较少重绘和重排，尤其是重排
先加载css，最后加载js，js会阻塞html解析，css样式会阻塞内嵌的js执行


## webpack优化方向，整理出几个点
图片base64
代码分割
resolve路径查找
静态资源包通过cdn方式引入，比如vue、vue-router、vuex、element-ui，这种情况下的路径查找怎么处理
js压缩、css压缩使用什么包

## 跨域
* nginx的proxy_pass可以解决跨域，服务端不存在跨域
* koa2的cors包可以解决跨域
* jsonp了解一下

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

## 网络安全方面的
xss
csrf
dns劫持
http中间人攻击
sql注入

## restful api规范

## http常见状态

## http缓存

## 浏览器本地存储cookie、localStorage、sessionStorage
cookie的跨域问题

## 浏览器渲染原理

## http发展历史

