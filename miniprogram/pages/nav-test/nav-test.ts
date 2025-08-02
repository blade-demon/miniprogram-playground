// pages/nav-test/nav-test.ts
Page({
  data: {
    isFixed: true,
    isShow: true,
    enableScroll: true,
    showCustomContent: false,
    transparentBg: "rgba(0,0,0,0)",
    opaqueBg: "#fdacfa",
    pageScrollTop: 0,
    demoItems: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  },

  onLoad() {
    console.log("导航栏测试页面加载");
  },

  // 页面滚动事件
  onPageScroll(e: any) {
    if (this.data.enableScroll) {
      this.setData({
        pageScrollTop: e.scrollTop,
      });
    }
  },

  // 切换固定状态
  toggleFixed() {
    this.setData({
      isFixed: !this.data.isFixed,
    });
    wx.showToast({
      title: this.data.isFixed ? "已设为固定" : "已取消固定",
      icon: "success",
    });
  },

  // 切换显示状态
  toggleShow() {
    this.setData({
      isShow: !this.data.isShow,
    });
    wx.showToast({
      title: this.data.isShow ? "导航栏已显示" : "导航栏已隐藏",
      icon: "success",
    });
  },

  // 切换滚动监听
  toggleScroll() {
    this.setData({
      enableScroll: !this.data.enableScroll,
    });
    wx.showToast({
      title: this.data.enableScroll ? "已开启滚动监听" : "已关闭滚动监听",
      icon: "success",
    });
  },

  // 切换自定义内容
  toggleCustom() {
    this.setData({
      showCustomContent: !this.data.showCustomContent,
    });
    wx.showToast({
      title: this.data.showCustomContent ? "已显示搜索框" : "已隐藏搜索框",
      icon: "success",
    });
  },

  // 设置透明背景色
  setTransparentBg(e: any) {
    const color = e.currentTarget.dataset.color;
    this.setData({
      transparentBg: color,
    });
    wx.showToast({
      title: "已设置透明背景",
      icon: "success",
    });
  },

  // 设置不透明背景色
  setOpaqueBg(e: any) {
    const color = e.currentTarget.dataset.color;
    this.setData({
      opaqueBg: color,
    });
    wx.showToast({
      title: "已设置不透明背景",
      icon: "success",
    });
  },

  // 返回按钮事件
  onBack(e: any) {
    console.log("返回按钮被点击", e.detail);
    wx.navigateBack();
  },

  // 搜索输入事件
  onSearchInput(e: any) {
    console.log("搜索输入:", e.detail.value);
  },

  // 搜索确认事件
  onSearchConfirm(e: any) {
    console.log("搜索确认:", e.detail.value);
    wx.showToast({
      title: `搜索: ${e.detail.value}`,
      icon: "none",
    });
  },
});
