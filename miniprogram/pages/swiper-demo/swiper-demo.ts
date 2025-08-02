// pages/swiper-demo/swiper-demo.ts
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 基础轮播数据
    basicItems: [
      {
        image:
          "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=200&fit=crop",
        title: "浅色建筑",
      },
      {
        image:
          "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=200&fit=crop",
        title: "明亮风景",
      },
      {
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop",
        title: "山水画卷",
      },
      {
        image:
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=200&fit=crop",
        title: "城市夜景",
      },
      {
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop",
        title: "建筑艺术",
      },
    ],

    // 带箭头轮播数据
    arrowItems: [
      {
        image:
          "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=250&fit=crop",
        title: "浅色建筑",
      },
      {
        image:
          "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop",
        title: "明亮风景",
      },
      {
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop",
        title: "现代都市",
      },
    ],

    // 自定义内容轮播数据
    customItems: [
      {
        title: "欢迎使用轮播组件",
        content: "这是一个功能丰富的自定义轮播组件",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      },
      {
        title: "功能强大",
        content: "支持多种自定义配置和样式",
        image:
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
      },
      {
        title: "易于使用",
        content: "简单易用的 API 设计",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      },
    ],

    // 受控制轮播数据
    controlledItems: [
      {
        image:
          "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=250&fit=crop",
        title: "控制轮播1",
      },
      {
        image:
          "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop",
        title: "控制轮播2",
      },
      {
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop",
        title: "控制轮播3",
      },
      {
        image:
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=250&fit=crop",
        title: "控制轮播4",
      },
    ],

    // 控制面板状态
    autoplay: true,
    showArrows: true,
    showDots: true,
    interval: 3000,
    duration: 400,

    // 事件日志
    eventLogs: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.addLog("页面加载完成");
  },

  /**
   * 基础轮播事件处理
   */
  onBasicSwiperChange(e: any) {
    const { index, item } = e.detail;
    this.addLog(`基础轮播切换到第${index + 1}项: ${item.title}`);
  },

  onBasicSwiperItemTap(e: any) {
    const { index, item } = e.detail;
    this.addLog(`点击基础轮播第${index + 1}项: ${item.title}`);
  },

  /**
   * 箭头轮播事件处理
   */
  onArrowSwiperChange(e: any) {
    const { index, item } = e.detail;
    this.addLog(`箭头轮播切换到第${index + 1}项: ${item.title}`);
  },

  onArrowSwiperItemTap(e: any) {
    const { index, item } = e.detail;
    this.addLog(`点击箭头轮播第${index + 1}项: ${item.title}`);
  },

  /**
   * 自定义轮播事件处理
   */
  onCustomSwiperChange(e: any) {
    const { index, item } = e.detail;
    this.addLog(`自定义轮播切换到第${index + 1}项: ${item.title}`);
  },

  onCustomSwiperItemTap(e: any) {
    const { index, item } = e.detail;
    this.addLog(`点击自定义轮播第${index + 1}项: ${item.title}`);
  },

  /**
   * 受控制轮播事件处理
   */
  onControlledSwiperChange(e: any) {
    const { index, item } = e.detail;
    this.addLog(`受控制轮播切换到第${index + 1}项: ${item.title}`);
  },

  onControlledSwiperItemTap(e: any) {
    const { index, item } = e.detail;
    this.addLog(`点击受控制轮播第${index + 1}项: ${item.title}`);
  },

  /**
   * 控制面板事件处理
   */
  onAutoplayChange(e: any) {
    this.setData({
      autoplay: e.detail.value,
    });
    this.addLog(`自动播放: ${e.detail.value ? "开启" : "关闭"}`);
  },

  onArrowsChange(e: any) {
    this.setData({
      showArrows: e.detail.value,
    });
    this.addLog(`显示箭头: ${e.detail.value ? "开启" : "关闭"}`);
  },

  onDotsChange(e: any) {
    this.setData({
      showDots: e.detail.value,
    });
    this.addLog(`显示指示器: ${e.detail.value ? "开启" : "关闭"}`);
  },

  onIntervalChange(e: any) {
    this.setData({
      interval: e.detail.value,
    });
    this.addLog(`播放间隔: ${e.detail.value}ms`);
  },

  onDurationChange(e: any) {
    this.setData({
      duration: e.detail.value,
    });
    this.addLog(`动画时长: ${e.detail.value}ms`);
  },

  /**
   * 添加日志
   */
  addLog(message: string) {
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;

    const logs = this.data.eventLogs;
    logs.unshift({
      time,
      message,
    });

    // 只保留最近10条日志
    if (logs.length > 10) {
      logs.splice(10);
    }

    this.setData({
      eventLogs: logs,
    });
  },
});
