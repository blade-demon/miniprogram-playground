# Feature Grid 功能网格组件

## 组件描述

这是一个功能图标网格组件，展示 5x2 布局的 10 个功能入口，每个功能都有蓝色背景的图标和中文标签。

## 功能特性

- 5x2 网格布局
- 支持自定义功能列表
- 支持徽章显示
- 点击事件回调
- 响应式设计

## 使用方法

### 1. 在页面中引入组件

```json
{
  "usingComponents": {
    "feature-grid": "/components/feature-grid/feature-grid"
  }
}
```

### 2. 在页面中使用

```xml
<feature-grid bind:featureTap="onFeatureTap" />
```

### 3. 在页面 JS 中处理事件

```javascript
Page({
  onFeatureTap(e) {
    const { id, feature } = e.detail;
    console.log("点击的功能:", id, feature);

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

## 组件属性

| 属性名   | 类型  | 默认值           | 说明           |
| -------- | ----- | ---------------- | -------------- |
| features | Array | 预定义的功能列表 | 功能项配置数组 |

### features 数组项结构

```javascript
{
  id: '功能ID',
  name: '功能名称',
  icon: '图标样式类名',
  badge: '徽章文本（可选）'
}
```

## 默认功能列表

1. 陆钱宝 (luqianbao)
2. 稳健理财 (wenjianlicai)
3. 基金 (jijin)
4. 投顾管家 (touguguanjia) - 带"大咖说"徽章
5. 十万专区 (shiwanzhuanqu)
6. 会员权益 (huiyuanquanyi)
7. 邀好友 (yaohaoyou)
8. 红利 (hongli)
9. 固收+ (gushouplus)
10. 全部 (quanbu)

## 事件

| 事件名     | 说明             | 回调参数                             |
| ---------- | ---------------- | ------------------------------------ |
| featureTap | 点击功能项时触发 | {id: '功能 ID', feature: 功能项对象} |

## 样式定制

组件使用 CSS Grid 布局，可以通过修改 SCSS 文件来调整：

- 网格间距：修改 `gap` 属性
- 图标大小：修改 `.feature-icon` 的宽高
- 颜色主题：修改 `background-color` 等颜色属性
- 圆角：修改 `border-radius` 属性
