// feature-demo.ts
Page({
  data: {
    lastClicked: null,
  },

  onFeatureTap(e: any) {
    const { id, feature } = e.detail;

    this.setData({
      lastClicked: feature,
    });

    // 显示提示
    wx.showToast({
      title: `点击了${feature.name}`,
      icon: "none",
      duration: 1500,
    });

    // 根据功能ID进行不同的处理
    this.handleFeatureAction(id, feature);
  },

  handleFeatureAction(id: string, feature: any) {
    switch (id) {
      case "luqianbao":
        console.log("跳转到陆钱宝页面");
        // wx.navigateTo({ url: '/pages/luqianbao/luqianbao' });
        break;
      case "wenjianlicai":
        console.log("跳转到稳健理财页面");
        // wx.navigateTo({ url: '/pages/wenjianlicai/wenjianlicai' });
        break;
      case "jijin":
        console.log("跳转到基金页面");
        // wx.navigateTo({ url: '/pages/jijin/jijin' });
        break;
      case "touguguanjia":
        console.log("跳转到投顾管家页面");
        // wx.navigateTo({ url: '/pages/touguguanjia/touguguanjia' });
        break;
      case "shiwanzhuanqu":
        console.log("跳转到十万专区页面");
        // wx.navigateTo({ url: '/pages/shiwanzhuanqu/shiwanzhuanqu' });
        break;
      case "huiyuanquanyi":
        console.log("跳转到会员权益页面");
        // wx.navigateTo({ url: '/pages/huiyuanquanyi/huiyuanquanyi' });
        break;
      case "yaohaoyou":
        console.log("跳转到邀好友页面");
        // wx.navigateTo({ url: '/pages/yaohaoyou/yaohaoyou' });
        break;
      case "hongli":
        console.log("跳转到红利页面");
        // wx.navigateTo({ url: '/pages/hongli/hongli' });
        break;
      case "gushouplus":
        console.log("跳转到固收+页面");
        // wx.navigateTo({ url: '/pages/gushouplus/gushouplus' });
        break;
      case "quanbu":
        console.log("跳转到全部功能页面");
        // wx.navigateTo({ url: '/pages/quanbu/quanbu' });
        break;
      default:
        console.log("未知功能:", id);
    }
  },
});
