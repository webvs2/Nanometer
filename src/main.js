(function(global, factory) {
	if(typeof module === "object" && typeof module.exports === "object") {

		module.exports = global.document ? factory(global, true) : function(w) {
			if(!w.document) {
				throw new Error("$alert requires a window with a document");
			}
			return factory(w)
		}

	} else {
		factory(global)
	}

}(typeof window !== "undefined" ? window : this, function(window, noGlobal) {
	const PopupManager = {
		zIndex: 2000,
		nextZIndex: function() {
			return PopupManager.zIndex++;
		},
	}
	let seed = 1;
	let instances = [];
	let Message = {
		closeAll: function() {
			for(let i = instances.length - 1; i >= 0; i--) {
				instances[i].close();
			}
		},
		close: function(id, userOnClose) {
			for(let i = 0, len = instances.length; i < len; i++) {
				if(id === instances[i].id) { // Find the message instance by id
					if(typeof userOnClose === 'function') {
						userOnClose(instances[i]);
					}
					instances.splice(i, 1); // remove message
					document.body.removeChild(document.getElementById(id))
					break;
				}
			}
		}

	}

	window.$alert = function(type, context) {
		let id = ('message_' + seed++),
			cardinalNumber = parseInt(instances.length / 10);;

		function MessageConstructor(data) {
			//		let data = {
			//			visible: false,
			//			message: '', //消息文字
			//			duration: 3000, //显示时间, 毫秒。设为 0 则不会自动关闭
			//			type: 'info',
			//			iconClass: '', //自定义图标的类名，会覆盖 type
			//			customClass: '', //自定义类名
			//			onClose: null,
			//			showClose: false, //是否显示关闭按钮
			//			closed: false, //用来判断消息提示弹窗是否关闭
			//			timer: null,
			//			dangerouslyUseHTMLString: false, //是否将 message 属性作为 HTML 片段处理
			//			center: false
			//		},c=c||{};
			var div = document.createElement('div');
			div.className = ('alert-' + type) + ' alert  me-alert';
			div.role = 'alert';
			div.id = id;
			div.innerText = context;

			div.style.zIndex = PopupManager.nextZIndex()
			return {
				dom: div,
				id: id,
				domID: ('#' + id)
			}

		}
//		Generate and add to the body...
		let messageBox = new MessageConstructor();

		document.body.appendChild(messageBox.dom)
		

		instances.push(messageBox)
		var element = document.getElementById(id);
		element.style.animationDelay = (cardinalNumber + 's');
		element.style.animationDuration = ((cardinalNumber + 3) + 's');
		element.className += ' entranceBox';

		setTimeout(function() {
			Message.close(id);
		}, 3000)
	}


	return $alert;

}))