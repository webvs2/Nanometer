'use strict';
// import { data } from 'jquery';
// import _ from 'lodash';
import resource from './src/resource.js';
// import answer from 'the-answer';
// export default function () {
//     console.log(foo())
//     console.log('versiondfsasdfa:1 ' + answer);
//   }

var PopupManager = {
	zIndex: 2000,
	nextZIndex: function nextZIndex() {
		return PopupManager.zIndex++;
	}
};
var seed = 1;

class storeSteward {
	constructor(Store) {
		this.store = Store;
	}
	push(value) {
		console.log(this.store)
		if(this.store.length >5){
			this.closeAll()
			// this.store.map((item,index)=>{
				
			// })
            // instances.closeSingle(id, option.destroy);
		}
		this.store.push(value)

	}
	closeAll() {
		return new Promise((resolve, reject) => {
			this.store.forEach((item, index) => {
				this.closeSingle(item.id)
			})
			resolve(true)

		})
	}
	closeSingle(id, userOnClose) {
		this.store.forEach((item, i) => {
			if (id === item.id) {
				if (typeof userOnClose === 'function') {
					userOnClose(item);
				}
				this.store.splice(i, 1); // remove message
				document.body.removeChild(document.getElementById(id));
				return false;

			}

		})
	}

}
// class msgObj{
	
// }
let instances = new storeSteward([]);



function isObject(obj) {
	return obj !== null && typeof obj === 'object'
}
//	var _toString = Object.prototype.toString;
//	Exposure to message objects is not recommended, and is destroyed for more powerful boxes

class MessageClass {
	constructor(option){
        //  if(!!!val) return false
		// let option = Object.assign({}, defaultOption, (isObject(val[0]) ? val[0] : {
		// 			type: val[0],
		// 			context: val[1]
		// 		}));
    this.option= option;
	this.establish()
	}
    establish(){
		let option =this.option
	if (!option.context) throw ('[message] If you use the object argument form, be aware!"Context" is required')

		console.log('我是构建器',option)
		let id = 'message_' + (seed++),
		cardinalNumber = parseInt(instances.store.length / 10);
		function MessageConstructor(data) {
			let div = document.createElement('div');
			div.className = (option.egoClass || 'alert-' + option.type) + ' alert  nan-alert';
			div.role = 'alert';
			div.id = id;
			div.innerText = option.context;
	
			div.style.zIndex = PopupManager.nextZIndex();
			return {
				dom: div,
				id: id,
				domID: '#' + id
			};
		}
			//	 Generate and add to the body...
	  let messageBox = new MessageConstructor();

	  document.body.appendChild(messageBox.dom);
    // console.log(messageBox,'messageBox')
	  instances.push(messageBox);
	  let element = document.getElementById(id);
	 element.style.animationDelay = cardinalNumber+ 's';
	 element.style.animationDuration = cardinalNumber + option.animationDuration +0.8+ 's';
	 element.className += ' entranceBox';
	}
	// success(context){
	// 	if(context) throw ('[message] Please fill in the content!"context" is required')
    //         this.option.type='success'
	// 		this.establish()
	// }
	// warning(){
	// 	this.option.type='warning'
	// }
	// info (){
	// 	this.option.type='info '
	// }
	// error(){
	// 	this.option.type='error'
	// }


}
// let message = (...val) => {

// 	let option = Object.assign({}, defaultOption, (isObject(val[0]) ? val[0] : {
// 		type: val[0],
// 		context: val[1]
// 	}));
// 	if (!option.context) throw ('[message] If you use the object argument form, be aware!"Context" is required')
// 	//option
// 	let id = 'message_' + (seed++),
// 		cardinalNumber = parseInt(instances.store.length / 10);

// 	function MessageConstructor(data) {
// 		let div = document.createElement('div');
// 		div.className = (option.egoClass || 'alert-' + option.type) + ' alert  nan-alert';
// 		div.role = 'alert';
// 		div.id = id;
// 		div.innerText = option.context;

// 		div.style.zIndex = PopupManager.nextZIndex();
// 		return {
// 			dom: div,
// 			id: id,
// 			domID: '#' + id
// 		};
// 	}
// 	//	 Generate and add to the body...
// 	let messageBox = new MessageConstructor();

// 	document.body.appendChild(messageBox.dom);
//     // console.log(messageBox,'messageBox')
// 	instances.push(messageBox);
// 	let element = document.getElementById(id);
// 	element.style.animationDelay = cardinalNumber+ 's';
// 	element.style.animationDuration = cardinalNumber + option.animationDuration +0.8+ 's';
// 	element.className += ' entranceBox';

// 	// setTimeout(function() {
// 	// 	instances.closeSingle(id, option.destroy);
// 	// }, parseInt(option.animationDuration * 1000));
// };


// export  default message
let defaultOption = {
	type: 'info',
	animationDuration: 2.5,
	egoClass: '',
	context: '',
	destroy: ''
};
// class defaultClass{
// 	constructor(){

// 	}
// }

// class defaultClass extends MessageClass(){
// 	constructor(data) {
// 		super(data);
// 	}
// } 
let message =function (...val){
// 	let option = Object.assign({}, defaultOption, (isObject(val[0]) ? val[0] : {
// 		type: val[0],
// 		context: val[1]
// 	}));
// 	// console.log(new MessageClass(defaultOption).prototype )
//    return	new MessageClass(option)
}
let MessageBox=  new MessageClass(option)
message.success=function(value){
	// console.log('value',value)
	if(!value) throw ('[message] Please fill in the content!"context" is required')
	let option = Object.assign({type:'info',context:value}, defaultOption)
	// defaultOption.type="info"
	// defaultOption.context=value
	new MessageClass(option)
}
export  default   message




