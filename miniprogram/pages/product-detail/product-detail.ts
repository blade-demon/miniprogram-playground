// pages/product-detail/product-detail.ts
Page({
  data: {
    product: {} as any,
    selectedSpec: "",
    quantity: 1,
    productId: "",
  },

  onLoad(options: any) {
    const { id } = options;
    if (id) {
      this.setData({ productId: id });
      this.loadProductDetail(id);
    }
  },

  // 加载商品详情
  loadProductDetail(id: string) {
    // 模拟商品详情数据
    const products = {
      "1": {
        id: "1",
        title: "iPhone 15 Pro",
        description:
          "专业级摄像头系统，钛金属设计，A17 Pro 芯片带来前所未有的性能体验",
        price: 7999,
        originalPrice: 8999,
        tag: "热销",
        images: [
          "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-naturaltitanium?wid=2560&hei=1440&fmt=p-jpg&qlt=80&.v=1692895395658",
          "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-bluetitanium?wid=2560&hei=1440&fmt=p-jpg&qlt=80&.v=1692895395678",
          "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-whitetitanium?wid=2560&hei=1440&fmt=p-jpg&qlt=80&.v=1692895395694",
        ],
        specs: [
          { id: "128gb", name: "128GB" },
          { id: "256gb", name: "256GB" },
          { id: "512gb", name: "512GB" },
          { id: "1tb", name: "1TB" },
        ],
        features: [
          "6.1 英寸超视网膜 XDR 显示屏",
          "A17 Pro 芯片，6 核中央处理器",
          "专业级摄像头系统",
          "钛金属设计，更坚固更轻盈",
          "支持 USB-C 接口",
          "防溅、抗水、防尘功能",
        ],
      },
      "2": {
        id: "2",
        title: "MacBook Pro",
        description: "M3 芯片，超强性能，专为专业用户打造的笔记本电脑",
        price: 14999,
        originalPrice: null,
        tag: "新品",
        images: [
          "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mbp14-spacegray-select-202310?wid=2560&hei=1440&fmt=p-jpg&qlt=80&.v=1697230830200",
          "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mbp14-silver-select-202310?wid=2560&hei=1440&fmt=p-jpg&qlt=80&.v=1697230830546",
        ],
        specs: [
          { id: "512gb", name: "512GB SSD" },
          { id: "1tb", name: "1TB SSD" },
          { id: "2tb", name: "2TB SSD" },
        ],
        features: [
          "14 英寸 Liquid 视网膜 XDR 显示屏",
          "M3 芯片，8 核中央处理器",
          "最长可达 22 小时电池续航",
          "1080p FaceTime 高清摄像头",
          "六扬声器音响系统",
          "3 个雷雷电 4 端口",
        ],
      },
      "3": {
        id: "3",
        title: "AirPods Pro",
        description: "主动降噪，空间音频，带来沉浸式音频体验",
        price: 1899,
        originalPrice: 1999,
        tag: null,
        images: [
          "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/MQD83?wid=2560&hei=1440&fmt=p-jpg&qlt=80&.v=1660803972361",
        ],
        specs: [{ id: "white", name: "白色" }],
        features: [
          "主动降噪功能",
          "通透模式",
          "个性化空间音频",
          "自适应均衡器",
          "IPX4 级抗汗抗水功能",
          "最长可达 6 小时聆听时间",
        ],
      },
      "4": {
        id: "4",
        title: "Apple Watch",
        description: "健康监测，智能助手，让你的生活更精彩",
        price: 2999,
        originalPrice: null,
        tag: "推荐",
        images: [
          "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/watch-s9-45mm-pink-sport-band-s9?wid=2560&hei=1440&fmt=p-jpg&qlt=80&.v=1692896038927",
        ],
        specs: [
          { id: "41mm", name: "41毫米" },
          { id: "45mm", name: "45毫米" },
        ],
        features: [
          "血氧检测",
          "心电图检测",
          "睡眠监测",
          "防水功能",
          "GPS + 蜂窝网络",
          "全天续航",
        ],
      },
    };

    const product = products[id as keyof typeof products];
    if (product) {
      this.setData({
        product,
        selectedSpec: product.specs?.[0]?.id || "",
      });
    } else {
      wx.showToast({
        title: "商品不存在",
        icon: "error",
      });
    }
  },

  // 选择规格
  onSelectSpec(e: any) {
    const { spec } = e.currentTarget.dataset;
    this.setData({ selectedSpec: spec });
  },

  // 增加数量
  onIncreaseQuantity() {
    const { quantity } = this.data;
    if (quantity < 99) {
      this.setData({ quantity: quantity + 1 });
    }
  },

  // 减少数量
  onDecreaseQuantity() {
    const { quantity } = this.data;
    if (quantity > 1) {
      this.setData({ quantity: quantity - 1 });
    }
  },

  // 添加到购物车
  onAddToCart() {
    const { product, selectedSpec, quantity } = this.data;

    console.log("添加到购物车:", {
      product,
      spec: selectedSpec,
      quantity,
    });

    wx.showToast({
      title: `已添加 ${quantity} 件到购物车`,
      icon: "success",
      duration: 2000,
    });
  },

  // 立即购买
  onBuyNow() {
    const { product, selectedSpec, quantity } = this.data;

    console.log("立即购买:", {
      product,
      spec: selectedSpec,
      quantity,
    });

    wx.showToast({
      title: "跳转到结算页面",
      icon: "none",
      duration: 1500,
    });
  },
});
