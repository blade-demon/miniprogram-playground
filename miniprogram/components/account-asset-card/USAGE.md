# updateAssets 方法使用指南

## 概述

`updateAssets` 是 `account-asset-card` 组件提供的方法，用于动态更新资产数据并自动应用千分位格式化。

## 方法签名

```typescript
updateAssets(totalAssets: number, yesterdayEarnings: number): void
```

## 参数说明

- `totalAssets`: 总资产金额（数字类型）
- `yesterdayEarnings`: 昨日收益金额（数字类型）

## 调用方式

### 方式一：通过组件实例调用（推荐）

```typescript
// 在页面中获取组件实例并调用方法
updateAssetsViaComponent(totalAssets: number, yesterdayEarnings: number) {
  // 获取组件实例
  const accountAssetCard = this.selectComponent("#accountAssetCard");

  if (accountAssetCard) {
    // 调用组件的 updateAssets 方法
    accountAssetCard.updateAssets(totalAssets, yesterdayEarnings);
    console.log("✅ 成功调用 updateAssets 方法");
  } else {
    console.log("❌ 未找到组件实例，尝试延迟调用");
    // 如果组件还没准备好，延迟调用
    setTimeout(() => {
      this.updateAssetsViaComponent(totalAssets, yesterdayEarnings);
    }, 100);
  }
}
```

### 方式二：在页面数据中定义相关属性

```typescript
// 在页面的 data 中定义资产相关数据
data: {
  totalAssets: "12345.67",
  yesterdayEarnings: "123.45",
  isVisible: true,
},
```

### 方式三：在 wxml 中为组件添加 id

```xml
<account-asset-card
  id="accountAssetCard"
  totalAssets="{{totalAssets}}"
  yesterdayEarnings="{{yesterdayEarnings}}"
  isVisible="{{isVisible}}"
  bind:membershipTap="onMembershipTap"
  bind:visibilityChange="onVisibilityChange"
  bind:productTap="onProductTap">
</account-asset-card>
```

## 完整示例

### 页面 TypeScript 文件

```typescript
Page({
  data: {
    totalAssets: "12345.67",
    yesterdayEarnings: "123.45",
    isVisible: true,
  },

  onLoad() {
    // 页面加载时模拟获取数据
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
    const accountAssetCard = this.selectComponent("#accountAssetCard");

    if (accountAssetCard) {
      accountAssetCard.updateAssets(totalAssets, yesterdayEarnings);
      console.log("✅ 成功调用 updateAssets 方法");
    } else {
      console.log("❌ 未找到组件实例，尝试延迟调用");
      setTimeout(() => {
        this.updateAssetsViaComponent(totalAssets, yesterdayEarnings);
      }, 100);
    }
  },

  // 模拟API调用更新资产
  loadAssetsFromAPI() {
    wx.showLoading({ title: "加载中..." });

    setTimeout(() => {
      const apiData = {
        totalAssets: 9876543.21, // 9,876,543.21
        yesterdayEarnings: 5432.1, // 5,432.10
      };

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

  // 测试直接调用
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
});
```

### 页面 WXML 文件

```xml
<!-- 资产卡片组件 -->
<account-asset-card
  id="accountAssetCard"
  totalAssets="{{totalAssets}}"
  yesterdayEarnings="{{yesterdayEarnings}}"
  isVisible="{{isVisible}}"
  bind:membershipTap="onMembershipTap"
  bind:visibilityChange="onVisibilityChange"
  bind:productTap="onProductTap">
</account-asset-card>

<!-- 测试按钮区域 -->
<view class="test-section">
  <view class="section-title">updateAssets 方法测试</view>
  <view class="test-buttons">
    <button class="test-btn" bindtap="loadAssetsFromAPI">模拟API调用更新资产</button>
    <button class="test-btn" bindtap="testUpdateAssets">测试直接调用</button>
  </view>
  <view class="test-info">
    <text class="info-text">点击按钮测试 updateAssets 方法调用</text>
  </view>
</view>
```

## 注意事项

1. **组件 ID**: 确保在 wxml 中为组件添加了 `id="accountAssetCard"` 属性
2. **延迟调用**: 如果组件还没准备好，使用 `setTimeout` 延迟调用
3. **数据类型**: 传入的参数应该是数字类型，组件会自动进行千分位格式化
4. **错误处理**: 建议添加错误处理逻辑，确保组件实例存在再调用方法

## 格式化效果

调用 `updateAssets` 方法后，数字会自动格式化为千分位格式：

- `1234567.89` → `1,234,567.89`
- `100000` → `100,000.00`
- `999999.99` → `999,999.99`

## 常见问题

### Q: 为什么 updateAssets 方法没有被调用？

A: 可能的原因：

1. 组件没有添加 `id` 属性
2. 组件实例还没有准备好
3. 调用时机过早，组件还未初始化

### Q: 如何确保组件实例存在？

A: 使用延迟调用机制：

```typescript
if (accountAssetCard) {
  accountAssetCard.updateAssets(totalAssets, yesterdayEarnings);
} else {
  setTimeout(() => {
    this.updateAssetsViaComponent(totalAssets, yesterdayEarnings);
  }, 100);
}
```

### Q: 数据更新后没有显示变化？

A: 检查：

1. 传入的参数是否为数字类型
2. 组件是否正确绑定了数据属性
3. 控制台是否有错误信息
