import "./src/styles/index.scss";
import render from "./src/render";
import { optionType, resultType } from "./src/type";
import { storeSteward } from "./src/store/index";
import { className} from "./src/util"
let store = new storeSteward([]);

//	Exposure to message objects is not recommended, and is postEvented for more powerful boxes

class MessageClass {
  defaultOption = {
    type: "info",
    durationTime: 1000, //ms
    postEvent: null,
    class: "",
    center:true
  };
  option = {} as optionType;
  seed: number = 0;
  isContainer: boolean = false;
  containerDom: HTMLElement;
  constructor(option) {}

  //class function🚩
  alteration(option) {
    this.option = Object.assign({}, this.defaultOption, option);
    this.establish();
  }
  establish() {
    let { seed, option } = this;
    this.seed++
    if (!option.content) {throw '[message] If you use the object argument form, be aware!"content" is required';}
    let id = "message_" + seed;
    function MessageConstructor(data: {}): resultType {
      const elem = render({
        tag: "div",
        children: [
          {
            tag: "i",
            attr: {
              class: `iconfont nan-icon icon-${option.type}`,
            },
          },
          {
            tag: "span",
            children: option.content,
          },
        ],
        attr: {
          class:className(`alert-${option.type} nan-alert enter ${option.class}  ${
            option.center ? "center" : ""
          }`) ,
          id: id,
          style: { zIndex: 100 + seed},
        },
      });

      return {
        dom: elem,
        id: id,
        domID: `#${id}`,
        source: data,
      } as resultType;
    }
    //	 Generate and add to the body🐱‍🏍...
    let messageBox = MessageConstructor(option);
    let { source, dom } = messageBox;
    source.durationTime = source.durationTime + seed * 100+ (typeof option.content ==="string"?option.content.length*6:0);
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
export default message
