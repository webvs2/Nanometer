interface objType {
  tag: string;
  children?: any;
  attr?: any;
}

let render = (obj: objType, root?: HTMLElement)=> {
  const el = document.createElement(obj.tag);
  if (!!obj.attr) {
    Object.keys(obj.attr).map((item) => {
      let property: any = null
      if (typeof obj.attr?.[item] === 'object') {
        property = JSON.stringify(obj.attr?.[item])
      }
      el.setAttribute(item, property || obj.attr?.[item]);
    });
  }
  if (typeof obj.children === "string"||"number") {
    const text = document.createTextNode(obj.children);
    el.appendChild(text);
  } else if (  obj.children ) {
    console.log(' obj.children',obj.children)
    obj.children.forEach((element) => render(element, el));
  }
  return root ? root.appendChild(el) : el;
};
export default render;
