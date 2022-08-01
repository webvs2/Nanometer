'use strict';
import './src/resource.js';
// import  './styles/srtle.scss';

import { filter, delay } from 'lodash-es';
// let  differenceBy =require('lodash/isObject')

// console.log(isObject(1))




var PopupManager = {
	zIndex: 2000,
	nextZIndex: function nextZIndex() {
		return PopupManager.zIndex++;
	}
};
// let seed=1;
class storeSteward {
	constructor(Store) {
		this.store = Store;
		this.pastDue = []
	}
	push(value) {
		// console.log(this.store)
		if (this.store.length > 10) {
			this.closeAll()
		}
		this.store.push(value)
		console.log(value)
		this.pastDue.push(this.timebomb(value))
	}
	timebomb(data) {
		let { source, dom,box } = data
		return setTimeout(() => {
			dom.className = 'entranceBoxOut ' + dom.className;
			delay(function (isEmpty) {
				// containerDom.removeChild(dom);
				// console.log(isEmpty,containerDom,'发三分大赛')
				// if (!isEmpty) {
					document.body.removeChild(box)
				// }
			}, 1000, this.store.length);
			this.store = filter(this.store, (o) => o.id == source.id);
	
			// console.log('this.store',this.store)

		}, source.animationDuration)

	}
	closeAll() {
		return new Promise((resolve, reject) => {
			this.store.map((item, index) => {
				this.closeSingle(item.id, item.source)
			})
			resolve(true)

		})
	}
	closeSingle(id, source) {
		if (!!source.destroy) {
			source.destroy()
		}
		// this.pastDue.push(source)
		// this.store = filter(this.store, (o)=>o.id!=id);
		// document.body.removeChild(document.getElementById(id));
	}

}
let instances = new storeSteward([]);

//	Exposure to message objects is not recommended, and is destroyed for more powerful boxes

class MessageClass {
	constructor(option) {
		this.option = {};
		this.seed = 1
		this.isContainer = false
		this.containerDom = null
		this.defaultOption = {
			type: 'info',
			animationDuration: 3000,//ms
			egoClass: '',
			context: '',
			destroy: null
		};
	}
	alteration(option) {
		this.option = Object.assign({}, this.defaultOption, option)
		this.establish()
	}
	// reate
	establish() {
		let option = this.option
		if (!option.context) throw ('[message] If you use the object argument form, be aware!"Context" is required')
		let id = 'message_' + (this.seed++)
		// cardinalNumber = parseInt(instances.store.length / 10);
		function MessageConstructor(data) {
			console.log('干哈')
			let box = document.createElement('div');
			box.className = 'nan-location'
			let div = document.createElement('div');
			div.className = `alert-${option.type}    nan-alert entranceBox  ${option.egoClass}`
			div.role = 'alert';
			// div.id = id;
			box.id=id
			div.innerText = option.context;
			div.style.zIndex = PopupManager.nextZIndex();
			box.appendChild(div)
			return {
				// dom: div,
				dom: div,

				id: id,
				domID: '#' + id,
				source: data,
				box:box
			};
		}
		//	 Generate and add to the body...
		let messageBox = new MessageConstructor(option);
		// messageBox.dom.style.top= instances.store.length * 60 +'px';
		messageBox.source.animationDuration = messageBox.source.animationDuration + instances.store.length * 60
		// messageBox.dom.style.animationDelay = cardinalNumber + 's';
		// messageBox.dom.style.animationDuration = cardinalNumber + option.animationDuration  + 's';
		// box.appendChild(messageBox.dom)
		document.body.appendChild(messageBox.box);
		// this.mountDom(messageBox.dom)
		// this.containerDom
		messageBox.containerDom = this.containerDom
		instances.push(messageBox);
	}
	mountDom(dom) {
		if (!this.isContainer) {
			let box = document.createElement('div');
			box.className = 'nan-location'
			box.id = "nan-location"
			document.body.appendChild(box);
			this.containerDom = box
			this.isContainer = true

		}
		// console.log('dom', dom)
		// this.containerDom.appendChild(dom)
		// document.getElementById('nan-location').appendChild(dom)
		// let dadsfas= document.getElementById('nan-location')
		// dadsfas.appendChild(dom)

		// let box = document.createElement('div');
		// box.className='nan-location'
		// document.body.appendChild(box);


	}

};

let MessageBox = new MessageClass()
let message = (...data) => {
	MessageBox.alteration(data.length < 2 ? data[0] : {
		type: data[0],
		context: data[1]
	})
}
new Array('success', 'warning', 'info', 'error').map((item, index) => {
	message[item] = (value) => {
		MessageBox.alteration({ type: item, context: value });
	}
})
export default message