# Navigation Bar 使用示例

## 示例 1：基础固定导航栏

```xml
<!-- 页面模板 -->
<navigation-bar
  title="我的页面"
  fixed="{{true}}"
  background="#007AFF"
  color="#ffffff"
/>
```

```typescript
// 页面逻辑
Page({
  data: {},
  onBack(e: any) {
    wx.navigateBack();
  },
});
```

## 示例 2：滚动监听导航栏

```xml
<!-- 页面模板 -->
<navigation-bar
  title="商品列表"
  fixed="{{true}}"
  enableScroll="{{true}}"
  transparentBackground="rgba(0,0,0,0)"
  opaqueBackground="#fdacfa"
  pageScrollTop="{{pageScrollTop}}"
/>
```

```typescript
// 页面逻辑
Page({
  data: {
    pageScrollTop: 0,
  },

  // 页面滚动事件（必需）
  onPageScroll(e: any) {
    this.setData({
      pageScrollTop: e.scrollTop,
    });
  },

  onBack(e: any) {
    wx.navigateBack();
  },
});
```

## 示例 3：搜索导航栏

```xml
<!-- 页面模板 -->
<navigation-bar
  fixed="{{true}}"
  enableScroll="{{true}}"
  transparentBackground="rgba(0,0,0,0)"
  opaqueBackground="#ffffff"
  showCustomContent="{{true}}"
  pageScrollTop="{{pageScrollTop}}"
>
  <view slot="center" class="search-container">
    <input
      class="search-input"
      placeholder="搜索商品..."
      bindinput="onSearchInput"
      bindconfirm="onSearchConfirm"
    />
  </view>
</navigation-bar>
```

```typescript
// 页面逻辑
Page({
  data: {
    searchKeyword: "",
    pageScrollTop: 0,
  },

  // 页面滚动事件（必需）
  onPageScroll(e: any) {
    this.setData({
      pageScrollTop: e.scrollTop,
    });
  },

  onSearchInput(e: any) {
    this.setData({
      searchKeyword: e.detail.value,
    });
    // 执行搜索逻辑
    this.performSearch(e.detail.value);
  },

  onSearchConfirm(e: any) {
    console.log("搜索确认:", e.detail.value);
    // 执行搜索
    this.performSearch(e.detail.value);
  },

  performSearch(keyword: string) {
    // 实现搜索逻辑
    console.log("搜索关键词:", keyword);
  },
});
```

```scss
/* 搜索框样式 */
.search-container {
  width: 100%;
  padding: 0 20px;
}

.search-input {
  width: 100%;
  height: 32px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  padding: 0 12px;
  font-size: 14px;
  border: none;
  color: #333;
}
```

## 示例 4：按钮组导航栏

```xml
<!-- 页面模板 -->
<navigation-bar
  fixed="{{true}}"
  enableScroll="{{true}}"
  showCustomContent="{{true}}"
  pageScrollTop="{{pageScrollTop}}"
>
  <view slot="center" class="button-group">
    <button
      class="nav-btn {{activeTab === 'all' ? 'active' : ''}}"
      bindtap="switchTab"
      data-tab="all"
    >
      全部
    </button>
    <button
      class="nav-btn {{activeTab === 'category' ? 'active' : ''}}"
      bindtap="switchTab"
      data-tab="category"
    >
      分类
    </button>
    <button
      class="nav-btn {{activeTab === 'filter' ? 'active' : ''}}"
      bindtap="switchTab"
      data-tab="filter"
    >
      筛选
    </button>
  </view>
</navigation-bar>
```

```typescript
// 页面逻辑
Page({
  data: {
    activeTab: "all",
    pageScrollTop: 0,
  },

  // 页面滚动事件（必需）
  onPageScroll(e: any) {
    this.setData({
      pageScrollTop: e.scrollTop,
    });
  },

  switchTab(e: any) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({
      activeTab: tab,
    });

    // 根据tab执行相应逻辑
    this.handleTabChange(tab);
  },

  handleTabChange(tab: string) {
    switch (tab) {
      case "all":
        this.loadAllItems();
        break;
      case "category":
        this.loadCategoryItems();
        break;
      case "filter":
        this.showFilterModal();
        break;
    }
  },
});
```

```scss
/* 按钮组样式 */
.button-group {
  display: flex;
  gap: 10px;
  padding: 0 20px;
}

.nav-btn {
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 12px;
  background: rgba(255, 255, 255, 0.8);
  border: none;
  color: #666;
  min-width: 50px;
}

.nav-btn.active {
  background: #007aff;
  color: #fff;
}
```

## 示例 5：动态控制导航栏

```xml
<!-- 页面模板 -->
<navigation-bar
  title="{{navTitle}}"
  fixed="{{isFixed}}"
  show="{{isShow}}"
  enableScroll="{{enableScroll}}"
  showCustomContent="{{showCustomContent}}"
  transparentBackground="{{transparentBg}}"
  opaqueBackground="{{opaqueBg}}"
  pageScrollTop="{{pageScrollTop}}"
  bind:back="onBack"
>
  <view slot="center" wx:if="{{showCustomContent}}" class="search-container">
    <input
      class="search-input"
      placeholder="{{searchPlaceholder}}"
      bindinput="onSearchInput"
    />
  </view>
</navigation-bar>

<!-- 控制按钮 -->
<view class="control-buttons">
  <button bindtap="toggleFixed">切换固定</button>
  <button bindtap="toggleScroll">切换滚动监听</button>
  <button bindtap="toggleCustom">切换自定义内容</button>
  <button bindtap="changeTheme">切换主题</button>
</view>
```

```typescript
// 页面逻辑
Page({
  data: {
    navTitle: "动态导航栏",
    isFixed: true,
    isShow: true,
    enableScroll: true,
    showCustomContent: false,
    transparentBg: "rgba(0,0,0,0)",
    opaqueBg: "#fdacfa",
    searchPlaceholder: "搜索...",
    currentTheme: "default",
    pageScrollTop: 0,
  },

  // 页面滚动事件（必需）
  onPageScroll(e: any) {
    if (this.data.enableScroll) {
      this.setData({
        pageScrollTop: e.scrollTop,
      });
    }
  },

  toggleFixed() {
    this.setData({
      isFixed: !this.data.isFixed,
    });
  },

  toggleScroll() {
    this.setData({
      enableScroll: !this.data.enableScroll,
    });
  },

  toggleCustom() {
    this.setData({
      showCustomContent: !this.data.showCustomContent,
    });
  },

  changeTheme() {
    const themes = [
      { transparent: "rgba(0,0,0,0)", opaque: "#fdacfa" },
      { transparent: "rgba(255,255,255,0)", opaque: "#007AFF" },
      { transparent: "rgba(0,0,0,0)", opaque: "#ffffff" },
    ];

    const nextTheme = (this.data.currentTheme + 1) % themes.length;
    const theme = themes[nextTheme];

    this.setData({
      transparentBg: theme.transparent,
      opaqueBg: theme.opaque,
      currentTheme: nextTheme,
    });
  },

  onSearchInput(e: any) {
    console.log("搜索输入:", e.detail.value);
  },

  onBack(e: any) {
    wx.navigateBack();
  },
});
```

## 示例 6：长列表页面

```xml
<!-- 页面模板 -->
<navigation-bar
  title="商品列表"
  fixed="{{true}}"
  enableScroll="{{true}}"
  transparentBackground="rgba(0,0,0,0)"
  opaqueBackground="#ffffff"
  color="#333333"
  pageScrollTop="{{pageScrollTop}}"
/>

<!-- 商品列表 -->
<view class="product-list">
  <view class="product-item" wx:for="{{products}}" wx:key="id">
    <image class="product-image" src="{{item.image}}" />
    <view class="product-info">
      <text class="product-name">{{item.name}}</text>
      <text class="product-price">¥{{item.price}}</text>
    </view>
  </view>
</view>
```

```typescript
// 页面逻辑
Page({
  data: {
    products: [],
    pageScrollTop: 0,
  },

  onLoad() {
    this.loadProducts();
  },

  // 页面滚动事件（必需）
  onPageScroll(e: any) {
    this.setData({
      pageScrollTop: e.scrollTop,
    });
  },

  loadProducts() {
    // 模拟加载商品数据
    const products = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `商品${i + 1}`,
      price: Math.floor(Math.random() * 1000) + 100,
      image: `https://picsum.photos/200/200?random=${i}`,
    }));

    this.setData({ products });
  },
});
```

```scss
/* 长列表样式 */
.product-list {
  padding: 120px 20px 20px;
}

.product-item {
  display: flex;
  padding: 15px;
  margin-bottom: 15px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  margin-right: 15px;
}

.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-name {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.product-price {
  font-size: 18px;
  color: #ff6b6b;
  font-weight: bold;
}
```

## 重要提醒

### 滚动监听使用要点

1. **必须在页面中实现 `onPageScroll` 事件**
2. **将滚动位置通过 `pageScrollTop` 属性传递给组件**
3. **这是微信小程序组件限制的解决方案**

### 完整的使用流程

```typescript
Page({
  data: {
    pageScrollTop: 0,
    enableScroll: true,
  },

  // 页面滚动事件（必需）
  onPageScroll(e: any) {
    if (this.data.enableScroll) {
      this.setData({
        pageScrollTop: e.scrollTop,
      });
    }
  },
});
```

## 最佳实践建议

1. **选择合适的背景色**

   - 透明背景：`rgba(0,0,0,0)` 或 `rgba(255,255,255,0)`
   - 不透明背景：根据页面主题选择

2. **自定义内容设计**

   - 搜索框使用半透明背景
   - 按钮组使用合适的间距
   - 确保在不同背景下都有良好的可读性

3. **性能优化**

   - 只在需要的页面启用滚动监听
   - 避免频繁切换导航栏状态

4. **用户体验**
   - 提供清晰的状态反馈
   - 保持导航栏的响应性
   - 考虑不同设备的适配
