// components/custom-navigation-bar/custom-navigation-bar.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 标题
    title: {
      type: String,
      value: "",
    },
    // 标题颜色
    titleColor: {
      type: String,
      value: "#000000",
    },
    // 背景色
    backgroundColor: {
      type: String,
      value: "#ffffff",
    },
    // 背景图片
    backgroundImage: {
      type: String,
      value: "",
    },
    // 背景图片模式
    backgroundImageMode: {
      type: String,
      value: "aspectFill",
    },
    // 背景图片透明度
    backgroundImageOpacity: {
      type: Number,
      value: 1.0,
    },
    // 背景图片滤镜
    backgroundImageFilter: {
      type: String,
      value: "",
    },
    // 渐变颜色
    gradientColors: {
      type: String,
      value: "",
    },
    // 渐变方向
    gradientDirection: {
      type: String,
      value: "to right",
    },
    // 是否显示返回按钮
    showBackButton: {
      type: Boolean,
      value: true,
    },
    // 返回按钮图标
    backIcon: {
      type: String,
      value: "/images/icons/back.png",
    },
    // 右侧按钮
    rightButtons: {
      type: Array,
      value: [],
    },
    // 背景类型
    backgroundType: {
      type: String,
      value: "color", // color, image, gradient
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusBarHeight: 0,
    navBarHeight: 44,
    backgroundStyle: "",
  },

  /**
   * 组件的生命周期
   */
  lifetimes: {
    attached() {
      this.initNavigationBar();
      this.updateBackgroundStyle();
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 初始化导航栏
     */
    initNavigationBar() {
      const systemInfo = wx.getSystemInfoSync();
      const statusBarHeight = systemInfo.statusBarHeight;
      const navBarHeight = 44; // 导航栏固定高度

      this.setData({
        statusBarHeight,
        navBarHeight,
      });
    },

    /**
     * 更新背景样式
     */
    updateBackgroundStyle() {
      const { backgroundColor, backgroundImage, gradientColors } =
        this.properties;
      let backgroundStyle = backgroundColor;

      if (gradientColors) {
        backgroundStyle = `linear-gradient(${this.properties.gradientDirection}, ${gradientColors})`;
      } else if (backgroundImage) {
        backgroundStyle = `url(${backgroundImage})`;
      }

      this.setData({
        backgroundStyle,
      });
    },

    /**
     * 返回按钮点击事件
     */
    onBackTap() {
      this.triggerEvent("back");
      wx.navigateBack({
        delta: 1,
      });
    },

    /**
     * 右侧按钮点击事件
     */
    onRightButtonTap(e: any) {
      const { index } = e.currentTarget.dataset;
      this.triggerEvent("rightButtonTap", { index });
    },

    /**
     * 动态设置背景图片
     */
    setBackgroundImage(
      imageUrl: string,
      options: {
        mode?: string;
        opacity?: number;
        filter?: string;
      } = {}
    ) {
      this.setData({
        backgroundImage: imageUrl,
        backgroundImageMode: options.mode || "aspectFill",
        backgroundImageOpacity: options.opacity || 1.0,
        backgroundImageFilter: options.filter || "",
        backgroundType: "image",
      });
      this.updateBackgroundStyle();
    },

    /**
     * 动态设置渐变背景
     */
    setGradientBackground(colors: string, direction: string = "to right") {
      this.setData({
        gradientColors: colors,
        gradientDirection: direction,
        backgroundType: "gradient",
      });
      this.updateBackgroundStyle();
    },

    /**
     * 动态设置背景色
     */
    setBackgroundColor(color: string) {
      this.setData({
        backgroundColor: color,
        backgroundType: "color",
      });
      this.updateBackgroundStyle();
    },

    /**
     * 根据时间设置动态背景
     */
    setTimeBasedBackground() {
      const now = new Date();
      const hour = now.getHours();

      if (hour < 6) {
        // 深夜：深蓝色渐变
        this.setGradientBackground("#1a1a2e, #16213e", "to bottom");
      } else if (hour < 12) {
        // 上午：浅蓝色渐变
        this.setGradientBackground("#e3f2fd, #bbdefb", "to bottom");
      } else if (hour < 18) {
        // 下午：橙色渐变
        this.setGradientBackground("#fff3e0, #ffe0b2", "to bottom");
      } else {
        // 晚上：深紫色渐变
        this.setGradientBackground("#f3e5f5, #e1bee7", "to bottom");
      }
    },

    /**
     * 根据用户状态设置背景
     */
    setStatusBasedBackground(status: string) {
      const statusMap: Record<string, { gradient: string; direction: string }> =
        {
          normal: { gradient: "#ffffff, #f5f5f5", direction: "to bottom" },
          vip: { gradient: "#ffd700, #ffb300", direction: "to bottom" },
          premium: { gradient: "#c0c0c0, #a0a0a0", direction: "to bottom" },
          warning: { gradient: "#ffeb3b, #ffc107", direction: "to bottom" },
          error: { gradient: "#f44336, #d32f2f", direction: "to bottom" },
          success: { gradient: "#4caf50, #388e3c", direction: "to bottom" },
        };

      const config = statusMap[status] || statusMap.normal;
      this.setGradientBackground(config.gradient, config.direction);
    },

    /**
     * 设置预设背景图片
     */
    setPresetBackgroundImage(presetType: string) {
      const presetImages: Record<string, string> = {
        nature: "/images/nav-bg/nature.jpg",
        city: "/images/nav-bg/city.jpg",
        ocean: "/images/nav-bg/ocean.jpg",
        mountain: "/images/nav-bg/mountain.jpg",
        sunset: "/images/nav-bg/sunset.jpg",
        abstract: "/images/nav-bg/abstract.jpg",
        gradient: "/images/nav-bg/gradient.jpg",
        pattern: "/images/nav-bg/pattern.jpg",
      };

      const imageUrl = presetImages[presetType];
      if (imageUrl) {
        this.setBackgroundImage(imageUrl);
      }
    },

    /**
     * 根据时间设置背景图片
     */
    setTimeBasedBackgroundImage() {
      const now = new Date();
      const hour = now.getHours();

      if (hour < 6) {
        // 深夜：星空背景
        this.setBackgroundImage("/images/nav-bg/night-sky.jpg", {
          opacity: 0.8,
          filter: "brightness(0.7)",
        });
      } else if (hour < 12) {
        // 上午：日出背景
        this.setBackgroundImage("/images/nav-bg/sunrise.jpg", {
          opacity: 0.9,
        });
      } else if (hour < 18) {
        // 下午：阳光背景
        this.setBackgroundImage("/images/nav-bg/sunny-day.jpg", {
          opacity: 0.8,
        });
      } else {
        // 晚上：日落背景
        this.setBackgroundImage("/images/nav-bg/sunset.jpg", {
          opacity: 0.9,
          filter: "saturate(1.2)",
        });
      }
    },

    /**
     * 根据季节设置背景图片
     */
    setSeasonBasedBackgroundImage() {
      const now = new Date();
      const month = now.getMonth() + 1;

      if (month >= 3 && month <= 5) {
        // 春季：樱花背景
        this.setBackgroundImage("/images/nav-bg/spring-cherry.jpg", {
          opacity: 0.8,
        });
      } else if (month >= 6 && month <= 8) {
        // 夏季：绿叶背景
        this.setBackgroundImage("/images/nav-bg/summer-green.jpg", {
          opacity: 0.8,
        });
      } else if (month >= 9 && month <= 11) {
        // 秋季：枫叶背景
        this.setBackgroundImage("/images/nav-bg/autumn-leaves.jpg", {
          opacity: 0.8,
        });
      } else {
        // 冬季：雪花背景
        this.setBackgroundImage("/images/nav-bg/winter-snow.jpg", {
          opacity: 0.8,
        });
      }
    },

    /**
     * 设置动态背景图片（随机切换）
     */
    setRandomBackgroundImage() {
      const backgroundImages = [
        "/images/nav-bg/nature.jpg",
        "/images/nav-bg/city.jpg",
        "/images/nav-bg/ocean.jpg",
        "/images/nav-bg/mountain.jpg",
        "/images/nav-bg/sunset.jpg",
        "/images/nav-bg/abstract.jpg",
      ];

      const randomIndex = Math.floor(Math.random() * backgroundImages.length);
      const randomImage = backgroundImages[randomIndex];

      this.setBackgroundImage(randomImage, {
        opacity: 0.8,
      });
    },

    /**
     * 设置背景图片滤镜效果
     */
    setBackgroundImageFilter(filterType: string) {
      const filterMap: Record<string, string> = {
        blur: "blur(5px)",
        brightness: "brightness(1.2)",
        contrast: "contrast(1.5)",
        grayscale: "grayscale(0.5)",
        sepia: "sepia(0.3)",
        saturate: "saturate(1.5)",
        hueRotate: "hue-rotate(90deg)",
        invert: "invert(0.1)",
        opacity: "opacity(0.8)",
      };

      const filter = filterMap[filterType];
      if (filter) {
        this.setData({
          backgroundImageFilter: filter,
        });
        this.updateBackgroundStyle();
      }
    },

    /**
     * 清除背景图片
     */
    clearBackgroundImage() {
      this.setData({
        backgroundImage: "",
        backgroundImageMode: "aspectFill",
        backgroundImageOpacity: 1.0,
        backgroundImageFilter: "",
        backgroundType: "color",
      });
      this.updateBackgroundStyle();
    },
  },

  /**
   * 监听属性变化
   */
  observers: {
    "backgroundColor, backgroundImage, gradientColors"() {
      this.updateBackgroundStyle();
    },
  },
});
