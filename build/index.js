new Sha({
  el: '#root',
  template: `
    <div class="container" s-on:mousemove="handleMove">
      <div class="count">
        {{count}}
      </div>
      <div class="name">
        {{name}}
      </div>
    </div>
  `,
  data: {
    count: 0,
    name: 'lxfriday',
  },
  methods: {
    debounce(func, wait) {
      const that = this;

      return function () {
        clearTimeout(that.timeout);
        that.timeout = setTimeout(func, wait);
      };
    },
    handleMove() {
      const that = this;
      console.log('say Hello');
      this.debounce(function () {
        that.count++;
      }, 1000)();
    },
  },
  mounted() {
    this.timeout = null;
  },
});
