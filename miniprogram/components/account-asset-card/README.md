# Account Asset Card 组件

这是一个用于显示用户资产信息的卡片组件，包含会员激活、资产概览、金融产品和投顾服务等功能模块。

## 功能特性

- 🏦 会员激活区域（渐变背景）
- 👁️ 资产显示/隐藏切换
- 💰 总资产和昨日收益显示
- 📊 金融产品快速入口（陆钱宝、基金）
- 💼 投顾服务信息展示

## 使用方法

### 1. 在页面 JSON 中注册组件

```json
{
  "usingComponents": {
    "account-asset-card": "/components/account-asset-card/account-asset-card"
  }
}
```

### 2. 在页面 WXML 中使用组件

```xml
<account-asset-card
  totalAssets="{{totalAssets}}"
  yesterdayEarnings="{{yesterdayEarnings}}"
  isVisible="{{isVisible}}"
  bind:membershipTap="onMembershipTap"
  bind:visibilityChange="onVisibilityChange"
  bind:productTap="onProductTap"
/>
```

### 3. 在页面 TS 中处理事件

```typescript
Page({
  data: {
    totalAssets: "12345.67",
    yesterdayEarnings: "123.45",
    isVisible: true,
  },

  onMembershipTap() {
    console.log("点击了会员激活");
  },

  onVisibilityChange(e: any) {
    const { isVisible } = e.detail;
    this.setData({ isVisible });
  },

  onProductTap(e: any) {
    const { product } = e.detail;
    console.log("点击了产品:", product);
  },
});
```

## 属性说明

| 属性名            | 类型    | 默认值 | 说明             |
| ----------------- | ------- | ------ | ---------------- |
| totalAssets       | String  | "0.00" | 总资产金额       |
| yesterdayEarnings | String  | "0.00" | 昨日收益金额     |
| isVisible         | Boolean | true   | 是否显示资产数值 |

## 事件说明

| 事件名           | 说明             | 回调参数               |
| ---------------- | ---------------- | ---------------------- |
| membershipTap    | 点击会员激活区域 | 无                     |
| visibilityChange | 切换资产显示状态 | { isVisible: boolean } |
| productTap       | 点击金融产品     | { product: string }    |

## 样式定制

组件使用了现代化的设计风格：

- 圆角卡片设计
- 渐变背景
- 阴影效果
- 响应式交互

可以通过修改 `account-asset-card.scss` 文件来自定义样式。

## 注意事项

1. 组件会自动处理数字格式化，保留两位小数
2. 资产隐藏时会显示模糊效果
3. 点击产品会自动跳转到对应页面（需要确保页面存在）
4. 所有金额建议传入字符串格式，避免精度问题
