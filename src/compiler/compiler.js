import Watcher from '../watcher/watcher';

export default class Compile {
  constructor(vm, opts, params) {
    this.vm = vm;
    this._container = document.createElement('div'); // 暂时用来装载 template 的容器
    this._template = opts.template;
    this.el = document.querySelector(opts.el);
    this.fragment = null;
    this.init();

    params.mounted();
  }

  init() {
    const that = this;

    if (that.el) {
      that.compileTemplate();
      that.compileFragment();
      that.compileElement(that.fragment);
      that.el.appendChild(that.fragment);
    } else {
      throw new Error(`el: ${that.el}不存在`);
    }
  }

  // 编译 Text 结点
  compileTextNode(node, key) {
    const that = this;

    node.textContent = that.vm.data[key];
    new Watcher(that.vm, key, function (newVal) {
      node.textContent = newVal;
    });
  }

  compileEvent(node, key, eventType) {
    const that = this;
    const cb = that.vm[key];

    node.addEventListener(eventType, cb.bind(that.vm), false);
  }

  compileElementNode(node) {
    const that = this;
    const attrs = node.attributes;

    [].slice.call(attrs).forEach(attr => {
      const attrName = attr.name;
      if (that.isDirective(attrName)) {
        const dir = attrName.substring(2);
        const key = attr.value;
        if (that.isEventDirective(dir)) {
          that.compileEvent(node, key, dir.split(':')[1]);
        }
      }
    });
  }

  // 对 node 结点进行编译
  compileElement(el) {
    const that = this;

    el.childNodes.forEach(node => {
      // #text
      var reg = /\{\{(.+)\}\}/;
      var text = node.textContent;
      if (that.isElementNode(node)) {
        that.compileElementNode(node);
      } else if (that.isTextNode(node) && reg.test(text)) {
        that.compileTextNode(node, reg.exec(text)[1]);
      }
      if (node.childNodes && node.childNodes.length) {
        that.compileElement(node);
      }
    });
  }

  compileFragment() {
    const that = this;

    that.fragment = document.createDocumentFragment();
    var child = that._container.firstChild;
    while (child) {
      that.fragment.appendChild(child);
      child = that._container.firstChild;
    }
  }

  compileTemplate() {
    this._container.innerHTML = this._template;
  }

  // nodeType === 3
  isTextNode(node) {
    return node.nodeType === 3;
  }

  isElementNode(node) {
    return node.nodeType === 1;
  }

  isDirective(attr) {
    return attr.indexOf('s-') === 0;
  }

  isEventDirective(dir) {
    return dir.indexOf('on') === 0;
  }
}
