import { cssAttrSymbolTransition as cast} from "./util"

interface objType {
  tag: string;
  children?: any;
  attr?: any;
}

 let cssTransition=(attr)=>{
    let text ='';
    Object.keys(attr).map(item=>{
      text= text  +`${cast(item)}:${attr[item]};`
    })
    return text
 }

let render = (obj: objType, root?: HTMLElement) => {
  const el = document.createElement(obj.tag);
  if (!!obj.attr) {
    Object.keys(obj.attr).map((item) => {
      let property: any = null;
      if (typeof obj.attr?.[item] === "object") {
        property = cssTransition(obj.attr?.[item]);
      }
      el.setAttribute(item, property || obj.attr?.[item]);
    });
  }
  if (typeof obj.children == "string"||typeof obj.children == "number" ) {
    const text = document.createTextNode( String( obj.children) );
    el.appendChild(text);
  } else if (obj.children) {
    obj.children.forEach((element) => render(element, el));
  }
  return root ? root.appendChild(el) : el;
};
export default render;
