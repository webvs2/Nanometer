"use strict";
// import "./css/index.scss";
import { filter, delay } from "lodash-es";
import render from "./render";
var PopupManager = {
  zIndex: 2000,
  nextZIndex: function nextZIndex() {
    return PopupManager.zIndex++;
  },
};
// let seed=1;
class storeSteward {
  store: any[];
  pastDue: any[];
  constructor(Store) {
    this.store = Store;
    this.pastDue = [];
  }
  push(value) {
    if (this.store.length > 10) {
      this.closeAll();
    }
    this.store.push(value);
    this.pastDue.push(this.timebomb(value));
  }
  timebomb(data: { source: any; dom: any; box: any }) {
    let { source, dom, box } = data;
    return setTimeout(() => {
      dom.className = "entranceBoxOut " + dom.className;
      delay(
        function (isEmpty: any) {
          document.body.removeChild(box);
        },
        1000,
        this.store.length
      );
      this.store = filter(this.store, (o) => o.id == source.id);
    }, source.animationDuration);
  }
  closeAll() {
    return new Promise((resolve, reject) => {
      this.store.map((item, index) => {
        this.closeSingle(item.id, item.source);
      });
      resolve(true);
    });
  }
  closeSingle(id: any, source: { destroy: () => void }) {
    if (!!source.destroy) {
      source.destroy();
    }
  }
}
let instances = new storeSteward([]);

//	Exposure to message objects is not recommended, and is destroyed for more powerful boxes
interface resultType {
  dom: HTMLElement;
  id: String;
  domID: String;
  source: any;
  box: HTMLElement;
  [propName: string]: any;
}
class MessageClass {
  option: {};
  seed: number;
  isContainer: boolean;
  containerDom: HTMLElement;
  defaultOption: {
    type: string;
    animationDuration: number; //ms
    egoClass: string;
    context: string;
    destroy: null;
  };
  constructor(option) {
    this.option = {};
    this.seed = 1;
    this.isContainer = false;
    // this.containerDom = HTMLElement
    this.defaultOption = {
      type: "info",
      animationDuration: 3000, //ms
      egoClass: "",
      context: "",
      destroy: null,
    };
  }
  alteration(option) {
    this.option = Object.assign({}, this.defaultOption, option);
    this.establish();
  }
  // reate

  establish() {
    let option: {
      context?: any;
      egoClass?: any;
      type?: any;
    } = this.option;
    if (!option.context)
      throw '[message] If you use the object argument form, be aware!"Context" is required';
    let id = "message_" + this.seed++;
    function MessageConstructor(data: {}): resultType {
      // let box = <div><div/>
      const box = render({ tag: "div", children: "" });
	  console.log('box',box)
      box.className = "nan-location";
      let div = document.createElement("div") as HTMLElement;
      div.className = `alert-${option.type}    nan-alert entranceBox  ${option.egoClass}`;
      box.id = id;
      div.innerText = option.context;
      div.style.zIndex = String(PopupManager.nextZIndex());
      box.appendChild(div);
      return {
        // dom: div,
        dom: div,
        id: id,
        domID: "#" + id,
        source: data,
        box: box,
      } as resultType;
    }
    //	 Generate and add to the body...
    let messageBox = MessageConstructor(option);
    messageBox.source.animationDuration =
      messageBox.source.animationDuration + instances.store.length * 60;
    document.body.appendChild(messageBox.box);
    messageBox.containerDom = this.containerDom;
    instances.push(messageBox);
  }
  mountDom(dom: any) {
    if (!this.isContainer) {
      let box = document.createElement("div");
      box.className = "nan-location";
      box.id = "nan-location";
      document.body.appendChild(box);
      this.containerDom = box;
      this.isContainer = true;
    }
  }
}

let MessageBox = new MessageClass({});
let message = (...data: any[]) => {
  MessageBox.alteration(
    data.length < 2
      ? data[0]
      : {
          type: data[0],
          context: data[1],
        }
  );
};
new Array("success", "warning", "info", "error").map((item, index) => {
  message[item] = (value: any) => {
    MessageBox.alteration({ type: item, context: value });
  };
});
export default message;

function establish() {
  throw new Error("Function not implemented.");
}
