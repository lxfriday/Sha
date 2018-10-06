// 对属性添加 setter、getter
class Observer {
  constructor(data) {
    this.data = data;
    this.init(data);
  }

  init(data) {
    Object.keys(data).forEach(key => this.defineReactive(data, key, data[key]));
  }

  defineReactive(data, key, val) {
    const dep = new Dep();
    observe(val);
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      set(newVal) {
        if (val === newVal) return false;
        val = newVal;
        dep.notify();
      },
      get() {
        if (Dep.target) {
          dep.add(Dep.target);
        }
        return val;
      },
    });
  }
}

function observe(val) {
  if (!val || typeof val !== 'object') return false;
  return new Observer(val);
}

class Dep {
  constructor() {
    // 通知队列
    this.queue = [];
  }

  add(e) {
    this.queue.push(e);
  }

  // 触发更新
  notify() {
    this.queue.forEach(v => v.update());
  }
}

Dep.target = null;

global.Dep = Dep;

export default observe;
