'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (global, factory) {
	(typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory : typeof define === 'function' && define.amd ? define(factory) : global.Message = factory();
})(undefined, function () {
	'use strict';

	var PopupManager = {
		zIndex: 2000,
		nextZIndex: function nextZIndex() {
			return PopupManager.zIndex++;
		}
	};
	var seed = 1;

	var storeSteward = function () {
		function storeSteward(Store) {
			_classCallCheck(this, storeSteward);

			this.store = Store;
		}

		_createClass(storeSteward, [{
			key: 'push',
			value: function push(value) {
				this.store.push(value);
			}
		}, {
			key: 'closeAll',
			value: function closeAll() {
				var _this = this;

				return new Promise(function (resolve, reject) {
					_this.store.forEach(function (item, index) {
						_this.closeSingle(item.id);
					});
					resolve(true);
				});
			}
		}, {
			key: 'closeSingle',
			value: function closeSingle(id, userOnClose) {
				var _this2 = this;

				this.store.forEach(function (item, i) {
					if (id === item.id) {

						if (typeof userOnClose === 'function') {
							userOnClose(item);
						}
						_this2.store.splice(i, 1); // remove message
						document.body.removeChild(document.getElementById(id));
						return false;
					}
				});
			}
		}]);

		return storeSteward;
	}();

	var instances = new storeSteward([]);

	var defaultOption = {
		type: 'info',
		animationDuration: 2.5,
		egoClass: '',
		context: '',
		destroy: function destroy() {}
	};

	function isObject(obj) {
		return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
	}
	//	var _toString = Object.prototype.toString;
	//	Exposure to message objects is not recommended, and is destroyed for more powerful boxes
	var message = function message() {

		var option = Object.assign({}, defaultOption, isObject(arguments.length <= 0 ? undefined : arguments[0]) ? arguments.length <= 0 ? undefined : arguments[0] : {
			type: arguments.length <= 0 ? undefined : arguments[0],
			context: arguments.length <= 1 ? undefined : arguments[1]
		});
		if (!option.context) throw '[message] If you use the object argument form, be aware!"Context" is required';
		//option
		var id = 'message_' + seed++,
		    cardinalNumber = parseInt(instances.store.length / 10);

		function MessageConstructor(data) {
			var div = document.createElement('div');
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
		//		172.217.5.206
		//	 Generate and add to the body...
		var messageBox = new MessageConstructor();

		document.body.appendChild(messageBox.dom);

		instances.push(messageBox);
		var element = document.getElementById(id);
		element.style.animationDelay = cardinalNumber + 's';
		element.style.animationDuration = cardinalNumber + option.animationDuration + 's';
		element.className += ' entranceBox';

		setTimeout(function () {
			instances.closeSingle(id);
		}, parseInt(option.animationDuration * 1000));
	};

	return message;
});