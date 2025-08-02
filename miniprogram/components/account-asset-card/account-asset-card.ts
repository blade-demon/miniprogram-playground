// components/account-asset-card/account-asset-card.ts
import { formatNumberWithCommas } from "../../utils/util";

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 总资产
    totalAssets: {
      type: String,
      value: "0.00",
      observer: function (newVal: string) {
        this.updateDisplayValues();
      },
    },
    // 昨日收益
    yesterdayEarnings: {
      type: String,
      value: "0.00",
      observer: function (newVal: string) {
        this.updateDisplayValues();
      },
    },
    // 是否显示资产数值
    isVisible: {
      type: Boolean,
      value: true,
      observer: function (newVal: boolean) {
        this.updateDisplayValues();
      },
    },

    lufaxAsset: {
      type: Object,
      value: {
        assetList: [],
      },
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    displayTotalAssets: "0.00",
    displayYesterdayEarnings: "0.00",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击会员激活区域
    onMembershipTap() {
      this.triggerEvent("membershipTap");

      // 可以跳转到会员激活页面
      wx.navigateTo({
        url: "/pages/membership/membership",
      });
    },

    // 切换资产显示/隐藏
    onToggleVisibility() {
      const isVisible = !this.properties.isVisible;
      this.setData({
        isVisible,
        displayTotalAssets: isVisible ? this.properties.totalAssets : "****",
        displayYesterdayEarnings: isVisible
          ? this.properties.yesterdayEarnings
          : "****",
      });
      this.triggerEvent("visibilityChange", { isVisible });

      // 显示提示
      wx.showToast({
        title: isVisible ? "已显示资产" : "已隐藏资产",
        icon: "none",
        duration: 1500,
      });
    },

    // 点击金融产品
    onProductTap(e: any) {
      const product = e.currentTarget.dataset.product;
      this.triggerEvent("productTap", { product });

      // 根据产品类型跳转到不同页面
      if (product === "luqianbao") {
        wx.navigateTo({
          url: "/pages/luqianbao/luqianbao",
        });
      } else if (product === "fund") {
        wx.navigateTo({
          url: "/pages/fund/fund",
        });
      }
    },

    // 格式化数字显示（添加千分位分隔符）
    formatNumber(num: number): string {
      return formatNumberWithCommas(num, 2);
    },

    // 更新显示值
    updateDisplayValues() {
      const isVisible = this.properties.isVisible;
      this.setData({
        displayTotalAssets: isVisible ? this.properties.totalAssets : "****",
        displayYesterdayEarnings: isVisible
          ? this.properties.yesterdayEarnings
          : "****",
      });
    },

    // 更新资产数据
    updateAssets(totalAssets: number, yesterdayEarnings: number) {
      const formattedTotalAssets = this.formatNumber(totalAssets);
      const formattedYesterdayEarnings = this.formatNumber(yesterdayEarnings);

      this.setData({
        totalAssets: formattedTotalAssets,
        yesterdayEarnings: formattedYesterdayEarnings,
        displayTotalAssets: this.properties.isVisible
          ? formattedTotalAssets
          : "****",
        displayYesterdayEarnings: this.properties.isVisible
          ? formattedYesterdayEarnings
          : "****",
        lufaxAsset: {
          assetList: [],
        },
      });
    },
  },

  /**
   * 组件生命周期
   */
  lifetimes: {
    attached() {
      // 组件初始化时更新显示值
      this.updateDisplayValues();
    },
  },
});
