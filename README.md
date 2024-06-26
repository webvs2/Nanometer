<div align="center">

![Segmentfault](https://github.com/webvs2/Nanometer/blob/master/src/assets/img/rain.svg)


<h1>:construction: :tada:  I have neglected this project for a long time, I am really sorry, I will not give it up, now start to upgrade the plan, provide the use of modern engineering, provide a more concise appearance, add a rich function display, looking forward to joining the ambitious, everyone, I love you! This is a message, like every message you have, is the most important</h1>
<h1> `@nm` Project start-up </h1>
<p>Not everyone can be a great artist, but future artists can come from any corner</p>

</div>

English   |  [简体中文](https://github.com/webvs2/Nanometer/blob/master/README.zh-CN.md) 

<h2 align="centre">What is nanometer-message?</h2>
  * ✨Every piece of information needs to be cherished.<br />
  * 🎉A friendlier message prompt.
<h2 align="left">Claims the melon<MessageBox有哪些功能？ ></h2>

* Easy to use
* Better message prompt, built-in four scenarios, support the use of custom
* Add to your UI library for refinement

<h2 align="left">Install</h2>

Install with pnpm:
```
pnpm add nanometer-message -S
```

<h2 align="left">Documentation</h2>

* Similar to script:

```js
<script src="https://github.com/webvs2/Nanometer/blob/master/dist/index.js"></script>
Vue.prototype.$meessage = Message 
```

* COMMON ant ES6:

```js  
import message from "nanometer-message"
import "nanometer-message/dist/index.css"
 Message({option})   A separate method is defined for each type，example: Message.success(options)。
```

* Similar to VUE2.X:

```js
import "nanometer-message/dist/index.css"
import message from "nanometer-message"
Vue.prototype.$meessage = Message 
```


<h2 align="left">API</h2>

* The pattern of object customization has been added. The previous way of use remains the same, which requires more flexible use of option

|Name|Description|
|:--:|:----------|
|[type]|The current state of the message. [success|warning|info|error]|
|[durationTime]|  Buffer animation duration(The default for 3 seconds)|
|[calss]|    CSS state customization|
|[content]|  Message content.Please note: this is a must|
|[postEvent]|  A callback after the message has disappeared |

<h2 align="left">Contact the author</h2>
<p>Get involved and get better</p>
<p> *  Submit issues<https://github.com/webvs2/Nanometer/issues> </p>
<p> *  Visit the github address <a herf="https://github.com/webvs2/Nanometer"> https://github.com/webvs2/Nanometer</a></p>

<h2 align="left">Grateful to members</h2>
