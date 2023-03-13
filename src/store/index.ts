  export  class storeSteward {
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