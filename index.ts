"use strict";
import "./src/css/index.scss";
import { filter, delay } from "lodash";
import render from "./src/render";
var PopupManager = {
  zIndex: 100,
  nextZIndex: function (): number {
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
    let index =this.pastDue.length
    this.pastDue.push(this.timebomb(value,index));
  }
  timebomb(data,index) {
    let { source, dom } = data;
    dom.addEventListener("transitionend", function () {}, false);
    return setTimeout(() => {
    let { pastDue } = this;
      dom.className = "out " + dom.className;
      dom.addEventListener(
        "animationend",
        function () {
          document.body.removeChild(dom);
          console.log("timebomb", pastDue);
        },
        false
      );
      console.log('index',index)
      clearTimeout(pastDue[index]);
      pastDue[index] = null; 
    }, source.animationDuration);
  }
  closeAll() {
    return new Promise((resolve, reject) => {
      this.pastDue.map((item, index) => {
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
let store = new storeSteward([]);

//	Exposure to message objects is not recommended, and is destroyed for more powerful boxes
interface resultType {
  dom: HTMLElement;
  id: String;
  domID: String;
  source: any;
  // box: HTMLElement;
  [propName: string]: any;
}
interface optionType {
  type: string;
  animationDuration: number; //ms
  egoClass?: string;
  context?: string;
  destroy: null;
}

class MessageClass {
  option = {
    type: "info",
    animationDuration: 1000, //ms
    destroy: null,
    egoClass: "",
  } as optionType;
  seed: number = 0;
  isContainer: boolean = false;
  containerDom: HTMLElement;
  constructor(option) {
    // process.ENV
    // if(){

    // }
    console.log("thanks!😄");
    // console.log(process.env)
  }
  alteration(option) {
    this.option = Object.assign({}, this.option, option);
    this.establish();
  }
  establish() {
    let { option } = this;
    if (!option.context)
      throw '[message] If you use the object argument form, be aware!"Context" is required';
    let id = "message_" + this.seed++;
    function MessageConstructor(data: {}): resultType {
      const elem = render({
        tag: "div",
        children: option.context,
        attr: {
          class: `alert-${option.type} nan-alert enter ${option.egoClass} `,
          id: id,
          style: { zindex: 1111 },
        },
      });

      return {
        dom: elem,
        id: id,
        domID: "#" + id,
        source: data,
      } as resultType;
    }
    //	 Generate and add to the body...
    let messageBox = MessageConstructor(option);
    let { source, dom, containerDom } = messageBox;
    let { seed } = this;
    // {}
    source.animationDuration = source.animationDuration + seed * 60;
    store.push(messageBox);
    document.body.appendChild(dom);
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
