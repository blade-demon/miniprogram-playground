// components/custom-swiper/custom-swiper.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 轮播数据
    items: {
      type: Array,
      value: [],
    },
    // 轮播高度
    height: {
      type: Number,
      value: 200,
    },
    // 是否自动播放
    autoplay: {
      type: Boolean,
      value: true,
    },
    // 自动播放间隔
    interval: {
      type: Number,
      value: 3000,
    },
    // 是否显示指示器
    showDots: {
      type: Boolean,
      value: true,
    },
    // 是否显示箭头
    showArrows: {
      type: Boolean,
      value: false,
    },
    // 是否循环播放
    loop: {
      type: Boolean,
      value: true,
    },
    // 动画持续时间
    duration: {
      type: Number,
      value: 300,
    },
    // 内容类型：image(图片) | custom(自定义)
    contentType: {
      type: String,
      value: "image",
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0,
    translateX: 0,
    itemWidth: 0,
    containerWidth: 0,
    transition: "",
    autoplayTimer: null as any,
  },

  /**
   * 组件生命周期
   */
  lifetimes: {
    attached() {
      this.initSwiper();
    },
    detached() {
      this.clearAutoplay();
    },
  },

  /**
   * 组件属性变化监听
   */
  observers: {
    "autoplay, interval": function (autoplay: boolean, interval: number) {
      // 当自动播放状态或间隔改变时，重新启动自动播放
      if (autoplay) {
        this.clearAutoplay();
        this.startAutoplay();
      } else {
        this.clearAutoplay();
      }
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 初始化轮播
    initSwiper() {
      const { items } = this.properties;
      if (items.length === 0) return;

      // 获取容器宽度
      this.getContainerWidth();

      // 开始自动播放
      if (this.properties.autoplay) {
        this.startAutoplay();
      }
    },

    // 获取容器宽度
    getContainerWidth() {
      const query = this.createSelectorQuery();
      query
        .select(".swiper-container")
        .boundingClientRect((rect: any) => {
          if (rect) {
            const containerWidth = rect.width;
            const itemWidth = containerWidth;

            this.setData({
              containerWidth,
              itemWidth,
            });
          }
        })
        .exec();
    },

    // 切换到指定索引
    goToIndex(index: number) {
      const { items, loop, containerWidth } = this.data;
      const totalItems = items.length;

      if (index < 0) {
        if (loop) {
          index = totalItems - 1;
        } else {
          index = 0;
        }
      } else if (index >= totalItems) {
        if (loop) {
          index = 0;
        } else {
          index = totalItems - 1;
        }
      }

      const translateX = -index * containerWidth;

      this.setData({
        currentIndex: index,
        translateX,
        transition: `transform ${this.properties.duration}ms ease-in-out`,
      });

      // 触发切换事件
      this.triggerEvent("change", {
        index,
        item: items[index],
      });
    },

    // 下一张
    next() {
      const { currentIndex } = this.data;
      this.goToIndex(currentIndex + 1);
    },

    // 上一张
    prev() {
      const { currentIndex } = this.data;
      this.goToIndex(currentIndex - 1);
    },

    // 开始自动播放
    startAutoplay() {
      this.clearAutoplay();

      const timer = setInterval(() => {
        this.next();
      }, this.properties.interval);

      this.setData({ autoplayTimer: timer });
    },

    // 清除自动播放
    clearAutoplay() {
      if (this.data.autoplayTimer) {
        clearInterval(this.data.autoplayTimer);
        this.setData({ autoplayTimer: null });
      }
    },

    // 点击指示器
    onDotTap(e: any) {
      const index = e.currentTarget.dataset.index;
      
      // 添加点击反馈
      const dot = e.currentTarget;
      dot.style.transform = 'scale(0.9)';
      setTimeout(() => {
        dot.style.transform = '';
      }, 150);
      
      this.goToIndex(index);
    },

    // 点击上一张
    onPrevTap() {
      this.prev();
    },

    // 点击下一张
    onNextTap() {
      this.next();
    },

    // 点击轮播项
    onItemTap(e: any) {
      const { index, item } = e.currentTarget.dataset;
      this.triggerEvent("itemTap", { index, item });
    },
  },
});
