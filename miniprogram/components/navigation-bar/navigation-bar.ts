Component({
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    extClass: {
      type: String,
      value: "",
    },
    title: {
      type: String,
      value: "",
    },
    background: {
      type: String,
      value: "",
    },
    color: {
      type: String,
      value: "",
    },
    back: {
      type: Boolean,
      value: true,
    },
    loading: {
      type: Boolean,
      value: false,
    },
    homeButton: {
      type: Boolean,
      value: false,
    },
    animated: {
      // 显示隐藏的时候opacity动画效果
      type: Boolean,
      value: true,
    },
    show: {
      // 显示隐藏导航，隐藏的时候navigation-bar的高度占位还在
      type: Boolean,
      value: true,
      observer: "_showChange",
    },
    // back为true的时候，返回的页面深度
    delta: {
      type: Number,
      value: 1,
    },
    // 是否固定在页面顶部
    fixed: {
      type: Boolean,
      value: false,
    },
    // 是否启用滚动监听
    enableScroll: {
      type: Boolean,
      value: false,
    },
    // 透明背景色
    transparentBackground: {
      type: String,
      value: "rgba(0,0,0,0)",
    },
    // 不透明背景色
    opaqueBackground: {
      type: String,
      value: "#fdacfa",
    },
    // 是否显示自定义内容
    showCustomContent: {
      type: Boolean,
      value: false,
    },
    // 页面滚动位置（由页面传递）
    pageScrollTop: {
      type: Number,
      value: 0,
      observer: "_onPageScroll",
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    displayStyle: "",
    currentBackground: "rgba(0,0,0,0)",
    scrollTop: 0,
    isScrolled: false,
  },
  lifetimes: {
    attached() {
      const rect = wx.getMenuButtonBoundingClientRect();
      wx.getSystemInfo({
        success: (res) => {
          const isAndroid = res.platform === "android";
          const isDevtools = res.platform === "devtools";
          this.setData({
            ios: !isAndroid,
            innerPaddingRight: `padding-right: ${
              res.windowWidth - rect.left
            }px`,
            leftWidth: `width: ${res.windowWidth - rect.left}px`,
            safeAreaTop:
              isDevtools || isAndroid
                ? `height: calc(var(--height) + ${res.safeArea.top}px); padding-top: ${res.safeArea.top}px`
                : ``,
            currentBackground: this.data.transparentBackground,
          });
        },
      });

      // 如果启用滚动监听，设置初始背景
      if (this.data.enableScroll) {
        this.setData({
          currentBackground: this.data.transparentBackground,
        });
      }
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    _showChange(show: boolean) {
      const animated = this.data.animated;
      let displayStyle = "";
      if (animated) {
        displayStyle = `opacity: ${show ? "1" : "0"};transition:opacity 0.5s;`;
      } else {
        displayStyle = `display: ${show ? "" : "none"}`;
      }
      this.setData({
        displayStyle,
      });
    },
    back() {
      const data = this.data;
      if (data.delta) {
        wx.navigateBack({
          delta: data.delta,
        });
      }
      this.triggerEvent("back", { delta: data.delta }, {});
    },
    // 处理页面滚动（由页面传递）
    _onPageScroll(scrollTop: number) {
      if (!this.data.enableScroll) return;

      const isScrolled = scrollTop > 10; // 滚动超过10px时开始变化

      // 计算背景透明度
      let background = this.data.transparentBackground;
      if (isScrolled) {
        background = this.data.opaqueBackground;
      }

      this.setData({
        scrollTop,
        isScrolled,
        currentBackground: background,
      });
    },
    // 更新背景色
    updateBackground() {
      const background = this.data.isScrolled
        ? this.data.opaqueBackground
        : this.data.transparentBackground;
      this.setData({
        currentBackground: background,
      });
    },
  },
  observers: {
    enableScroll: function (enableScroll: boolean) {
      if (enableScroll) {
        this.updateBackground();
      }
    },
    "transparentBackground, opaqueBackground": function () {
      this.updateBackground();
    },
  },
});
