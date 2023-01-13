// obj {
//     tab,
//     children
// }

interface objType {
    tag:string,
    children:any
}

let render = (obj:objType, root?:HTMLElement) => {
  const el = document.createElement(obj.tag);
  if (typeof obj.children === "string") {
    const text = document.createTextNode(obj.children);
    el.appendChild(text);
  } else {
  }
  return  root?root.appendChild(el):el
//   root.appendChild(el);
};
export default render