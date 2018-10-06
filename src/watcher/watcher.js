// 对某个属性添加监听，属性变动之后，触发回调
export default class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm;
    this.key = key;
    this.cb = cb;
    this.val = null;
    this.init(vm.data);
  }

  // 通知更新
  update() {
    const that = this;
    const newValue = that.vm.data[that.key];
    if (that.val !== newValue) {
      that.cb && that.cb.call(that.vm, newValue);
      that.val = newValue;
    }
  }

  // 创建监听器的时候，初始化的操作
  // 把监听器添加到对应属性的队列中去
  init() {
    const that = this;
    const { key } = that;
    Dep.target = this;
    this.val = that.vm.data[key];
    Dep.target = null;
  }
}
