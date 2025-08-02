// components/product-card/product-card.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    product: {
      type: Object,
      value: {
        id: "",
        title: "",
        description: "",
        price: 0,
        originalPrice: 0,
        image: "",
        tag: "",
      },
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
    // 点击卡片事件
    // onCardTap() {
    //   const { product } = this.properties;
    //   this.triggerEvent("cardTap", { product });

    //   // 跳转到商品详情页
    //   wx.navigateTo({
    //     url: `/pages/product-detail/product-detail?id=${product.id}`,
    //   });
    // },

    // 添加到购物车事件
    onAddToCart(e: any) {
      e.stopPropagation(); // 阻止事件冒泡
      console.log("onAddToCart", e);
      const { product } = this.properties;

      this.triggerEvent("addToCart", { product });

      // 显示添加成功提示
      wx.showToast({
        title: "已添加到购物车",
        icon: "success",
        duration: 1500,
      });
    },
  },
});
