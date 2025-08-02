// feature-grid.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 功能项列表
    features: {
      type: Array,
      value: [
        {
          id: "luqianbao",
          name: "陆钱宝",
          icon: "luqianbao-icon",
          badge: "",
        },
        {
          id: "wenjianlicai",
          name: "稳健理财",
          icon: "wenjianlicai-icon",
          badge: "",
        },
        {
          id: "jijin",
          name: "基金",
          icon: "jijin-icon",
          badge: "",
        },
        {
          id: "touguguanjia",
          name: "投顾管家",
          icon: "touguguanjia-icon",
          badge: "大咖说",
        },
        {
          id: "shiwanzhuanqu",
          name: "十万专区",
          icon: "shiwanzhuanqu-icon",
          badge: "",
        },
        {
          id: "huiyuanquanyi",
          name: "会员权益",
          icon: "huiyuanquanyi-icon",
          badge: "",
        },
        {
          id: "yaohaoyou",
          name: "邀好友",
          icon: "yaohaoyou-icon",
          badge: "",
        },
        {
          id: "hongli",
          name: "红利",
          icon: "hongli-icon",
          badge: "",
        },
        {
          id: "gushouplus",
          name: "固收+",
          icon: "gushouplus-icon",
          badge: "",
        },
        {
          id: "quanbu",
          name: "全部",
          icon: "quanbu-icon",
          badge: "",
        },
      ],
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    onFeatureTap(e: any) {
      const { id } = e.currentTarget.dataset;
      this.triggerEvent("featureTap", {
        id,
        feature: this.data.features.find((item: any) => item.id === id),
      });
    },
  },
});
