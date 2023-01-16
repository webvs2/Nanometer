<div align="center">

![Segmentfault](https://github.com/webvs2/Nanometer/blob/master/src/assets/img/rain.svg)

<p>Not everyone can be a great artist, but future artists can come from any corner</p>

</div>
English|[简体中文]([https://github.com/webvs2/Nanometer/blob/master/README.zh-CN.md]) 

<h2 align="centre">What is nanometer-message?</h2>
*Every piece of information needs to be cherished.
* A friendlier message prompt.
<h2 align="left">Claims the melon<MessageBox有哪些功能？ ></h2>

* Easy to use
* Better message prompt, built-in four scenarios, support the use of custom
* Add to your UI library for refinement

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

<h2 align="left">Documentation</h2>

* Common ant es6:

```js  
var Message = require('nanometer-message')
<link rel="stylesheet" type="text/css" href="dist/index.css" />
 Message({option})   A separate method is defined for each type，example: Message.success(options)。
```

* Similar to vue:

```js
import Message from 'nanometer-message';

Vue.prototype.$meessage = Message 
```

```bash
 Message(type, context)
```

```bash
 Message({option})
```

 style

```bash
@import url('nanometer-message/dist/index.css');
```

<h2 align="left">API</h2>

* The pattern of object customization has been added. The previous way of use remains the same, which requires more flexible use of option

|Name|Description|
|:--:|:----------|
|[type]|The current state of the message. [success|warning|info|error]|
|[durationTime]| ( <s>animationDuration</s> abandoned ,Use this instead)  Buffer animation duration(The default for 3 seconds)|
|[calss]| ( <s>egoClass</s> abandoned,Use this instead)   CSS state customization|
|[content]| ( <s>context</s> abandoned,Use this instead ) Message content.Please note: this is a must|
|[postEvent]| (<s>destroy</s> abandoned,Use this instead )  A callback after the message has disappeared |

<h2 align="left">Contact the author</h2>
<p>Get involved and get better</p>
<p> *Submit issues<https://github.com/webvs2/Nanometer/issues> </p>
<p>* Visit the github address <a herf="https://github.com/webvs2/Nanometer"> https://github.com/webvs2/Nanometer</a></p>

<h2 align="left">Grateful to members</h2>
