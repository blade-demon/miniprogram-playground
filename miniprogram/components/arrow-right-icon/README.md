# 向右箭头图标组件

这是一个简单的向右箭头图标组件，支持自定义大小、颜色和禁用状态。

## 实现方式

组件提供了两种实现方式：

1. **文本版本**（默认）：使用 `>` 符号，兼容性最好
2. **SVG 版本**：使用 SVG 矢量图形，支持更精细的样式控制

## 使用方法

### 1. 在页面的 JSON 文件中注册组件

```json
{
  "usingComponents": {
    "arrow-right-icon": "/components/arrow-right-icon/arrow-right-icon"
  }
}
```

### 2. 在 WXML 中使用组件

```xml
<!-- 基础用法 -->
<arrow-right-icon />

<!-- 自定义大小 -->
<arrow-right-icon size="32" />

<!-- 自定义颜色 -->
<arrow-right-icon color="#007AFF" />

<!-- 禁用状态 -->
<arrow-right-icon disabled="{{true}}" />

<!-- 监听点击事件 -->
<arrow-right-icon bindtap="onIconTap" />
```

### 3. 在 JS 中处理事件

```javascript
Page({
  onIconTap() {
    console.log("箭头图标被点击了");
  },
});
```

## 属性说明

| 属性名   | 类型    | 默认值    | 说明             |
| -------- | ------- | --------- | ---------------- |
| size     | Number  | 24        | 图标大小（像素） |
| color    | String  | '#333333' | 图标颜色         |
| disabled | Boolean | false     | 是否禁用         |

## 事件

| 事件名 | 说明           |
| ------ | -------------- |
| tap    | 点击图标时触发 |

## 样式特点

- **文本版本**：使用 `>` 符号，兼容性最佳，支持所有微信小程序版本
- **SVG 版本**：使用矢量图形，支持更精细的样式控制
- 支持通过 `color` 属性自定义颜色
- 禁用状态时透明度降低
- 支持点击事件，可自定义交互行为

## 故障排除

如果组件没有正确渲染，请检查：

1. 确保组件已在页面的 JSON 文件中正确注册
2. 检查微信开发者工具的控制台是否有错误信息
3. 尝试使用文本版本（默认）而不是 SVG 版本
4. 确保微信小程序基础库版本支持 SVG（如果使用 SVG 版本）
