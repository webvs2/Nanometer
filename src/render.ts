interface objType {
  tag: string;
  children?: any;
  attr?:  any ;
}

let render = (obj: objType, root?: HTMLElement) => {
  const el = document.createElement(obj.tag);
  if (!!obj.attr) {
    Object.keys(obj.attr).map((item) => {
      el.setAttribute(item, obj.attr?.[item]);
    });
  }

  if (typeof obj.children === "string") {
    const text = document.createTextNode(obj.children);
    el.appendChild(text);
  } else if (obj.children) {
    obj.children.forEach((element) => render(element, el));
  }
  return root ? root.appendChild(el) : el;
};
export default render;
