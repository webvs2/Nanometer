"use strict";
import "./src/css/index.scss";
import { filter, delay } from "lodash-es";
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
    this.store.push(value);
    this.pastDue.push(this.timebomb(value));
  }
  timebomb(data: { source: any; dom: any; box: any }) {
    let { source, dom, box } = data;
    return setTimeout(() => {
      dom.className = "entranceBoxOut " + dom.className;
      // delay(
      //   function (isEmpty: any) {
      //     // entranceBox.
      //     document.body.removeChild(box);
      //   },
      //   1000,
      //   this.store.length
      // );
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
    animationDuration: 3000, //ms
    destroy: null,
  } as optionType;
  seed: number = 0;
  isContainer: boolean = false;
  containerDom: HTMLElement;
  // defaultOption: {
  //   type: "info",
  //   animationDuration: 3000, //ms
  //   destroy: null,
  // };
  constructor(option) {
    // process.ENV
    // if(){

    // }
    console.log("thanks!😄");
    // console.log(process.env)
  }
  alteration(option) {
    this.option = Object.assign({}, this.option, option);
    console.log("option", this.isContainer);
    this.establish();
  }
  // reate

  establish() {
    // let option: {
    //   context?: any;
    //   egoClass?: any;
    //   type?: any;
    // } = this.option;
    let { option } = this;
    if (!option.context)
      throw '[message] If you use the object argument form, be aware!"Context" is required';
    let id = "message_" + this.seed++;
    function MessageConstructor(data: {}): resultType {
      const elem = render({
        tag: "div",
        children: option.context,
        attr: {
          class: `alert-${option.type}   nan-alert  enter ${option.egoClass} `,
          id: id,
          style: { zindex: 1111 },
        },
      });

      return {
        // dom: div,
        dom: elem,
        id: id,
        domID: "#" + id,
        source: data,
        // box: elem,
      } as resultType;
    }
    //	 Generate and add to the body...
    let messageBox = MessageConstructor(option);
    let { source, dom, containerDom } = messageBox;
    // {}
    source.animationDuration =
      source.animationDuration + instances.store.length * 60;
    // containerDom = this.containerDom;
    // instances.push(messageBox);
    // console.log('dom',dom)
    document.body.appendChild(dom);
  }
}

let MessageBox = new MessageClass({});
let message = (...data: any[]) => {
  console.log("data", data);
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
