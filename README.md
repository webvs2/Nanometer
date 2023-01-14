<div align="center">

![Segmentfault](https://github.com/webvs2/Nanometer/blob/master/src/assets/img/rain.svg)

<p>Not everyone can be a great artist, but future artists can come from any corner</p>

</div>

<h2 align="centre">What is nanometer-message?</h2>
*每一条消息都需要珍惜。
*更友善的消息提示。
<h2 align="left">Claims the melon<MessageBox有哪些功能？ ></h2>

* 简单易用
* 更好的消息提示，内置四种场景，支持使用自定义
* 添加到您的UI库用于完善

<h2 align="left">Install</h2>
Install with script:

```bash
<script src="index.js"></script>
<link rel="stylesheet" type="text/css" href="index.css" />
```

Install with npm:

```
cnpm i nanometer-message
```

```bash
npm i nanometer-message
```

<h2 align="left">Documentation</h2>

* Common ant es6:

```js  
var Message = require('nanometer-message')
<link rel="stylesheet" type="text/css" href="dist/index.css" />
 Message({option})    为每个 type 定义了各自的方法，如 Message.success(options)。
```

* 类似于vue:

```js
import Message from 'nanometer-message';
import "nanometer-message/dist/index.css"

Vue.prototype.$meessage = Message（Vue2）  为每个 type 定义了各自的方法，如 Message.success(options)。
```

 注意：在vue中使用需要在style里面引入

```bash
@import url('nanometer-message/dist/index.css');
```

```bash
 Message(type, context)
```

```bash
Message.success(context)。
```

```bash
 Message({option})
```

<h2 align="left">API</h2>

* The pattern of object customization has been added. The previous way of use remains the same, which requires more flexible use of option

|Name|Description|
|:--:|:----------|
|[type]|The current state of the message. [success,warning,info,error]|
|[animationDuration]|Buffer animation duration(The default for 3 seconds)|
|[egoClass]|CSS state customization|
|[context]| Message content.Please note: this is a must|
|[destroy]| A callback after the message has disappeared |

<h2 align="left">Contact the author</h2>

* 邮件联系(2636098325@qq.com)
* 提交issues<https://github.com/webvs2/Nanometer/issues>
* 请访问 github地址 <a herf="https://github.com/webvs2/Nanometer"> https://github.com/webvs2/Nanometer</a>

<h2 align="left">Grateful to members</h2>
