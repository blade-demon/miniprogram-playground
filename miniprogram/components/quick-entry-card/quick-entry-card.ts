// quick-entry-card.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    memberStatus: {
      type: String,
      value: "去解锁",
    },
    pointsStatus: {
      type: String,
      value: "待开通",
    },
    couponCount: {
      type: String,
      value: "0",
    },
    bankCardStatus: {
      type: String,
      value: "未绑定",
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
    onMemberTap() {
      this.triggerEvent("memberTap", {
        status: this.data.memberStatus,
      });
    },

    onPointsTap() {
      this.triggerEvent("pointsTap", {
        status: this.data.pointsStatus,
      });
    },

    onCouponTap() {
      this.triggerEvent("couponTap", {
        count: this.data.couponCount,
      });
    },

    onBankCardTap() {
      this.triggerEvent("bankCardTap", {
        status: this.data.bankCardStatus,
      });
    },
  },
});
