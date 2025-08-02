// pages/account/account.ts
import { TitleHelper } from "../../utils/title-helper";
import { NavigationHelper } from "../../utils/navigation-helper";
import { BackgroundImageHelper } from "../../utils/background-image-helper";
import { testNumberFormatting } from "../../utils/util";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    totalAssets: "12345.67",
    yesterdayEarnings: "123.45",
    isVisible: true,
    // 导航栏相关数据
    navBarHeight: 0,
    navTitleColor: "#000000",
    navBackgroundColor: "#ffffff",
    navBackgroundImage: "",
    navGradientColors: "",
    navGradientDirection: "to bottom",
    navRightButtons: [
      {
        icon: "/images/icons/settings.png",
        name: "设置",
      },
      {
        icon: "/images/icons/message.png",
        name: "消息",
      },
      {
        icon: "/images/icons/theme.png",
        name: "主题",
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    // 初始化导航栏
    this.initNavigationBar();

    // 动态设置页面标题
    this.setDynamicTitle();

    // 模拟获取用户资产数据
    this.loadUserAssets();

    // 测试数字格式化功能
    testNumberFormatting();
  },

  /**
   * 初始化导航栏
   */
  initNavigationBar() {
    const systemInfo = wx.getSystemInfoSync();
    const statusBarHeight = systemInfo.statusBarHeight;
    const navBarHeight = statusBarHeight + 44;

    this.setData({
      navBarHeight,
    });

    // 设置动态导航栏背景
    this.setDynamicNavigationBar();
  },

  /**
   * 设置动态导航栏背景
   */
  setDynamicNavigationBar() {
    // 方法1：根据时间设置背景
    this.setTimeBasedNavigationBar();

    // 方法2：根据用户状态设置背景
    // this.setStatusBasedNavigationBar('vip');

    // 方法3：设置渐变背景
    // this.setGradientNavigationBar('blue');

    // 方法4：设置背景图片
    // this.setBackgroundImageNavigationBar();

    // 方法5：根据时间设置背景图片
    // this.setTimeBasedBackgroundImage();

    // 方法6：根据季节设置背景图片
    // this.setSeasonBasedBackgroundImage();
  },

  /**
   * 根据时间设置导航栏背景
   */
  setTimeBasedNavigationBar() {
    const now = new Date();
    const hour = now.getHours();

    if (hour < 6) {
      // 深夜：深蓝色渐变
      this.setData({
        navGradientColors: "#1a1a2e, #16213e",
        navGradientDirection: "to bottom",
        navTitleColor: "#ffffff",
      });
    } else if (hour < 12) {
      // 上午：浅蓝色渐变
      this.setData({
        navGradientColors: "#e3f2fd, #bbdefb",
        navGradientDirection: "to bottom",
        navTitleColor: "#1976d2",
      });
    } else if (hour < 18) {
      // 下午：橙色渐变
      this.setData({
        navGradientColors: "#fff3e0, #ffe0b2",
        navGradientDirection: "to bottom",
        navTitleColor: "#f57c00",
      });
    } else {
      // 晚上：深紫色渐变
      this.setData({
        navGradientColors: "#f3e5f5, #e1bee7",
        navGradientDirection: "to bottom",
        navTitleColor: "#7b1fa2",
      });
    }
  },

  /**
   * 根据用户状态设置导航栏背景
   */
  setStatusBasedNavigationBar(status: string) {
    const statusMap: Record<string, { gradient: string; titleColor: string }> =
      {
        normal: { gradient: "#ffffff, #f5f5f5", titleColor: "#000000" },
        vip: { gradient: "#ffd700, #ffb300", titleColor: "#000000" },
        premium: { gradient: "#c0c0c0, #a0a0a0", titleColor: "#000000" },
        warning: { gradient: "#ffeb3b, #ffc107", titleColor: "#000000" },
        error: { gradient: "#f44336, #d32f2f", titleColor: "#ffffff" },
        success: { gradient: "#4caf50, #388e3c", titleColor: "#ffffff" },
      };

    const config = statusMap[status] || statusMap.normal;
    this.setData({
      navGradientColors: config.gradient,
      navTitleColor: config.titleColor,
    });
  },

  /**
   * 设置渐变导航栏背景
   */
  setGradientNavigationBar(type: string) {
    const gradientMap: Record<
      string,
      { gradient: string; titleColor: string }
    > = {
      blue: { gradient: "#2196f3, #1976d2", titleColor: "#ffffff" },
      purple: { gradient: "#9c27b0, #7b1fa2", titleColor: "#ffffff" },
      green: { gradient: "#4caf50, #388e3c", titleColor: "#ffffff" },
      orange: { gradient: "#ff9800, #f57c00", titleColor: "#ffffff" },
      red: { gradient: "#f44336, #d32f2f", titleColor: "#ffffff" },
    };

    const config = gradientMap[type] || gradientMap.blue;
    this.setData({
      navGradientColors: config.gradient,
      navTitleColor: config.titleColor,
    });
  },

  /**
   * 设置背景图片导航栏
   */
  setBackgroundImageNavigationBar() {
    this.setData({
      navBackgroundImage: "/images/nav-bg.jpg",
      navTitleColor: "#ffffff",
      navBackgroundType: "image",
    });
  },

  /**
   * 根据时间设置背景图片
   */
  setTimeBasedBackgroundImage() {
    const timeBasedImage = BackgroundImageHelper.getTimeBasedImage();
    this.setData({
      navBackgroundImage: timeBasedImage.url,
      navTitleColor: "#ffffff",
      navBackgroundType: "image",
      navBackgroundImageOpacity: 0.8,
    });
  },

  /**
   * 根据季节设置背景图片
   */
  setSeasonBasedBackgroundImage() {
    const seasonBasedImage = BackgroundImageHelper.getSeasonBasedImage();
    this.setData({
      navBackgroundImage: seasonBasedImage.url,
      navTitleColor: "#ffffff",
      navBackgroundType: "image",
      navBackgroundImageOpacity: 0.8,
    });
  },

  /**
   * 设置预设背景图片
   */
  setPresetBackgroundImage(presetType: string) {
    const imageConfig = BackgroundImageHelper.getImageConfig(presetType);
    if (imageConfig) {
      this.setData({
        navBackgroundImage: imageConfig.url,
        navTitleColor: "#ffffff",
        navBackgroundType: "image",
        navBackgroundImageOpacity: 0.8,
      });
    }
  },

  /**
   * 设置随机背景图片
   */
  setRandomBackgroundImage() {
    const randomImage = BackgroundImageHelper.getRandomImage();
    this.setData({
      navBackgroundImage: randomImage.url,
      navTitleColor: "#ffffff",
      navBackgroundType: "image",
      navBackgroundImageOpacity: 0.8,
    });
  },

  /**
   * 设置背景图片滤镜
   */
  setBackgroundImageFilter(filterType: string) {
    const filterConfig = BackgroundImageHelper.getFilterConfig(filterType);
    if (filterConfig) {
      this.setData({
        navBackgroundImageFilter: filterConfig.value,
      });
    }
  },

  /**
   * 动态设置页面标题
   */
  setDynamicTitle() {
    // 方法1：使用工具类设置基础标题
    TitleHelper.setTitle("我的账户 - 动态标题");

    // 方法2：设置个性化标题（根据用户信息）
    // TitleHelper.setPersonalizedTitle('账户');

    // 方法3：设置问候语标题（根据时间）
    // TitleHelper.setGreetingTitle('我的账户');

    // 方法4：设置带数据的标题（显示总资产）
    // TitleHelper.setDataTitle('我的账户', this.data.totalAssets, '总资产');

    // 方法5：设置带状态的标题
    // TitleHelper.setStatusTitle('我的账户', '正常', '#07c160');

    // 方法6：设置带计数的标题（如消息数量）
    // TitleHelper.setCountTitle('我的账户', 5);

    // 方法7：设置多语言标题
    // TitleHelper.setMultiLanguageTitle('我的账户', 'zh');
  },

  /**
   * 加载用户资产数据
   */
  loadUserAssets() {
    // 这里可以调用API获取真实的用户资产数据
    // 示例数据 - 使用大数字测试千分位格式化
    const mockData = {
      totalAssets: 1234567.89, // 应该显示为 1,234,567.89
      yesterdayEarnings: 12345.67, // 应该显示为 12,345.67
    };

    // 方式一：通过 setData 更新属性（传统方式）
    this.setData({
      totalAssets: mockData.totalAssets.toFixed(2),
      yesterdayEarnings: mockData.yesterdayEarnings.toFixed(2),
    });

    // 方式二：通过组件实例调用 updateAssets 方法（推荐方式）
    this.updateAssetsViaComponent(
      mockData.totalAssets,
      mockData.yesterdayEarnings
    );

    // 数据加载完成后，更新标题显示总资产
    TitleHelper.setDataTitle("我的账户", mockData.totalAssets, "总资产");
  },

  /**
   * 通过组件实例调用 updateAssets 方法
   */
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

  /**
   * 模拟从API获取资产数据并更新
   */
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

  /**
   * 测试直接调用 updateAssets 方法
   */
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

  /**
   * 测试千分位格式化功能
   */
  testNumberFormatting() {
    const testNumbers = [
      100000, // 应该显示为 100,000.00
      1234567.89, // 应该显示为 1,234,567.89
      999999.99, // 应该显示为 999,999.99
      1000, // 应该显示为 1,000.00
      123.45, // 应该显示为 123.45
    ];

    console.log("千分位格式化测试:");
    testNumbers.forEach((num) => {
      console.log(
        `${num} -> ${num.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`
      );
    });
  },

  /**
   * 点击会员激活
   */
  onMembershipTap() {
    console.log("用户点击了会员激活");
    wx.showToast({
      title: "跳转到会员页面",
      icon: "none",
    });
  },

  /**
   * 切换资产显示状态
   */
  onVisibilityChange(e: any) {
    const { isVisible } = e.detail;
    this.setData({ isVisible });
    console.log("资产显示状态:", isVisible ? "显示" : "隐藏");
  },

  /**
   * 点击金融产品
   */
  onProductTap(e: any) {
    const { product } = e.detail;
    console.log("用户点击了产品:", product);

    // 根据产品类型显示不同提示
    let message = "";
    switch (product) {
      case "luqianbao":
        message = "跳转到陆钱宝页面";
        break;
      case "fund":
        message = "跳转到基金页面";
        break;
      default:
        message = "跳转到产品页面";
    }

    wx.showToast({
      title: message,
      icon: "none",
    });
  },

  /**
   * 导航栏右侧按钮点击事件
   */
  onNavRightButtonTap(e: any) {
    const { index } = e.detail;
    const button = this.data.navRightButtons[index];

    console.log("点击了导航栏按钮:", button.name);

    switch (index) {
      case 0: // 设置
        wx.showToast({
          title: "跳转到设置页面",
          icon: "none",
        });
        break;
      case 1: // 消息
        wx.showToast({
          title: "跳转到消息页面",
          icon: "none",
        });
        break;
      case 2: // 主题
        this.showThemeSelector();
        break;
    }
  },

  /**
   * 显示主题选择器
   */
  showThemeSelector() {
    wx.showActionSheet({
      itemList: [
        "时间背景图",
        "季节背景图",
        "自然风景",
        "城市夜景",
        "海洋风光",
        "随机背景图",
        "清除背景图",
      ],
      success: (res) => {
        switch (res.tapIndex) {
          case 0:
            this.setTimeBasedBackgroundImage();
            break;
          case 1:
            this.setSeasonBasedBackgroundImage();
            break;
          case 2:
            this.setPresetBackgroundImage("nature");
            break;
          case 3:
            this.setPresetBackgroundImage("city");
            break;
          case 4:
            this.setPresetBackgroundImage("ocean");
            break;
          case 5:
            this.setRandomBackgroundImage();
            break;
          case 6:
            this.clearBackgroundImage();
            break;
        }
      },
    });
  },

  /**
   * 清除背景图片
   */
  clearBackgroundImage() {
    this.setData({
      navBackgroundImage: "",
      navBackgroundType: "color",
      navBackgroundImageOpacity: 1.0,
      navBackgroundImageFilter: "",
    });
  },
});
