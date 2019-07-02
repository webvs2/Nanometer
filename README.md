<h2 align="centre">What is nanometer-message?</h2>

 
* 单纯消息提示框，适用于更好的消息提示或者小组件。
* 效果如 <a herf=" https://element.eleme.cn/2.0/#/zh-CN/component/message#message-xiao-xi-ti-shi" target='target'>  https://element.eleme.cn/2.0/#/zh-CN/component/message#message-xiao-xi-ti-shi</a> ,欢迎提交lssues,更好完善。

<h2 align="left">Claims the melon<MessageBox有哪些功能？ ></h2>
 
* 简单易用

* 更好的消息提示，四种场景选择，可以使用自定义

* 添加到您的UI库用于完善

<h2 align="left">Install</h2>
Install with script:

```bash
<script src="index.js"></script>
<link rel="stylesheet" type="text/css" href="style.css" />
```

Install with npm:

```bash
npm i nanometer-message
```

<h2 align="left">Documentation</h2>

* Common ant es6:



```js
 import  Message from'nanometer-message' 
 import "nanometer-message/lib/style.css"
 CommonJS :   var Message = require('nanometer-message')
 Message('error', 'messges')
```
* 类似于vue:

```js
import Message from 'nanometer-message';
import "nanometer-message/lib/style.css"

Vue.prototype.$meessage = Message
```

<h2 align="left">API</h2>


* 加入了对象自定义的模式，之前的的使用方式不变，需要更灵活的使用option
* The pattern of object customization has been added. The previous way of use remains the same, which requires more flexible use of option


```bash
 Message(String, messges)
```




<h2 align="left">Issues</h2>


```bash
 Message({option})
```
|Name|Description|
|:--:|:----------|
|[type]|The current state of the message. [success,warning,info,error]|
|[animationDuration]|Buffer animation duration(The default for 3 seconds)|
|[egoClass]|CSS state customization|
|[context]| Message content.Please note: this is a must|




<h2 align="left">Issues</h2>
承蒙各位厚爱，我将小组件升级了一下。

现在的只是一个小小雏形，我希望项目多多成长，在使用中有任何问题或者好的创意想法，欢迎反馈给我，可以用以下联系方式跟我交流

* 邮件联系(2636098325@qq.com)
* 提交issues


* 请访问 github地址 <a herf="https://github.com/webvs2/Nanometer"> https://github.com/webvs2/Nanometer</a>
* 请访问 网址<a herf="https://webvs2.github.io/Nanometer/">https://webvs2.github.io/Nanometer/</a>




<h2 align="left">捐助开发者</h2>

在兴趣的驱动下,写一个`免费`的东西，有欣喜，也还有汗水，希望你喜欢我的作品，同时也能支持一下。
当然，有钱捧个钱场（右上角的爱心标志，支持支付宝和PayPal捐助），没钱捧个人场，谢谢各位。


<h2 align="left">感激</h2>

 各位帮我完善的,我会展示这里的



