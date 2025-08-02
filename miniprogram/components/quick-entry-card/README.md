# Quick Entry Card 快速入口卡片组件

## 组件描述

这是一个包含四个功能区域的卡片组件，用于展示用户的各种功能状态，包括会员权益、积分、卡券包和银行卡绑定状态。

## 组件结构

- `quick-entry-card.wxml` - 组件模板文件
- `quick-entry-card.scss` - 组件样式文件
- `quick-entry-card.ts` - 组件逻辑文件
- `quick-entry-card.json` - 组件配置文件

## 使用方法

### 1. 在页面配置文件中引入组件

```json
{
  "usingComponents": {
    "quick-entry-card": "/components/quick-entry-card/quick-entry-card"
  }
}
```

### 2. 在页面模板中使用组件

```xml
<quick-entry-card
  memberStatus="{{memberStatus}}"
  pointsStatus="{{pointsStatus}}"
  couponCount="{{couponCount}}"
  bankCardStatus="{{bankCardStatus}}"
  bind:memberTap="onMemberTap"
  bind:pointsTap="onPointsTap"
  bind:couponTap="onCouponTap"
  bind:bankCardTap="onBankCardTap">
</quick-entry-card>
```

### 3. 在页面逻辑中定义数据和方法

```typescript
data: {
  memberStatus: "去解锁",
  pointsStatus: "待开通",
  couponCount: "0",
  bankCardStatus: "未绑定"
},

methods: {
  onMemberTap(e: any) {
    // 处理会员权益点击事件
  },
  onPointsTap(e: any) {
    // 处理积分点击事件
  },
  onCouponTap(e: any) {
    // 处理卡券包点击事件
  },
  onBankCardTap(e: any) {
    // 处理银行卡点击事件
  }
}
```

## 属性说明

| 属性名         | 类型   | 默认值   | 说明           |
| -------------- | ------ | -------- | -------------- |
| memberStatus   | String | "去解锁" | 会员权益状态   |
| pointsStatus   | String | "待开通" | 积分状态       |
| couponCount    | String | "0"      | 卡券包数量     |
| bankCardStatus | String | "未绑定" | 银行卡绑定状态 |

## 事件说明

| 事件名      | 说明             | 回调参数         |
| ----------- | ---------------- | ---------------- |
| memberTap   | 点击会员权益区域 | {status: string} |
| pointsTap   | 点击积分区域     | {status: string} |
| couponTap   | 点击卡券包区域   | {count: string}  |
| bankCardTap | 点击银行卡区域   | {status: string} |

## 样式特点

- 响应式设计，适配不同屏幕尺寸
- 圆角卡片设计，现代化 UI 风格
- 点击反馈效果
- 阴影效果增强视觉层次
