(function(g,f){typeof exports==='object'&&typeof module!=='undefined'?module.exports=f():typeof define==='function'&&define.amd?define(f):(g=typeof globalThis!=='undefined'?globalThis:g||self,g.$message=f());})(this,(function(){'use strict';let differenceBy = require('lodash/differenceBy'); // console.log(isObject(1))


var PopupManager = {
  zIndex: 2000,
  nextZIndex: function nextZIndex() {
    return PopupManager.zIndex++;
  }
};
let seed = 1;

class storeSteward {
  constructor(Store) {
    this.store = Store;
  }

  push(value) {
    // console.log(this.store)
    if (this.store.length > 0) {
      this.closeAll();
    }

    this.store.push(value);
  }

  closeAll() {
    return new Promise((resolve, reject) => {
      this.store.map((item, index) => {
        this.closeSingle(item.id, item.source);
      });
      resolve(true);
    });
  }

  closeSingle(id, source) {
    if (!!source.destroy) {
      source.destroy();
    }

    this.store = differenceBy(this.store, [{
      id: id
    }], 'id');
    document.body.removeChild(document.getElementById(id));
  }

}

let instances = new storeSteward([]); //	Exposure to message objects is not recommended, and is destroyed for more powerful boxes

class MessageClass {
  constructor(option) {
    this.option = {};
    this.defaultOption = {
      type: 'info',
      animationDuration: 2,
      egoClass: '',
      context: '',
      destroy: null
    };
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
      div.className = `alert-${option.type}  alert  nan-alert entranceBox  ${option.egoClass}`;
      div.role = 'alert';
      div.id = id;
      div.innerText = option.context;
      div.style.zIndex = PopupManager.nextZIndex();
      return {
        dom: div,
        id: id,
        domID: '#' + id,
        source: data
      };
    } //	 Generate and add to the body...


    let messageBox = new MessageConstructor(option);
    messageBox.dom.style.animationDelay = cardinalNumber + 's';
    messageBox.dom.style.animationDuration = cardinalNumber + option.animationDuration + 's';
    document.body.appendChild(messageBox.dom);
    instances.push(messageBox);
  }

}
let MessageBox = new MessageClass();

let message = (...data) => {
  MessageBox.alteration(data.length < 2 ? data[0] : {
    type: data[0],
    context: data[1]
  });
};

new Array('success', 'warning', 'info', 'error').map((item, index) => {
  message[item] = value => {
    MessageBox.alteration({
      type: item,
      context: value
    });
  };
});return message;}));