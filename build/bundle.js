
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.$message = factory());
})(this, (function () { 'use strict';

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
	    // console.log(this.store)
	    if (this.store.length > 3) {
	      this.closeAll();
	    }

	    this.store.push(value);
	  }

	  closeAll() {
	    return new Promise((resolve, reject) => {
	      this.store.forEach((item, index) => {
	        this.closeSingle(item.id);
	      });
	      resolve(true);
	    });
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
	    });
	  }

	} // class msgObj{
	// }


	let instances = new storeSteward([]);

	function isObject(obj) {
	  return obj !== null && typeof obj === 'object';
	} //	var _toString = Object.prototype.toString;
	//	Exposure to message objects is not recommended, and is destroyed for more powerful boxes


	class MessageClass {
	  constructor(option) {
	    //  if(!option) return false
	    this.option = {};
	    this.defaultOption = {
	      type: 'info',
	      animationDuration: 2.5,
	      egoClass: '',
	      context: '',
	      destroy: ''
	    }; // this.establish()
	  }

	  alteration(option) {
	    this.option = Object.assign({}, this.defaultOption, option);
	    this.establish();
	  } // reate


	  establish() {
	    let option = this.option;
	    if (!option.context) throw '[message] If you use the object argument form, be aware!"Context" is required';
	    let id = 'message_' + seed++,
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
	    } //	 Generate and add to the body...


	    let messageBox = new MessageConstructor();
	    document.body.appendChild(messageBox.dom);
	    instances.push(messageBox);
	    let element = document.getElementById(id);
	    element.style.animationDelay = cardinalNumber + 's';
	    element.style.animationDuration = cardinalNumber + option.animationDuration + 0.8 + 's';
	    element.className += ' entranceBox';
	  }

	}

	let defaultOption = {
	  type: 'info',
	  animationDuration: 2.5,
	  egoClass: '',
	  context: '',
	  destroy: ''
	};
	let MessageBox = new MessageClass();

	let message = function (...val) {
	  let option = Object.assign({}, defaultOption, isObject(val[0]) ? val[0] : {
	    type: val[0],
	    context: val[1]
	  });
	  MessageBox.alteration(option);
	};

	new Array('success', 'warning', 'info', 'error').map((item, index) => {
	  message[item] = function (value) {
	    MessageBox.alteration({
	      type: item,
	      context: value
	    });
	  };
	});

	return message;

}));
//# sourceMappingURL=bundle.js.map
