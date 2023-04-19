<div align="center">

![Segmentfault](https://github.com/webvs2/Nanometer/blob/master/src/assets/img/rain.svg)

<p>Not everyone can be a great artist, but future artists can come from any corner</p>

</div>

[English](https://github.com/webvs2/Nanometer/blob/master/README.md)  | 简体中文

<h2 align="centre">What is nanometer-message?</h2>
*每一条消息都需要珍惜。
*更友善的消息提示。
<h2 align="left">Claims the melon<MessageBox有哪些功能？ ></h2>

* 简单易用
* 更好的消息提示，内置四种场景，支持使用自定义
* 添加到您的UI库用于完善

<h2 align="left">Install</h2>
Install with pnpm:
```
pnpm add nanometer-message -S
```
<h2 align="left">Documentation</h2>

* Similar to script:

```js
<script src="https://github.com/webvs2/Nanometer/blob/master/dist/index.js"></script>
 
```
* COMMON ant ES6:

```js  
import message from "nanometer-message"
import "nanometer-message/dist/index.css"
 Message({option}) 为每个 type 定义了各自的方法，如 Message.success(options)success(options)。
```

* Similar to VUE2.X:

```js
import "nanometer-message/dist/index.css"
import message from "nanometer-message"
Vue.prototype.$meessage = Message 
```


<h2 align="left">API</h2>

* 添加了对象自定义模式。以前的使用方式不变，这就需要更灵活地使用期权

|Name|Description|
|:--:|:----------|
|[type]|The current state of the message. [success|warning|info|error]|
|[durationTime]|  Buffer animation duration(The default for 3 seconds)|
|[calss]|    CSS state customization|
|[content]|  Message content.Please note: this is a must|
|[postEvent]|  A callback after the message has disappeared |

<h2 align="left">Contact the author</h2>

* 提交issues<https://github.com/webvs2/Nanometer/issues>
* 请访问 github地址 <a herf="https://github.com/webvs2/Nanometer"> https://github.com/webvs2/Nanometer</a>

<h2 align="left">Grateful to members</h2>
