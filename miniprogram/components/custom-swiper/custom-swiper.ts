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
    // 是否启用手势滑动
    enableSwipe: {
      type: Boolean,
      value: true,
    },
    // 滑动阈值（像素）
    swipeThreshold: {
      type: Number,
      value: 50,
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
    // 触摸相关状态
    startX: 0,
    startY: 0,
    currentX: 0,
    isDragging: false,
    dragOffset: 0,
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

    // 重置自动播放计时器
    resetAutoplay() {
      if (this.properties.autoplay) {
        this.startAutoplay();
      }
    },

    // 点击指示器
    onDotTap(e: any) {
      const index = e.currentTarget.dataset.index;

      // 添加点击反馈
      const dot = e.currentTarget;
      dot.style.transform = "scale(0.9)";
      setTimeout(() => {
        dot.style.transform = "";
      }, 150);

      this.goToIndex(index);
      // 重置自动播放计时器
      this.resetAutoplay();
    },

    // 点击上一张
    onPrevTap() {
      this.prev();
      // 重置自动播放计时器
      this.resetAutoplay();
    },

    // 点击下一张
    onNextTap() {
      this.next();
      // 重置自动播放计时器
      this.resetAutoplay();
    },

    // 点击轮播项
    onItemTap(e: any) {
      const { index, item } = e.currentTarget.dataset;
      this.triggerEvent("itemTap", { index, item });
    },

    // ========== 手势滑动相关方法 ==========

    // 触摸开始
    onTouchStart(e: any) {
      if (!this.properties.enableSwipe) return;

      const touch = e.touches[0];

      // 暂停自动播放
      this.clearAutoplay();

      this.setData({
        startX: touch.clientX,
        startY: touch.clientY,
        currentX: touch.clientX,
        isDragging: true,
        dragOffset: 0,
        transition: "none", // 禁用过渡动画
      });
    },

    // 触摸移动
    onTouchMove(e: any) {
      if (!this.properties.enableSwipe || !this.data.isDragging) return;

      const touch = e.touches[0];
      const { startX, startY, currentIndex, containerWidth } = this.data;

      // 计算移动距离
      const deltaX = touch.clientX - startX;
      const deltaY = touch.clientY - startY;

      // 判断是否为水平滑动（避免垂直滚动冲突）
      if (Math.abs(deltaX) < Math.abs(deltaY)) {
        // 如果是垂直滑动，不阻止事件冒泡，允许页面滚动
        return;
      }

      // 如果是水平滑动，阻止事件冒泡，防止页面滚动
      // 在微信小程序中，使用 catchtouchmove 已经阻止了事件冒泡

      // 计算拖拽偏移量
      const dragOffset = deltaX;
      const translateX = -currentIndex * containerWidth + dragOffset;

      this.setData({
        currentX: touch.clientX,
        dragOffset,
        translateX,
      });
    },

    // 触摸结束
    onTouchEnd(e: any) {
      if (!this.properties.enableSwipe || !this.data.isDragging) return;

      const { dragOffset, currentIndex } = this.data;
      const { swipeThreshold } = this.properties;

      // 恢复过渡动画
      this.setData({
        isDragging: false,
        transition: `transform ${this.properties.duration}ms ease-in-out`,
      });

      // 判断滑动方向和距离
      if (Math.abs(dragOffset) > swipeThreshold) {
        if (dragOffset > 0) {
          // 向右滑动，显示上一张
          this.goToIndex(currentIndex - 1);
        } else {
          // 向左滑动，显示下一张
          this.goToIndex(currentIndex + 1);
        }
        // 滑动导致切换，重置自动播放计时器
        this.resetAutoplay();
      } else {
        // 滑动距离不够，回到原位
        this.goToIndex(currentIndex);
        // 滑动未导致切换，恢复自动播放
        if (this.properties.autoplay) {
          this.startAutoplay();
        }
      }
    },

    // 触摸取消
    onTouchCancel(e: any) {
      if (!this.properties.enableSwipe) return;

      const { currentIndex } = this.data;

      this.setData({
        isDragging: false,
        transition: `transform ${this.properties.duration}ms ease-in-out`,
      });

      // 回到原位
      this.goToIndex(currentIndex);

      // 触摸取消，恢复自动播放
      if (this.properties.autoplay) {
        this.startAutoplay();
      }
    },
  },
});
