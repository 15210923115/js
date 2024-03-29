# [事件流](https://www.cnblogs.com/ypppt/p/12944344.html)

Javascript与HTML之间的交互是通过事件实现。

## 一、事件流
事件，是文档或浏览器窗口中发生的一些特定的交互瞬间。事件流，描述的是页面中接受事件的顺序。IE9，chrome，Firefox，Opera，Safari均实现了DOM2级规范中定义的标准DOM事件，而IE8和IE8以下版本仍然保留专有的事件处理方式。

### 事件冒泡
事件冒泡是由IE开发团队提出来的，即事件开始时由最具体的元素（文档中嵌套层次最深的那个节点）接收，然后逐级向上传播。

```html
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Event Bubbling Example</title>
    </head>
    <style type="text/css">
        #myDiv{
            width:100px;
            height:100px;
            background-color:#FF0000;
        }
    </style>
    <body>
        <div id="myDiv"></div>
    </body>    
</html>
```

当用户点击了`<div>`元素，click事件将按照`<div>`—>`<body>`—>`<html>`—>document的顺序进行传播。若在`<div>`和`<body>`上都定义了click事件，如下：

```js
<script type="text/javascript">
    var div=document.getElementById("myDiv");
    div.onclick=function(event){
        alert("div");
    };
    document.body.onclick=function(event){
        alert("body");
    };    
</script>
```

点击`<div>`，将先输出“div”，再输出“body”。

IE9，chrome，Firefox，Opera，Safari都支持事件冒泡，并将事件冒泡到window对象。

### 事件捕获
事件捕获是由Netscape Communicator团队提出来的，是先由最上一级的节点先接收事件，然后向下传播到具体的节点。当用户点击了`<div>`元素，采用事件捕获，则click事件将按照document—>`<html>`—>`<body>`—>`<div>`的顺序进行传播。

若在<div>和<body>上都定义了click事件，如下：

```js
<script type="text/javascript">
    var div=document.getElementById("myDiv");    
    div.addEventListener("click",function(event){
        alert("div");
    },true);
    document.body.addEventListener("click",function(event){
        alert("body");
    },true);
    
</script>
```

（注：addEventListener具体使用见本文DOM2级事件处理）

点击`<div>`，将先输出“body”，再输出“div”。

IE9，chrome，Firefox，Opera，Safari都支持事件捕获，但是IE8和IE8以下的版本只支持事件冒泡。尽管DOM2规范要求事件应该从document对象开始传播，但是现在的浏览器实现都是从window对象开始捕获事件。

### DOM事件流

"DOM2级事件”规定的事件流包含三个阶段：事件捕获阶段，处于目标阶段和事件冒泡阶段。首先发生的是事件捕获，然后是实际的目标接收到事件，最后阶段是冒泡阶段。以上面的HTML页面为例，单击`<div>`元素将按照下图触发事件：

![](事件流.jpg)

若在`<div>`和`<body>`上都定义了click事件，如下：

```js
<script type="text/javascript">
    var div=document.getElementById("myDiv");    
    div.onclick=function(event){
        alert("div");
    };
    document.body.addEventListener("click",function(event){
        alert("event bubble");
    },false);
    document.body.addEventListener("click",function(event){
        alert("event catch");
    },true);
    
</script>
```

点击`<div>`，将先输出“event catch”，再输出“div”，最后输出“event bubble”。

## 二、事件处理程序
事件是用户或浏览器自身执行的某种动作，而响应某个事件的函数叫做事件处理程序。HTML事件处理程序、DOM0级事件处理程序和IE事件处理程序均以“on”开头，DOM2级事件处理程序不需要加“on”。

### HTML事件处理程序
通过将事件作为HTML元素的属性来实现，包含以下两种方法：
```html
<input type="button" value="confirm" onclick="alert('confirm')" />
```
或者调用其他地方定义的脚本：
```html
<script type="text/javascript">
        function showMessage() {
            alert("confirm");
        }
</script>
<input type="button" value="confirm" onclick="showMessage()"/>
```
（注：函数定义必须放在调用之前）

### DOM0级事件处理程序
通过Javascript指定事件处理程序的传统方式，所有浏览器均支持。每个元素（包括window，document）都有自己的事件处理程序属性，但是必须在DOM节点加载完之后才会有效。如下所示：
```html
<script type="text/javascript">
    var div = document.getElementById("myDiv");
    div.onclick = function(event) {
        alert("div");
    };
</script>
```
使用DOM0级方法指定的事件处理程序被认为是元素的方法，在元素的作用域中运行。this引用当前元素，如下：
```html
<script type="text/javascript">
    var div = document.getElementById("myDiv");
    div.onclick = function(event) {
        alert(this.id);
    };
</script>
```
输出“myDiv”。

删除通过DOM0级方法指定的事件处理程序：div.onclick=null;

### DOM2级事件处理程序
IE9，chrome，Firefox，Opera，Safari均实现了DOM2级事件处理程序，绑定事件方法addEventListener()接收三个参数：事件名称，事件处理函数和一个布尔值。布尔值为true，则表示在捕获阶段调用事件处理程序；如果为false，则表示在冒泡阶段调用事件处理程序。addEventListener允许在同一个元素上添加多个事件处理程序，如下所示：
```html
<script type="text/javascript">
    var div = document.getElementById("myDiv");
    div.addEventListener("click", function(event) {
        alert("event bubble");
    }, false);
    div.addEventListener("click", function(event) {
        alert("event catch");
    }, true);
</script>
```
先输出“event bubble”，后输出“event catch”，说明addEvenListener绑定的处理程序执行顺序和绑定顺序相同。

通过DOM2级事件处理程序指定的方法，this也引用当前元素，如下：
```html
<script type="text/javascript">
    var div = document.getElementById("myDiv");
    div.addEventListener("click", function(event) {
        alert(this.id);
    }, false);
</script>
```
输出“myDiv”。

删除DOM2级事件处理程序，采用removeEventListener()，删除时传入的参数必须和绑定时传入的参数相同，不能传入匿名函数。如下所示：
```html
<script type="text/javascript">
    var div = document.getElementById("myDiv");
    var handler=function(event){
        alert("delete");
    };        
    div.addEventListener("click",handler,false);
    div.removeEventListener("click",handler,false);
</script>
```
## IE事件处理程序
IE8和IE8以下的版本不支持addEventListener()，而是采用attachEvent()来实现事件绑定。目前只有IE和Opera支持attachEvent()。IE9支持addEventListener()，同时也兼容IE8的attachEvent()方法，但是IE9和IE8对attachEvent()的实现有点不同。如下所示：
```html
 <script type="text/javascript">
    var div = document.getElementById("myDiv");
    div.attachEvent("onclick", function(event) {
        alert("1");
    });
    div.attachEvent("onclick", function(event) {
        alert("2");
    });
</script>
```
IE9和IE10先输出“1”，再输出“2”，而IE8和IE7先输出“2”，再输出“1”。

删除IE事件处理程序，采用detachEvent()，删除时传入的参数必须和绑定时传入的参数相同，不能传入匿名函数。如下所示：
```html
<script type="text/javascript">
    var div = document.getElementById("myDiv");
    var handler = function(event) {
        alert("delete");
    };
    div.attachEvent("onclick",handler);
    div.detachEvent("onclick",handler);
</script>
```
总结：attachEvent()采用冒泡方式，而addEventListener()可以采用冒泡或事件捕获方式。

先按由上往下的顺序执行事件捕获的执行程序，再执行目标元素的执行程序，最后按由下往上的顺序执行冒泡事件。代码如下所示：

```html
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Event Bubbling Example</title>
    </head>
    <style type="text/css">
        #child {
            width: 100px;
            height: 100px;
            background-color: #FF0000;
        }
    </style>
    <body>
        <div id="parent">
            <div id="child"></div>
        </div>
    </body>
    <script type="text/javascript">
        var parent = document.getElementById("parent");
        var child = document.getElementById("child");
        child.onclick = function(event) {
            alert("child");
        };
        document.body.addEventListener("click", function(event) {
            alert("body:event bubble");
        }, false);
        parent.attachEvent("onclick", function(event) {
            alert("parent:event bubble");
        });
        document.body.addEventListener("click", function(event) {
            alert("body:event catch");
        }, true);
        parent.addEventListener("click", function(event) {
            alert("parent:event catch");
        }, true);
    </script>
</html>
```

## 三、HTML DOM addEventListener() 方法
`addEventListener()`方法用于向指定元素添加事件句柄。

使用`removeEventListener()`方法来移除addEventListener()方法添加的事件句柄。

### 语法
```js
element.addEventListener(event, function, useCapture)
```

### 参数
| 参数 | 描述 |
| :- | :- |
| event	| 必须。字符串，指定事件名。<br>注意: 不要使用 "on" 前缀。 例如，使用 "click" ,而不是使用 "onclick"。<br>提示： 所有 HTML DOM 事件，可以查看我们完整的 HTML DOM Event 对象参考手册。
| function | 必须。指定要事件触发时执行的函数。<br>当事件对象会作为第一个参数传入函数。 事件对象的类型取决于特定的事件。例如， "click" 事件属于 MouseEvent(鼠标事件) 对象。 |
| useCapture | 可选。布尔值，指定事件是否在捕获或冒泡阶段执行。<br>可能值:<br>true - 事件句柄在捕获阶段执行<br>false- false- 默认。事件句柄在冒泡阶段执行 |