import observe from './observer/observer';
import Compile from './compiler/compiler';

class Sha {
  constructor(opts) {
    const that = this;
    const {
      mounted,
    } = opts;

    this.data = opts.data;
    this.methods = opts.methods;

    // 将 data 挂接到对象上
    that.proxyData();
    // method 挂接到对象上
    that.proxyMethods();

    // 对数据进行 observe
    observe(that.data);
    // 编译视图部分
    new Compile(that, opts, {
      mounted() {
        mounted.call(that);
      },
    });
  }

  // 将 methods 挂接到对象上
  proxyMethods() {
    const that = this;
    const { methods } = this;

    Object.keys(methods).forEach((funcName) => {
      that[funcName] = methods[funcName];
    });
  }

  // 将 data 挂接到对象上
  proxyData() {
    const that = this;

    Object.keys(that.data).forEach(key => {
      Object.defineProperty(that, key, {
        enumerable: true,
        configurable: true,
        set(newVal) {
          that.data[key] = newVal;
        },
        get() {
          return that.data[key];
        },
      });
    });
  }
}

window.Sha = Sha;
