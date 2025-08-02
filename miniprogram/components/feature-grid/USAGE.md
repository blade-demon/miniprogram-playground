# Feature Grid 组件快速使用指南

## 快速开始

### 1. 引入组件

在页面的 `.json` 文件中添加：

```json
{
  "usingComponents": {
    "feature-grid": "/components/feature-grid/feature-grid"
  }
}
```

### 2. 在页面中使用

在页面的 `.wxml` 文件中添加：

```xml
<feature-grid bind:featureTap="onFeatureTap" />
```

### 3. 处理点击事件

在页面的 `.ts` 文件中添加：

```typescript
Page({
  onFeatureTap(e: any) {
    const { id, feature } = e.detail;
    console.log("点击了功能:", id, feature.name);

    // 根据id进行不同的处理
    switch (id) {
      case "luqianbao":
        // 处理陆钱宝
        break;
      case "wenjianlicai":
        // 处理稳健理财
        break;
      // ... 其他功能
    }
  },
});
```

## 功能列表

组件默认包含以下 10 个功能：

| 序号 | 功能名称 | 功能 ID       | 说明                     |
| ---- | -------- | ------------- | ------------------------ |
| 1    | 陆钱宝   | luqianbao     | 圆形图标，中心有菱形     |
| 2    | 稳健理财 | wenjianlicai  | 六边形图标，内有三角形   |
| 3    | 基金     | jijin         | 波浪线图标               |
| 4    | 投顾管家 | touguguanjia  | 人形图标，带"大咖说"徽章 |
| 5    | 十万专区 | shiwanzhuanqu | 数字"10"图标             |
| 6    | 会员权益 | huiyuanquanyi | 倒三角图标，内有"V"      |
| 7    | 邀好友   | yaohaoyou     | 圆形人形图标             |
| 8    | 红利     | hongli        | 货币符号图标             |
| 9    | 固收+    | gushouplus    | 六边形图标，内有"+"      |
| 10   | 全部     | quanbu        | 三个点图标               |

## 自定义功能列表

如果需要自定义功能列表，可以传入 `features` 属性：

```xml
<feature-grid
  features="{{customFeatures}}"
  bind:featureTap="onFeatureTap"
/>
```

```typescript
Page({
  data: {
    customFeatures: [
      {
        id: "custom1",
        name: "自定义功能1",
        icon: "custom-icon-1",
        badge: "新功能",
      },
      // ... 更多功能
    ],
  },
});
```

## 样式定制

组件使用 CSS Grid 布局，主要样式类：

- `.feature-grid`: 网格容器
- `.feature-item`: 单个功能项
- `.feature-icon`: 图标容器
- `.feature-badge`: 徽章样式
- `.feature-name`: 功能名称

可以通过修改 `feature-grid.scss` 文件来定制样式。
