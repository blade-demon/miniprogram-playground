// index.ts
import { NavigationHelper } from "../../utils/navigation-helper";

// 获取应用实例
const app = getApp<IAppOption>();

Page({
  data: {
    motto: "Hello World",
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse("button.open-type.getUserInfo"),
    canIUseGetUserProfile: false,
    canIUseOpenData:
      wx.canIUse("open-data.type.userAvatarUrl") &&
      wx.canIUse("open-data.type.userNickName"),
    navBackgroundImage: "",
    navTitleColor: "#ffffff",
    navBackgroundColor: "#000000",
    // 添加资产相关数据
    totalAssets: "12345.67",
    yesterdayEarnings: "123.45",
    isVisible: true,

    // 首页轮播图数据
    homeSwiperItems: [
      {
        image:
          "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=180&fit=crop",
        title: "新用户专享",
        url: "/pages/promotion/promotion",
      },
      {
        image:
          "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=180&fit=crop",
        title: "限时优惠",
        url: "/pages/promotion/promotion",
      },
      {
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=180&fit=crop",
        title: "热门活动",
        url: "/pages/activity/activity",
      },
      {
        image:
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=180&fit=crop",
        title: "投资理财",
        url: "/pages/investment/investment",
      },
      {
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=180&fit=crop",
        title: "会员专享",
        url: "/pages/member/member",
      },
    ],
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: "../logs/logs",
    });
  },
  onLoad() {
    console.log("页面加载");

    // 设置导航栏背景图片示例
    this.setNavigationBarBackgroundImage();

    if (wx.canIUse("getUserProfile")) {
      this.setData({
        canIUseGetUserProfile: true,
      });
    }

    // 模拟加载资产数据
    this.loadAssetsData();
  },

  // 加载资产数据
  loadAssetsData() {
    // 模拟从API获取数据
    setTimeout(() => {
      const mockData = {
        totalAssets: 1234567.89, // 应该显示为 1,234,567.89
        yesterdayEarnings: 12345.67, // 应该显示为 12,345.67
      };

      // 更新页面数据
      this.setData({
        totalAssets: mockData.totalAssets.toFixed(2),
        yesterdayEarnings: mockData.yesterdayEarnings.toFixed(2),
      });

      // 通过组件实例调用 updateAssets 方法
      this.updateAssetsViaComponent(
        mockData.totalAssets,
        mockData.yesterdayEarnings
      );
    }, 1000);
  },

  // 通过组件实例调用 updateAssets 方法
  updateAssetsViaComponent(totalAssets: number, yesterdayEarnings: number) {
    // 获取组件实例
    const accountAssetCard = this.selectComponent("#accountAssetCard");

    if (accountAssetCard) {
      // 调用组件的 updateAssets 方法
      accountAssetCard.updateAssets(totalAssets, yesterdayEarnings);
      console.log("✅ 通过组件实例成功调用 updateAssets 方法");
    } else {
      console.log("❌ 未找到 account-asset-card 组件实例，尝试延迟调用");
      // 如果组件还没准备好，延迟调用
      setTimeout(() => {
        this.updateAssetsViaComponent(totalAssets, yesterdayEarnings);
      }, 100);
    }
  },

  // 模拟从API获取资产数据并更新
  loadAssetsFromAPI() {
    // 模拟API调用
    wx.showLoading({ title: "加载中..." });

    // 模拟网络请求延迟
    setTimeout(() => {
      // 模拟API返回的数据
      const apiData = {
        totalAssets: 9876543.21, // 9,876,543.21
        yesterdayEarnings: 5432.1, // 5,432.10
      };

      // 调用组件方法更新数据
      this.updateAssetsViaComponent(
        apiData.totalAssets,
        apiData.yesterdayEarnings
      );

      wx.hideLoading();
      wx.showToast({
        title: "数据更新成功",
        icon: "success",
        duration: 1500,
      });
    }, 2000);
  },

  // 测试直接调用 updateAssets 方法
  testUpdateAssets() {
    const testData = {
      totalAssets: 5555555.55, // 5,555,555.55
      yesterdayEarnings: 7777.77, // 7,777.77
    };

    this.updateAssetsViaComponent(
      testData.totalAssets,
      testData.yesterdayEarnings
    );

    wx.showToast({
      title: "测试数据已更新",
      icon: "success",
      duration: 1500,
    });
  },

  // 处理会员点击事件
  onMembershipTap() {
    console.log("点击了会员激活");
    wx.showToast({
      title: "跳转到会员页面",
      icon: "none",
      duration: 1500,
    });
  },

  // 处理资产显示状态变化
  onVisibilityChange(e: any) {
    const { isVisible } = e.detail;
    this.setData({ isVisible });
    console.log("资产显示状态:", isVisible ? "显示" : "隐藏");
  },

  // 处理产品点击事件
  onProductTap(e: any) {
    const { product } = e.detail;
    console.log("点击了产品:", product);

    wx.showToast({
      title: `跳转到${product}页面`,
      icon: "none",
      duration: 1500,
    });
  },

  // 设置导航栏背景图片
  setNavigationBarBackgroundImage() {
    // 示例：根据时间设置不同的背景图片
    const hour = new Date().getHours();
    let imageUrl = "";

    if (hour < 6) {
      // 深夜：深色背景图片
      imageUrl =
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop";
    } else if (hour < 12) {
      // 上午：明亮背景图片
      imageUrl =
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop";
    } else if (hour < 18) {
      // 下午：温暖背景图片
      imageUrl =
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop";
    } else {
      // 晚上：夜景背景图片
      imageUrl =
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop";
    }

    // 使用带加载状态的背景图片设置
    NavigationHelper.setNavigationBarBackgroundImageWithLoading(
      imageUrl,
      "#ffffff",
      "#1976d2",
      true
    )
      .then(() => {
        console.log("导航栏背景图片设置成功");
        this.setData({
          navBackgroundImage: imageUrl,
          navTitleColor: "#ffffff",
          navBackgroundColor: "#1976d2",
        });
      })
      .catch((error) => {
        console.error("导航栏背景图片设置失败:", error);
        // 使用默认背景色
        NavigationHelper.setNavigationBarColor("#ffffff", "#000000");
      });
  },

  // 切换背景图片
  switchBackgroundImage() {
    const images = [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=200&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop",
    ];

    const randomImage = images[Math.floor(Math.random() * images.length)];

    NavigationHelper.setNavigationBarBackgroundImage(
      randomImage,
      "#ffffff",
      "#1976d2"
    );

    this.setData({
      navBackgroundImage: randomImage,
    });
  },

  // 清除背景图片
  clearBackgroundImage() {
    NavigationHelper.clearNavigationBarBackgroundImage("#ffffff", "#000000");

    this.setData({
      navBackgroundImage: "",
      navTitleColor: "#000000",
      navBackgroundColor: "#ffffff",
    });
  },

  // 跳转到完整测试页面
  goToNavTestPage() {
    wx.navigateTo({
      url: "../nav-test/nav-test",
    });
  },

  // 跳转到轮播组件演示页面
  goToSwiperDemo() {
    wx.navigateTo({
      url: "../swiper-demo/swiper-demo",
    });
  },

  // 首页轮播图事件处理
  onHomeSwiperChange(e: any) {
    const { index, item } = e.detail;
    console.log("首页轮播切换到:", index, item.title);
  },

  onHomeSwiperItemTap(e: any) {
    const { index, item } = e.detail;
    console.log("点击首页轮播项:", index, item.title);

    // 如果有跳转链接，则进行页面跳转
    if (item.url) {
      wx.navigateTo({
        url: item.url,
        fail: () => {
          wx.showToast({
            title: "页面开发中",
            icon: "none",
          });
        },
      });
    }
  },

  getUserProfile() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: "展示用户信息", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res);
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        });
      },
    });
  },
  getUserInfo(e: any) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e);
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    });
  },

  // 处理功能网格点击事件
  onFeatureTap(e: any) {
    const { id, feature } = e.detail;

    console.log("点击了功能:", id, feature.name);

    // 显示提示
    wx.showToast({
      title: `点击了${feature.name}`,
      icon: "none",
      duration: 1500,
    });

    // 根据功能ID进行不同的处理
    this.handleFeatureAction(id, feature);
  },

  // 处理功能动作
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
