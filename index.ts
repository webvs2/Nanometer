"use strict";
import "./src/css/index.scss";
import { cloneDeep } from "lodash";
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
        },
        false
      );
      clearTimeout(pastDue[index]);
      pastDue[index] = null;
    }, source.durationTime);
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
  [propName: string]: any;
}
interface optionType {
  type: string;
  durationTime: number; //ms
  class?: string;
  content?: string;
  postEvent: null;
}

class MessageClass {
  defaultOption= {
    type: "info",
    durationTime: 1000, //ms
    postEvent: null,
    class: "",
  };
  option = {
  } as optionType;
  seed: number = 0;
  isContainer: boolean = false;
  containerDom: HTMLElement;
  constructor(option) {}
  alteration(option) {
    this.option = Object.assign({},this.defaultOption, option);
    this.establish();
  }
  establish() {
    let { seed,option } = this;
    if (!option.content)
      throw '[message] If you use the object argument form, be aware!"content" is required';
    let id = "message_" + seed++;
    function MessageConstructor(data: {}): resultType {
      const elem = render({
        tag: "div",
        children: [

          {
            tag: "span",
            attr: {
              class: "iconfont nan-icon  icon-xiaoxi",
            },
          },
          {
            tag:'span',
            children:option.content
          }
        ],

        // option.content,
        attr: {
          class: `alert-${option.type} nan-alert enter ${option.class} `,
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
    let { source, dom } = messageBox;
    source.durationTime = source.durationTime + seed * 60;
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
          content: data[1],
        }
  );
};
new Array("success", "warning", "info", "error").map((item, index) => {
  message[item] = (value: any) => {
    MessageBox.alteration({ type: item, content: value });
  };
});
export default message;
