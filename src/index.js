(function(global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ?
		module.exports = factory : typeof define === 'function' && define.amd ? define(factory) : (global.Message = factory())
})(this, function() {
	'use strict'
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
				if(id === item.id) {

					if(typeof userOnClose === 'function') {
						userOnClose(item);
					}
					this.store.splice(i, 1); // remove message
					document.body.removeChild(document.getElementById(id));
					return false;

				}

			})
		}

	}

	let instances = new storeSteward([]);


	let defaultOption = {
		type: 'error',
		animationDuration: 3,
		egoClass: '',
		context: '',
		destroy: () => {

		}
	};

	function isObject(obj) {
		return obj !== null && typeof obj === 'object'
	}
	//	var _toString = Object.prototype.toString;
//	Exposure to message objects is not recommended, and is destroyed for more powerful boxes
	let message = (...val) => {		
		
		let option = Object.assign({},defaultOption,(isObject(val[0])?val[0]:{
				type: val[0],
				context: val[1]
			}));
			if(!option.context) throw('[message] If you use the object argument form, be aware!"Context" is required')
		//option
		let id = 'message_' + seed++,
			cardinalNumber = parseInt(instances.store.length / 10);

		function MessageConstructor(data) {
			let div = document.createElement('div');
			div.className = (option.egoClass|| 'alert-' + option.type)    + ' alert  nan-alert';
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
//		172.217.5.206
		//	 Generate and add to the body...
		let messageBox = new MessageConstructor();

		document.body.appendChild(messageBox.dom);

		instances.push(messageBox);
		let element = document.getElementById(id);
		element.style.animationDelay = cardinalNumber + 's';
		element.style.animationDuration = cardinalNumber + option.animationDuration + 's';
		element.className += ' entranceBox';

		setTimeout(function() {
			instances.closeSingle(id);
		}, parseInt(option.animationDuration*1000));
	};


	return message;

});