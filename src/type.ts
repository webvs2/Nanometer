export interface optionType {
    type: string;
    durationTime: number; //ms
    class?: string;
    content?: string;
    postEvent: null;
    center:boolean
  }
  export interface resultType {
    dom: HTMLElement;
    id: String;
    domID: String;
    source: any;
    [propName: string]: any;
  }