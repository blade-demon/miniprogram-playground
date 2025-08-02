// components/marquee/marquee.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    messages: {
      type: Array,
      value: [],
    },
    speed: {
      type: Number,
      value: 100, // 滚动速度，数值越小越快
    },
    autoPlay: {
      type: Boolean,
      value: true,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0,
    currentMessage: {} as any,
    translateX: 0,
    animationData: {},
    containerWidth: 0,
    textWidth: 0,
    timer: null as any,
    switchTimer: null as any,
  },

  /**
   * 组件生命周期
   */
  lifetimes: {
    attached() {
      this.initMarquee();
    },
    detached() {
      this.clearTimers();
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 初始化跑马灯
    initMarquee() {
      const { messages } = this.properties;
      if (messages.length === 0) return;

      this.setData({
        currentMessage: messages[0],
      });

      // 延迟获取尺寸，确保DOM渲染完成
      setTimeout(() => {
        this.getElementSize();
      }, 100);
    },

    // 获取元素尺寸
    getElementSize() {
      const query = this.createSelectorQuery();

      // 获取容器宽度
      query.select(".marquee-content").boundingClientRect((rect) => {
        if (rect) {
          this.setData({ containerWidth: rect.width });
        }
      });

      // 获取文字宽度
      query.select(".marquee-text").boundingClientRect((rect) => {
        if (rect) {
          this.setData({ textWidth: rect.width });
          // 设置初始位置并开始动画
          this.startAnimation();
        }
      });

      query.exec();
    },

    // 开始动画
    startAnimation() {
      const { containerWidth, textWidth, speed } = this.data;

      if (textWidth <= containerWidth) {
        // 文字宽度小于容器宽度，居中显示，不需要滚动
        this.setData({
          translateX: (containerWidth - textWidth) / 2,
        });
        return;
      }

      // 设置初始位置：文字完全在容器右边外部
      const startX = containerWidth;
      // 设置结束位置：文字完全在容器左边外部
      const endX = -textWidth;

      // 计算滚动距离和时间
      const distance = startX - endX; // containerWidth + textWidth
      const duration = distance * speed;

      // 先设置初始位置
      this.setData({
        translateX: startX,
      });

      // 延迟一点开始动画，确保初始位置设置完成
      setTimeout(() => {
        // 创建动画
        const animation = wx.createAnimation({
          duration: duration,
          timingFunction: "linear",
        });

        animation.translateX(endX).step();

        this.setData({
          animationData: animation.export(),
        });

        // 动画结束后重置并切换下一条消息
        const timer = setTimeout(() => {
          this.switchMessage();
        }, duration);

        this.setData({ timer });
      }, 50);
    },

    // 重置动画
    resetAnimation() {
      // 清除动画，恢复到初始状态
      this.setData({
        animationData: {},
        translateX: this.data.containerWidth,
      });
    },

    // 切换消息
    switchMessage() {
      const { messages } = this.properties;
      const { currentIndex } = this.data;

      if (messages.length <= 1) {
        // 只有一条消息，重新开始动画
        this.resetAnimation();
        setTimeout(() => {
          this.startAnimation();
        }, 200);
        return;
      }

      const nextIndex = (currentIndex + 1) % messages.length;

      this.setData({
        currentIndex: nextIndex,
        currentMessage: messages[nextIndex],
      });

      // 重置动画状态
      this.resetAnimation();

      // 延迟一下再开始下一个动画，等待DOM更新
      const switchTimer = setTimeout(() => {
        this.getElementSize();
      }, 200);

      this.setData({ switchTimer });
    },

    // 开始滚动
    startScroll() {
      this.getElementSize();
    },

    // 清理定时器
    clearTimers() {
      const { timer, switchTimer } = this.data;
      if (timer) {
        clearTimeout(timer);
      }
      if (switchTimer) {
        clearTimeout(switchTimer);
      }
    },

    // 点击跑马灯事件
    onMarqueeTap() {
      const { currentMessage } = this.data;
      this.triggerEvent("messageClick", { message: currentMessage });

      console.log("点击消息:", currentMessage);
      wx.showToast({
        title: "查看消息详情",
        icon: "none",
        duration: 1500,
      });
    },

    // 点击更多按钮
    onMoreTap(e: any) {
      e.stopPropagation();
      this.triggerEvent("moreClick");

      console.log("查看更多消息");
      wx.showToast({
        title: "查看更多消息",
        icon: "none",
        duration: 1500,
      });
    },
  },
});
