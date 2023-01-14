"use strict";
import "./src/css/index.scss";
// import { filter, delay } from "lodash";
import render from "./src/render";
class storeSteward {
  store: any[] = [];
  pastDue: any[] = [];
  constructor(Store) {
    this.store = Store;
    // this.pastDue = [];
  }
  push(value) {
    let index = this.pastDue.length;
    this.pastDue.push(this.timebomb(value, index));
  }
  timebomb(data, index) {
    let { source, dom } = data;
    return setTimeout(() => {
      let { pastDue } = this;
      dom.className = "out " + dom.className;
      dom.addEventListener(
        "animationend",
        function () {
          source.postEvent?.();
          document.body.removeChild(dom);
          // console.log("timebomb", pastDue);
        },
        false
      );
      clearTimeout(pastDue[index]);
      pastDue[index] = null;
    }, source.animationDuration);
  }
  closeAll() {
    let { pastDue } = this;
    pastDue.map((item, index) => {
      clearTimeout(item);
      item = null;
    });
    pastDue = [];
    return new Promise((resolve, reject) => {
      if (!pastDue.length) {
        resolve(true);
      } else {
        reject(false);
      }
    });
  }

}
let store = new storeSteward([]);

//	Exposure to message objects is not recommended, and is postEvented for more powerful boxes
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
  postEvent: null;
}

class MessageClass {
  option = {
    type: "info",
    animationDuration: 1000, //ms
    postEvent: null,
    egoClass: "",
  } as optionType;
  seed: number = 0;
  isContainer: boolean = false;
  containerDom: HTMLElement;
  constructor(option) {
    // process.ENV
    if (false) {
      console.log("thanks!😄");
    }
  }
  alteration(option) {
    this.option = Object.assign({}, this.option, option);
    this.establish();
  }
  establish() {
    let { option, seed } = this;
    console.log('this',this)
    if (!option.context)
      throw '[message] If you use the object argument form, be aware!"Context" is required';
    let id = "message_" + seed++;
    // console.log('this.seed',this.seed)
    function MessageConstructor(data: {}): resultType {
      const elem = render({
        tag: "div",
        children: option.context,
        attr: {
          class: `alert-${option.type} nan-alert enter ${option.egoClass} `,
          id: id,
          style: { zindex: 100 + seed },
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
